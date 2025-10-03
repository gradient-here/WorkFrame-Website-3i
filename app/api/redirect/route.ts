/**
 * Redirect API Endpoint
 * 
 * Handles GET requests to /api/redirect with query parameters:
 * - p (required): product slug
 * - u (optional): user identifier
 * 
 * Returns HTTP 302 redirect to the mapped product URL with attribution tracking.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/product-config';
import { logAnalyticsEventAsync } from '@/lib/analytics-service';
import {
  generateRequestId,
  extractRequestMetadata,
  createAttributionData,
  createRedirectEvent,
  createAttributionCookieHeader,
  sanitizeInput,
  validateProductSlug,
  validateUserId
} from '@/lib/attribution-utils';
import type { RedirectResponse, ValidationError } from '@/lib/analytics-types';

/**
 * GET /api/redirect
 * 
 * Processes redirect requests with analytics tracking
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    // Extract query parameters
    const url = new URL(request.url);
    const productSlug = url.searchParams.get('p');
    const userId = url.searchParams.get('u');
    
    // Validate required parameters
    const validationErrors = validateRequest(productSlug, userId);
    if (validationErrors.length > 0) {
      console.warn('Redirect validation failed:', validationErrors);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request parameters',
          details: validationErrors
        } as RedirectResponse,
        { status: 400 }
      );
    }
    
    // Get product configuration
    const product = getProductBySlug(productSlug!);
    if (!product) {
      console.warn('Unknown product slug:', productSlug);
      return NextResponse.json(
        {
          success: false,
          error: 'Unknown product'
        } as RedirectResponse,
        { status: 400 }
      );
    }
    
    // Generate request ID and extract metadata
    const requestId = generateRequestId();
    const metadata = extractRequestMetadata(request);
    
    // Create attribution data
    const attributionData = createAttributionData(
      productSlug!,
      userId || undefined,
      requestId
    );
    
    // Build destination URL (handle both internal and external URLs)
    const destinationUrl = product.url.startsWith('http') 
      ? product.url // External URL - use as-is
      : `${new URL(request.url).origin}${product.url}`; // Internal URL - add origin
    
    // Log analytics event (fire-and-forget)
    const redirectEvent = createRedirectEvent(
      productSlug!,
      destinationUrl,
      requestId,
      metadata,
      userId || undefined
    );
    
    logAnalyticsEventAsync(redirectEvent);
    
    // Create response with 302 redirect
    const response = NextResponse.redirect(destinationUrl, {
      status: 302,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
    
    // Set attribution cookie
    const cookieHeader = createAttributionCookieHeader(attributionData);
    response.headers.set('Set-Cookie', cookieHeader);
    
    return response;
    
  } catch (error) {
    console.error('Redirect endpoint error:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error'
      } as RedirectResponse,
      { status: 500 }
    );
  }
}

/**
 * Validate request parameters
 */
function validateRequest(
  productSlug: string | null, 
  userId: string | null
): ValidationError[] {
  const errors: ValidationError[] = [];
  
  // Validate product slug (required)
  if (!productSlug) {
    errors.push({
      field: 'p',
      message: 'Product slug is required',
      received: productSlug
    });
  } else {
    const sanitized = sanitizeInput(productSlug);
    if (!sanitized || !validateProductSlug(sanitized)) {
      errors.push({
        field: 'p',
        message: 'Invalid product slug format',
        received: productSlug
      });
    }
  }
  
  // Validate user ID (optional)
  if (userId) {
    const sanitized = sanitizeInput(userId);
    if (!sanitized || !validateUserId(sanitized)) {
      errors.push({
        field: 'u',
        message: 'Invalid user ID format',
        received: userId
      });
    }
  }
  
  return errors;
}

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