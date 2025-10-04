/**
 * Stripe Utilities
 * 
 * Helper functions for creating Stripe checkout sessions with attribution data
 * and configuring success URLs for post-purchase redirection.
 */

import type { AttributionData } from './analytics-types';

export interface CreateCheckoutSessionParams {
  productSlug: string;
  productName: string;
  priceInCents: number;
  currency?: string;
  attributionData?: AttributionData;
  successBaseUrl: string;
  cancelUrl?: string;
  customerEmail?: string;
}

export interface StripeCheckoutSessionData {
  mode: 'payment';
  line_items: Array<{
    price_data: {
      currency: string;
      product_data: {
        name: string;
        description?: string;
      };
      unit_amount: number;
    };
    quantity: 1;
  }>;
  success_url: string;
  cancel_url: string;
  metadata: Record<string, string>;
  customer_email?: string;
}

/**
 * Create Stripe checkout session configuration with attribution tracking
 */
export function createCheckoutSessionData(params: CreateCheckoutSessionParams): StripeCheckoutSessionData {
  const {
    productSlug,
    productName,
    priceInCents,
    currency = 'usd',
    attributionData,
    successBaseUrl,
    cancelUrl,
    customerEmail
  } = params;

  // Build success URL that includes our purchase redirect endpoint
  const successUrl = `${successBaseUrl}/api/purchase-redirect?session_id={CHECKOUT_SESSION_ID}`;
  
  // Build cancel URL (default to product page or provided URL)
  const defaultCancelUrl = `${successBaseUrl}/products/${productSlug}`;
  const finalCancelUrl = cancelUrl || defaultCancelUrl;

  // Prepare metadata with attribution data
  const metadata: Record<string, string> = {
    product: productSlug,
  };

  if (attributionData) {
    metadata.user_id = attributionData.u || '';
    metadata.request_id = attributionData.rid;
    metadata.attribution_timestamp = attributionData.ts;
    // Also store complete attribution data as JSON for redundancy
    metadata.attribution_data = JSON.stringify(attributionData);
  }

  return {
    mode: 'payment',
    line_items: [
      {
        price_data: {
          currency: currency.toLowerCase(),
          product_data: {
            name: productName,
            description: `Access to ${productName} by WorkFrame`
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: finalCancelUrl,
    metadata,
    ...(customerEmail && { customer_email: customerEmail })
  };
}

/**
 * Create a Stripe checkout session (placeholder - implement with actual Stripe SDK)
 */
export async function createStripeCheckoutSession(
  sessionData: StripeCheckoutSessionData
): Promise<{ id: string; url: string } | null> {
  try {
    // TODO: Implement actual Stripe session creation
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const session = await stripe.checkout.sessions.create(sessionData);
    // return { id: session.id, url: session.url! };

    // For now, return a mock session (WARNING: This is not secure for production)
    console.warn('Stripe session creation not implemented - using mock data');
    
    const mockSessionId = `cs_test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const mockCheckoutUrl = `https://checkout.stripe.com/c/pay/${mockSessionId}`;
    
    console.log('Mock Stripe session created:', {
      sessionId: mockSessionId,
      checkoutUrl: mockCheckoutUrl,
      metadata: sessionData.metadata,
      successUrl: sessionData.success_url
    });
    
    return {
      id: mockSessionId,
      url: mockCheckoutUrl
    };
    
  } catch (error) {
    console.error('Failed to create Stripe checkout session:', error);
    return null;
  }
}

/**
 * Generate checkout URL with attribution data for direct Stripe links
 * This passes attribution data via client_reference_id parameter
 */
export function enhanceStripePaymentLink(
  baseStripeUrl: string,
  attributionData?: AttributionData
): string {
  try {
    const url = new URL(baseStripeUrl);
    
    // Encode attribution data as client_reference_id
    if (attributionData) {
      // Create a compact reference ID that includes all attribution data
      const clientRef = encodeAttributionForStripe(attributionData);
      url.searchParams.set('client_reference_id', clientRef);
      
      console.log('Enhanced Stripe URL with client_reference_id:', clientRef);
    }
    
    return url.toString();
    
  } catch (error) {
    console.error('Failed to enhance Stripe payment link:', error);
    return baseStripeUrl; // Return original URL if enhancement fails
  }
}

/**
 * Encode attribution data for Stripe client_reference_id
 * Format: product_userid_requestid_timestamp
 */
export function encodeAttributionForStripe(attributionData: AttributionData): string {
  const parts = [
    attributionData.p,
    attributionData.u || 'anon',
    attributionData.rid,
    Date.now().toString() // Use current timestamp for uniqueness
  ];
  
  return parts.join('_').substring(0, 200); // Stripe limits client_reference_id to 200 chars
}

/**
 * Decode attribution data from Stripe client_reference_id
 */
export function decodeAttributionFromStripe(clientReferenceId: string): AttributionData | null {
  try {
    const parts = clientReferenceId.split('_');
    
    if (parts.length >= 4) {
      return {
        p: parts[0],
        u: parts[1] === 'anon' ? undefined : parts[1],
        rid: parts[2],
        ts: new Date(parseInt(parts[3])).toISOString()
      };
    }
    
    return null;
    
  } catch (error) {
    console.error('Failed to decode attribution from client_reference_id:', error);
    return null;
  }
}

/**
 * Parse attribution data from Stripe session metadata
 * (Shared utility used by both webhook and purchase-redirect endpoints)
 */
export function parseAttributionFromMetadata(metadata: Record<string, string>): AttributionData | null {
  try {
    // Try to get attribution data from JSON string first
    if (metadata.attribution_data) {
      return JSON.parse(metadata.attribution_data);
    }
    
    // Fall back to individual fields
    if (metadata.product && metadata.request_id) {
      return {
        p: metadata.product,
        u: metadata.user_id || undefined,
        rid: metadata.request_id,
        ts: metadata.attribution_timestamp || new Date().toISOString()
      };
    }
    
    return null;
    
  } catch (error) {
    console.error('Failed to parse attribution from metadata:', error);
    return null;
  }
}

/**
 * Configuration for different products
 */
export const PRODUCT_STRIPE_CONFIG = {
  quickread: {
    priceInCents: 1200, // $12.00
    currency: 'usd',
    name: 'QuickRead by WorkFrame',
    existingPaymentLink: 'https://buy.stripe.com/6oUdR873ad7R2GTc3rfrW00'
  },
  zettelkasten: {
    priceInCents: 2500, // $25.00 (update with actual price)
    currency: 'usd', 
    name: 'Zettelkasten by WorkFrame',
    existingPaymentLink: 'https://buy.stripe.com/aFa14m87e3xhdlx3wVfrW01' // Update with actual Zettelkasten payment link
  }
} as const;

/**
 * Get Stripe configuration for a product
 */
export function getStripeConfigForProduct(productSlug: string) {
  return PRODUCT_STRIPE_CONFIG[productSlug as keyof typeof PRODUCT_STRIPE_CONFIG];
}