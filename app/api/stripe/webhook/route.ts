/**
 * Stripe Webhook Handler
 * 
 * Handles Stripe webhook events, specifically checkout.session.completed events
 * to track purchase completion with attribution data.
 */

import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { logAnalyticsEvent } from '@/lib/analytics-service';
import { 
  generateRequestId, 
  getCurrentTimestamp,
  createBaseEventData 
} from '@/lib/attribution-utils';
import type { 
  StripeWebhookData, 
  StripeCheckoutMetadata, 
  PurchaseCompletedEvent,
  AttributionData 
} from '@/lib/analytics-types';

// Import Stripe - you'll need to add this to your dependencies
// For now, we'll use a type-only import to avoid runtime errors
// import Stripe from 'stripe';

/**
 * POST /api/stripe/webhook
 * 
 * Handles incoming Stripe webhook events
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');
    
    if (!signature) {
      console.warn('Missing Stripe signature header');
      return NextResponse.json(
        { error: 'Missing signature' },
        { status: 400 }
      );
    }
    
    // Verify webhook signature
    // Note: You'll need to implement this based on your Stripe setup
    const event = await verifyStripeWebhook(body, signature);
    
    if (!event) {
      console.warn('Invalid Stripe webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }
    
    // Handle the event based on type
    await handleStripeEvent(event);
    
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Stripe webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

/**
 * Verify Stripe webhook signature
 * Note: This is a placeholder - implement based on your Stripe configuration
 */
async function verifyStripeWebhook(
  body: string, 
  signature: string
): Promise<StripeWebhookData | null> {
  try {
    // TODO: Implement actual Stripe signature verification
    // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    // const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
    // 
    // const event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
    // return event as StripeWebhookData;
    
    // For now, just parse the JSON (WARNING: This is not secure for production)
    console.warn('Stripe signature verification not implemented - parsing webhook directly');
    return JSON.parse(body) as StripeWebhookData;
    
  } catch (error) {
    console.error('Stripe webhook verification failed:', error);
    return null;
  }
}

/**
 * Handle different Stripe event types
 */
async function handleStripeEvent(event: StripeWebhookData): Promise<void> {
  console.log('Processing Stripe event:', event.type, event.id);
  
  switch (event.type) {
    case 'checkout.session.completed':
      await handleCheckoutCompleted(event);
      break;
      
    default:
      console.log('Unhandled Stripe event type:', event.type);
  }
}

/**
 * Handle checkout.session.completed events
 */
async function handleCheckoutCompleted(event: StripeWebhookData): Promise<void> {
  try {
    const session = event.data.object;
    
    // Extract session data
    const checkoutSessionId = session.id;
    const paymentIntentId = session.payment_intent;
    const amountTotal = session.amount_total;
    const currency = session.currency;
    const customerId = session.customer;
    const customerEmail = session.customer_details?.email;
    
    // Extract attribution data from metadata
    const metadata: StripeCheckoutMetadata = session.metadata || {};
    const attributionData = extractAttributionFromMetadata(metadata);
    
    if (!attributionData) {
      console.warn('No attribution data found in Stripe session:', checkoutSessionId);
      return;
    }
    
    // Create purchase completed event
    const purchaseEvent: PurchaseCompletedEvent = {
      event_type: 'purchase_completed',
      request_id: attributionData.rid,
      timestamp: getCurrentTimestamp(),
      product: attributionData.p,
      user_id: attributionData.u,
      checkout_session_id: checkoutSessionId,
      payment_intent_id: paymentIntentId,
      amount_paid_cents: amountTotal,
      currency: currency,
      customer_id: customerId,
      customer_email: customerEmail,
      // Note: We don't have request metadata for webhook events
      referrer: undefined,
      user_agent: undefined,
      source_ip: undefined
    };

    // Log the purchase event
    await logAnalyticsEvent(purchaseEvent);
    
    console.log('Purchase event logged:', {
      checkout_session_id: checkoutSessionId,
      product: attributionData.p,
      user_id: attributionData.u,
      amount: amountTotal
    });
    
  } catch (error) {
    console.error('Failed to handle checkout completed event:', error);
    // Don't throw - we want to acknowledge the webhook even if processing fails
  }
}

/**
 * Extract attribution data from Stripe session metadata
 */
function extractAttributionFromMetadata(
  metadata: StripeCheckoutMetadata
): AttributionData | null {
  try {
    // Try to get attribution data from different metadata formats
    if (metadata.attribution_data) {
      // Attribution data stored as JSON string
      return JSON.parse(metadata.attribution_data);
    } else if (metadata.product && metadata.request_id) {
      // Attribution data stored as separate fields
      return {
        p: metadata.product,
        u: metadata.user_id,
        rid: metadata.request_id,
        ts: getCurrentTimestamp() // We don't have the original timestamp
      };
    }
    
    return null;
    
  } catch (error) {
    console.error('Failed to extract attribution data from metadata:', error);
    return null;
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { error: 'Method not allowed' },
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
