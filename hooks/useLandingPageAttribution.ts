/**
 * Landing Page Attribution Hook
 * 
 * Simplified attribution system that captures user data when they click buy buttons
 * on landing pages and enhances Stripe URLs with client_reference_id
 */

'use client';

import { usePostHog } from 'posthog-js/react';
import { useState, useEffect } from 'react';

export interface LandingPageAttribution {
  sessionId: string;
  timestamp: string;
  userAgent?: string;
  referrer?: string;
  utmParams?: {
    source?: string;
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  };
}

/**
 * Hook for handling attribution on landing pages
 */
export function useLandingPageAttribution() {
  const posthog = usePostHog();
  const [attribution, setAttribution] = useState<LandingPageAttribution | null>(null);

  useEffect(() => {
    // Generate session attribution data on page load
    const sessionAttribution: LandingPageAttribution = {
      sessionId: generateSessionId(),
      timestamp: new Date().toISOString(),
      userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
      utmParams: extractUtmParams()
    };

    setAttribution(sessionAttribution);

    // Track landing page view
    posthog?.capture('landing_page_view', {
      session_id: sessionAttribution.sessionId,
      timestamp: sessionAttribution.timestamp,
      referrer: sessionAttribution.referrer,
      utm_source: sessionAttribution.utmParams?.source,
      utm_medium: sessionAttribution.utmParams?.medium,
      utm_campaign: sessionAttribution.utmParams?.campaign
    });

  }, [posthog]);

  /**
   * Handle buy button click - creates enhanced Stripe URL and tracks event
   */
  const handleBuyButtonClick = (productSlug: string, stripeUrl: string) => {
    if (!attribution) {
      console.warn('No attribution data available');
      return stripeUrl;
    }

    // Create client reference ID for Stripe
    const clientReferenceId = createClientReferenceId(productSlug, attribution);
    
    // Enhance Stripe URL
    const enhancedUrl = enhanceStripeUrl(stripeUrl, clientReferenceId);

    // Track buy button click
    posthog?.capture('buy_button_clicked', {
      session_id: attribution.sessionId,
      product: productSlug,
      stripe_url: enhancedUrl,
      client_reference_id: clientReferenceId,
      timestamp: new Date().toISOString(),
      utm_source: attribution.utmParams?.source,
      utm_medium: attribution.utmParams?.medium,
      utm_campaign: attribution.utmParams?.campaign
    });

    console.log('🛒 Buy button clicked:', {
      product: productSlug,
      clientReferenceId,
      enhancedUrl
    });

    return enhancedUrl;
  };

  return {
    attribution,
    handleBuyButtonClick
  };
}

/**
 * Generate a unique session ID
 */
function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Extract UTM parameters from current URL
 */
function extractUtmParams() {
  if (typeof window === 'undefined') return {};
  
  const urlParams = new URLSearchParams(window.location.search);
  
  return {
    source: urlParams.get('utm_source') || undefined,
    medium: urlParams.get('utm_medium') || undefined,
    campaign: urlParams.get('utm_campaign') || undefined,
    term: urlParams.get('utm_term') || undefined,
    content: urlParams.get('utm_content') || undefined
  };
}

/**
 * Create client reference ID for Stripe
 * Format: product_sessionid_timestamp
 */
function createClientReferenceId(productSlug: string, attribution: LandingPageAttribution): string {
  const parts = [
    productSlug,
    attribution.sessionId,
    Date.now().toString()
  ];
  
  return parts.join('_').substring(0, 200); // Stripe limit
}

/**
 * Enhance Stripe URL with client_reference_id
 */
function enhanceStripeUrl(baseUrl: string, clientReferenceId: string): string {
  try {
    const url = new URL(baseUrl);
    url.searchParams.set('client_reference_id', clientReferenceId);
    return url.toString();
  } catch (error) {
    console.error('Failed to enhance Stripe URL:', error);
    return baseUrl;
  }
}

/**
 * Decode client reference ID back to attribution data
 * Used by the purchase-redirect endpoint
 */
export function decodeClientReferenceId(clientReferenceId: string): {
  product: string;
  sessionId: string;
  timestamp: string;
} | null {
  try {
    const parts = clientReferenceId.split('_');
    
    if (parts.length >= 3) {
      return {
        product: parts[0],
        sessionId: parts[1],
        timestamp: parts[2]
      };
    }
    
    return null;
  } catch (error) {
    console.error('Failed to decode client reference ID:', error);
    return null;
  }
}