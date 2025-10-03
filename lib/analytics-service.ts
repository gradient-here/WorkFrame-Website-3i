/**
 * Analytics Service
 * 
 * Handles logging of analytics events to PostHog with proper error handling
 * and asynchronous processing to minimize impact on redirect latency.
 */

import PostHogClient from './posthog';
import type { AnalyticsEvent } from './analytics-types';

/**
 * Analytics service for logging events
 */
export class AnalyticsService {
  private posthog: ReturnType<typeof PostHogClient>;
  
  constructor() {
    this.posthog = PostHogClient();
  }
  
  /**
   * Log an analytics event asynchronously
   * This method doesn't throw errors to avoid impacting the main request flow
   */
  async logEvent(event: AnalyticsEvent): Promise<void> {
    try {
      // Use the user_id if available, otherwise fall back to request_id for tracking
      const distinctId = event.user_id || event.request_id;
      
      // Log the event with PostHog
      this.posthog.capture({
        distinctId,
        event: event.event_type,
        properties: {
          // Core event data
          request_id: event.request_id,
          product: event.product,
          timestamp: event.timestamp,
          
          // Request metadata
          referrer: event.referrer,
          user_agent: event.user_agent,
          source_ip: event.source_ip,
          
          // Event-specific properties
          ...this.getEventSpecificProperties(event)
        }
      });
      
      // Flush immediately for real-time analytics
      await this.posthog.flush();
      
    } catch (error) {
      // Log error but don't throw - we don't want to break the main request
      console.error('Failed to log analytics event:', error);
      console.error('Event data:', JSON.stringify(event, null, 2));
    }
  }
  
  /**
   * Extract event-specific properties based on event type
   */
  private getEventSpecificProperties(event: AnalyticsEvent): Record<string, any> {
    switch (event.event_type) {
      case 'redirect_to_product':
        return {
          destination_url: event.destination_url,
          redirect_status: event.redirect_status
        };
        
      case 'product_page_view':
        return {
          page_url: event.page_url,
          from_redirect: event.from_redirect
        };
        
      case 'checkout_started':
        return {
          checkout_session_id: event.checkout_session_id,
          amount_cents: event.amount_cents,
          currency: event.currency
        };
        
      case 'purchase_completed':
        return {
          checkout_session_id: event.checkout_session_id,
          payment_intent_id: event.payment_intent_id,
          amount_paid_cents: event.amount_paid_cents,
          currency: event.currency,
          customer_id: event.customer_id,
          customer_email: event.customer_email
        };
        
      default:
        return {};
    }
  }
  
  /**
   * Log a redirect event with fire-and-forget pattern
   */
  logRedirectEvent(event: AnalyticsEvent): void {
    // Don't await - we want this to be non-blocking
    this.logEvent(event).catch(error => {
      console.error('Async analytics logging failed:', error);
    });
  }
  
  /**
   * Shutdown the analytics service (for cleanup)
   */
  async shutdown(): Promise<void> {
    try {
      await this.posthog.shutdown();
    } catch (error) {
      console.error('Failed to shutdown PostHog client:', error);
    }
  }
}

/**
 * Singleton analytics service instance
 */
let analyticsServiceInstance: AnalyticsService | null = null;

/**
 * Get or create the analytics service instance
 */
export function getAnalyticsService(): AnalyticsService {
  if (!analyticsServiceInstance) {
    analyticsServiceInstance = new AnalyticsService();
  }
  return analyticsServiceInstance;
}

/**
 * Helper function to log events with error handling
 */
export async function logAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  const service = getAnalyticsService();
  return service.logEvent(event);
}

/**
 * Helper function for fire-and-forget event logging (non-blocking)
 */
export function logAnalyticsEventAsync(event: AnalyticsEvent): void {
  const service = getAnalyticsService();
  service.logRedirectEvent(event);
}