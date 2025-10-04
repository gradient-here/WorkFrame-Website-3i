/**
 * Create Checkout API Endpoint
 * 
 * Creates Stripe checkout sessions with attribution data and proper success URLs.
 * POST /api/create-checkout with body containing product and attribution info.
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  createCheckoutSessionData, 
  createStripeCheckoutSession,
  getStripeConfigForProduct 
} from '@/lib/stripe-utils';
import { parseAttribution, ATTRIBUTION_COOKIE } from '@/lib/attribution-utils';
import { logAnalyticsEventAsync } from '@/lib/analytics-service';
import type { 
  CheckoutStartedEvent, 
  AttributionData,
  RedirectResponse 
} from '@/lib/analytics-types';
import {
  generateRequestId,
  extractRequestMetadata,
  getCurrentTimestamp
} from '@/lib/attribution-utils';

interface CreateCheckoutRequest {
  productSlug: string;
  customerEmail?: string;
  successUrl?: string;
  cancelUrl?: string;
}

interface CreateCheckoutResponse extends RedirectResponse {
  checkoutUrl?: string;
  sessionId?: string;
}

/**
 * POST /api/create-checkout
 * 
 * Creates a Stripe checkout session with attribution tracking
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body: CreateCheckoutRequest = await request.json();
    const { productSlug, customerEmail, successUrl, cancelUrl } = body;
    
    // Validate required parameters
    if (!productSlug) {
      return NextResponse.json(
        {
          success: false,
          error: 'Product slug is required'
        } as CreateCheckoutResponse,
        { status: 400 }
      );
    }
    
    // Get product Stripe configuration
    const stripeConfig = getStripeConfigForProduct(productSlug);
    if (!stripeConfig) {
      return NextResponse.json(
        {
          success: false,
          error: 'Unknown product or no Stripe configuration'
        } as CreateCheckoutResponse,
        { status: 400 }
      );
    }
    
    // Extract attribution data from cookies
    const attributionData = getAttributionFromRequest(request);
    
    // Generate base URL from request
    const baseUrl = new URL(request.url).origin;
    const finalSuccessUrl = successUrl || baseUrl;
    
    // Create checkout session data
    const sessionData = createCheckoutSessionData({
      productSlug,
      productName: stripeConfig.name,
      priceInCents: stripeConfig.priceInCents,
      currency: stripeConfig.currency,
      attributionData,
      successBaseUrl: finalSuccessUrl,
      cancelUrl,
      customerEmail
    });
    
    // Create the actual Stripe session
    const session = await createStripeCheckoutSession(sessionData);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to create checkout session'
        } as CreateCheckoutResponse,
        { status: 500 }
      );
    }
    
    // Log checkout started event
    if (attributionData) {
      const requestId = generateRequestId();
      const metadata = extractRequestMetadata(request);
      
      const checkoutEvent: CheckoutStartedEvent = {
        event_type: 'checkout_started',
        request_id: requestId,
        timestamp: getCurrentTimestamp(),
        product: productSlug,
        user_id: attributionData.u,
        checkout_session_id: session.id,
        amount_cents: stripeConfig.priceInCents,
        currency: stripeConfig.currency,
        referrer: metadata.referrer,
        user_agent: metadata.user_agent,
        source_ip: metadata.source_ip
      };
      
      logAnalyticsEventAsync(checkoutEvent);
    }
    
    console.log('Checkout session created:', {
      sessionId: session.id,
      product: productSlug,
      hasAttribution: !!attributionData,
      userId: attributionData?.u
    });
    
    return NextResponse.json({
      success: true,
      checkoutUrl: session.url,
      sessionId: session.id
    } as CreateCheckoutResponse);
    
  } catch (error) {
    console.error('Create checkout endpoint error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      } as CreateCheckoutResponse,
      { status: 500 }
    );
  }
}

/**
 * Extract attribution data from request cookies
 */
function getAttributionFromRequest(request: NextRequest): AttributionData | null {
  try {
    const cookieValue = request.cookies.get(ATTRIBUTION_COOKIE.name)?.value;
    if (!cookieValue) {
      return null;
    }
    
    return parseAttribution(cookieValue);
    
  } catch (error) {
    console.error('Failed to extract attribution from request:', error);
    return null;
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed'
    } as CreateCheckoutResponse,
    { 
      status: 405,
      headers: {
        'Allow': 'POST'
      }
    }
  );
}

export async function PUT(): Promise<NextResponse> {
  return GET();
}

export async function DELETE(): Promise<NextResponse> {
  return GET();
}

export async function PATCH(): Promise<NextResponse> {
  return GET();
}