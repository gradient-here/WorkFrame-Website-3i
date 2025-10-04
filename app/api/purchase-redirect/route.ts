/**
 * Purchase Redirect API Endpoint
 * 
 * Handles GET requests after successful Stripe checkout with query parameters:
 * - session_id (required): Stripe checkout session ID
 * 
 * Validates the purchase, logs analytics, and redirects user to their product.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/product-config';
import { logAnalyticsEvent } from '@/lib/analytics-service';
import { decodeClientReferenceId } from '@/hooks/useLandingPageAttribution';
import {
  generateRequestId,
  extractRequestMetadata,
  getCurrentTimestamp,
  sanitizeInput
} from '@/lib/attribution-utils';
import type { 
  PurchaseCompletedEvent, 
  AttributionData,
  RedirectResponse,
  ValidationError 
} from '@/lib/analytics-types';

// Stripe types (you may need to install @stripe/stripe-js for full types)
interface StripeSession {
  id: string;
  payment_status: 'paid' | 'unpaid' | 'no_payment_required';
  customer_details: {
    email?: string;
  } | null;
  metadata: Record<string, string>;
  amount_total: number | null;
  currency: string | null;
  payment_intent: string | null;
  customer: string | null;
  client_reference_id?: string | null; // Add client_reference_id field
}

const productKV = {
  'quickread': {
    slug: 'qr',
    name: 'QuickRead',
    url: 'https://workframe.com/quickread' // Destination URL after purchase
  },
  'zettelkasten': {
    slug: 'zk',
    name: 'WorkFrame Pro',
    url: 'https://www.notion.so/Zettelkasten-26de70b7724b8088870acb39d8538f9e?duplicate=true' // Destination URL after purchase
  }
};

/**
 * GET /api/purchase-redirect
 * 
 * Processes post-purchase redirects with session validation
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const sessionId = url.searchParams.get('session_id');
    const productSlug = url.searchParams.get('product');
    
    type ProductKey = keyof typeof productKV;

    if (
      !productSlug ||
      !(productSlug in productKV)
    ) {
      console.warn('Purchase redirect missing or invalid product slug');
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid product'
        } as RedirectResponse,
        { status: 400 }
      );
    }
    // // Validate required parameters
    // if (!sessionId) {
    //   console.warn('Purchase redirect missing session_id');
    //   return NextResponse.json(
    //     {
    //       success: true,
    //       error: 'test'
    //     } as RedirectResponse,
    //     { status: 200 }
    //   );
    // }

    return NextResponse.json(
      {
        success: true,
        error: 'test'
      } as RedirectResponse,
      { status: 200 }
    );    
//     // Validate and retrieve Stripe session
//     const session = await validateStripeSession(sessionId);
//     if (!session) {
//       console.warn('Invalid or unpaid Stripe session:', sessionId);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Invalid or incomplete purchase'
//         } as RedirectResponse,
//         { status: 400 }
//       );
//     }
    
//     // Extract attribution data from session client_reference_id
//     const attributionData = extractAttributionFromSession(session);
//     if (!attributionData) {
//       console.warn('No attribution data in session:', sessionId);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Missing purchase attribution data'
//         } as RedirectResponse,
//         { status: 400 }
//       );
//     }
    
//     // Get product configuration
//     const product = getProductBySlug(attributionData.product);
//     if (!product) {
//       console.warn('Unknown product in session:', attributionData.product);
//       return NextResponse.json(
//         {
//           success: false,
//           error: 'Unknown product'
//         } as RedirectResponse,
//         { status: 400 }
//       );
//     }
    
//     // Generate request ID and extract metadata for analytics
//     const requestId = generateRequestId();
//     const metadata = extractRequestMetadata(request);
    
//     // Create purchase completed event
//     const purchaseEvent: PurchaseCompletedEvent = {
//       event_type: 'purchase_completed',
//       request_id: requestId,
//       timestamp: getCurrentTimestamp(),
//       product: attributionData.product,
//       user_id: attributionData.sessionId, // Use session ID as user identifier
//       checkout_session_id: sessionId,
//       payment_intent_id: session.payment_intent || '',
//       amount_paid_cents: session.amount_total || 0,
//       currency: session.currency || 'usd',
//       customer_id: session.customer || undefined,
//       customer_email: session.customer_details?.email || undefined,
//       referrer: metadata.referrer,
//       user_agent: metadata.user_agent,
//       source_ip: metadata.source_ip
//     };
    
//     // Log the purchase completion event
//     await logAnalyticsEvent(purchaseEvent);
    
//     console.log('Purchase completed and tracked:', {
//       session_id: sessionId,
//       product: attributionData.product,
//       session_id_user: attributionData.sessionId,
//       amount: session.amount_total
//     });
    
//     // Build destination URL (handle both internal and external URLs)
//     const destinationUrl = product.url.startsWith('http') 
//       ? product.url // External URL - use as-is
//       : `${new URL(request.url).origin}${product.url}`; // Internal URL - add origin
    
//     // Create response with 302 redirect to product
//     const response = NextResponse.redirect(destinationUrl, {
//       status: 302,
//       headers: {
//         'Cache-Control': 'no-cache, no-store, must-revalidate',
//         'Pragma': 'no-cache',
//         'Expires': '0'
//       }
//     });
    
//     return response;
    
  } catch (error) {
    console.error('Purchase redirect endpoint error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      } as RedirectResponse,
      { status: 500 }
    );
  }
}

// /**
//  * Validate Stripe session and check payment status
//  * This now retrieves the actual session from Stripe to get client_reference_id
//  */
// async function validateStripeSession(sessionId: string): Promise<StripeSession | null> {
//   try {
//     // TODO: Implement actual Stripe session retrieval
//     // const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
//     // const session = await stripe.checkout.sessions.retrieve(sessionId);
//     // 
//     // if (session.payment_status !== 'paid') {
//     //   return null;
//     // }
//     // 
//     // return {
//     //   id: session.id,
//     //   payment_status: session.payment_status,
//     //   customer_details: session.customer_details,
//     //   metadata: session.metadata || {},
//     //   amount_total: session.amount_total,
//     //   currency: session.currency,
//     //   payment_intent: session.payment_intent,
//     //   customer: session.customer,
//     //   client_reference_id: session.client_reference_id
//     // } as StripeSession;
    
