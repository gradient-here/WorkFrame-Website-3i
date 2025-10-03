/**
 * Attribution Hook
 * 
 * Client-side hook for handling attribution data and analytics tracking
 */

'use client';

import { useEffect, useState } from 'react';
import { usePostHog } from 'posthog-js/react';
import type { AttributionData, ProductPageViewEvent } from '@/lib/analytics-types';

/**
 * Cookie utilities for client-side
 */
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

function parseAttributionCookie(): AttributionData | null {
  try {
    const cookieValue = getCookie('wf_attribution');
    if (!cookieValue) return null;
    
    const parsed = JSON.parse(decodeURIComponent(cookieValue));
    
    // Validate required fields
    if (!parsed.p || !parsed.rid || !parsed.ts) {
      return null;
    }
    
    return parsed;
  } catch (error) {
    console.error('Failed to parse attribution cookie:', error);
    return null;
  }
}

/**
 * Check if attribution data is expired (older than 7 days)
 */
function isAttributionExpired(attribution: AttributionData): boolean {
  try {
    const attributionDate = new Date(attribution.ts);
    const now = new Date();
    const diffInDays = (now.getTime() - attributionDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return diffInDays > 7;
  } catch (error) {
    console.error('Failed to check attribution expiry:', error);
    return true;
  }
}

/**
 * Attribution hook return type
 */
export interface UseAttributionReturn {
  attribution: AttributionData | null;
  hasAttribution: boolean;
  fromRedirect: boolean;
  trackProductPageView: (product: string, pageUrl?: string) => void;
}

/**
 * Hook for handling attribution and analytics tracking
 */
export function useAttribution(): UseAttributionReturn {
  const [attribution, setAttribution] = useState<AttributionData | null>(null);
  const posthog = usePostHog();
  
  // Load attribution data on mount
  useEffect(() => {
    const attributionData = parseAttributionCookie();
    
    if (attributionData && !isAttributionExpired(attributionData)) {
      setAttribution(attributionData);
    } else if (attributionData) {
      console.log('Attribution data expired, ignoring');
    }
  }, []);
  
  /**
   * Track product page view event
   */
  const trackProductPageView = (product: string, pageUrl?: string) => {
    try {
      const currentUrl = pageUrl || (typeof window !== 'undefined' ? window.location.href : '');
      const fromRedirect = attribution?.p === product;
      
      // Use attribution data if available, otherwise generate new tracking data
      const distinctId = attribution?.u || attribution?.rid || 'anonymous';
      const requestId = attribution?.rid || `page-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      // Track with PostHog
      posthog?.capture('product_page_view', {
        request_id: requestId,
        product: product,
        timestamp: new Date().toISOString(),
        user_id: attribution?.u,
        page_url: currentUrl,
        from_redirect: fromRedirect,
        // Add attribution context
        attribution_product: attribution?.p,
        attribution_user_id: attribution?.u,
        attribution_request_id: attribution?.rid,
        attribution_timestamp: attribution?.ts
      }, {
        $set: {
          current_product: product
        }
      });
      
      console.log('Product page view tracked:', {
        product,
        from_redirect: fromRedirect,
        has_attribution: !!attribution
      });
      
    } catch (error) {
      console.error('Failed to track product page view:', error);
    }
  };
  
  return {
    attribution,
    hasAttribution: !!attribution,
    fromRedirect: !!attribution,
    trackProductPageView
  };
}

/**
 * Hook for tracking checkout events (when user clicks buy button)
 */
export function useCheckoutTracking() {
  const { attribution } = useAttribution();
  const posthog = usePostHog();
  
  const trackCheckoutStarted = (
    product: string,
    checkoutUrl: string,
    amount?: number,
    currency = 'usd'
  ) => {
    try {
      const distinctId = attribution?.u || attribution?.rid || 'anonymous';
      const requestId = attribution?.rid || `checkout-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      posthog?.capture('checkout_started', {
        request_id: requestId,
        product: product,
        timestamp: new Date().toISOString(),
        user_id: attribution?.u,
        checkout_url: checkoutUrl,
        amount_cents: amount,
        currency: currency,
        // Add attribution context
        attribution_product: attribution?.p,
        attribution_user_id: attribution?.u,
        attribution_request_id: attribution?.rid,
        attribution_timestamp: attribution?.ts
      });
      
      console.log('Checkout started tracked:', {
        product,
        checkout_url: checkoutUrl,
        has_attribution: !!attribution
      });
      
    } catch (error) {
      console.error('Failed to track checkout started:', error);
    }
  };
  
  return {
    trackCheckoutStarted,
    attribution
  };
}