//     // For now, return a mock session (WARNING: This is not secure for production)
//     console.warn('Stripe session validation not implemented - using mock data');
    
//     // Mock successful session with client_reference_id for testing
//     return {
//       id: sessionId,
//       payment_status: 'paid',
//       customer_details: { email: 'test@example.com' },
//       metadata: {}, // Empty metadata - we'll use client_reference_id instead
//       amount_total: 1200, // $12.00
//       currency: 'usd',
//       payment_intent: 'pi_test_123',
//       customer: 'cus_test_123',
//       client_reference_id: 'quickread_sess_1704067200000_abc123def_1704067300000' // Mock client reference (product_sessionid_timestamp)
//     };
    
//   } catch (error) {
//     console.error('Failed to validate Stripe session:', error);
//     return null;
//   }
// }

// /**
//  * Extract attribution data from Stripe session client_reference_id
//  */
// function extractAttributionFromSession(session: StripeSession): { product: string; sessionId: string } | null {
//   try {
//     if (!session.client_reference_id) {
//       console.warn('No client_reference_id found in session:', session.id);
//       return null;
//     }

//     const decoded = decodeClientReferenceId(session.client_reference_id);
//     if (!decoded) {
//       console.warn('Failed to decode client_reference_id:', session.client_reference_id);
//       return null;
//     }

//     console.log('Attribution extracted from client_reference_id:', decoded);
//     return decoded;
    
//   } catch (error) {
//     console.error('Failed to extract attribution data from session:', error);
//     return null;
//   }
// }

/**
 * Handle unsupported HTTP methods
 */
export async function POST(): Promise<NextResponse> {
  return NextResponse.json(
    {
      success: false,
      error: 'Method not allowed'
    } as RedirectResponse,
    { 
      status: 405,
      headers: {
        'Allow': 'GET'
      }
    }
  );
}

export async function PUT(): Promise<NextResponse> {
  return POST();
}

export async function DELETE(): Promise<NextResponse> {
  return POST();
}

export async function PATCH(): Promise<NextResponse> {
  return POST();
}