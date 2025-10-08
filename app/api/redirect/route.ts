/**
 * Redirect API Endpoint
 * 
 * Handles GET requests to /api/redirect with query parameters:
 * - p (required): product slug
 * - u (optional): user identifier
 * - source (optional): traffic source (e.g., 'email', 'social', etc.)
 * 
 * Returns HTTP 302 redirect to the mapped product URL with attribution tracking.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getProductBySlug } from '@/lib/product-config';
// Analytics will be tracked client-side via /api/analytics/track
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
 * Validate request parameters
 */
function validateRequest(
  productSlug: string | null, 
  userId: string | null,
  source: string | null
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
  
  // Validate source (optional)
  if (source) {
    const sanitized = sanitizeInput(source);
    if (!sanitized || !/^[a-zA-Z0-9_-]+$/.test(sanitized)) {
      errors.push({
        field: 'source',
        message: 'Invalid source format - only alphanumeric characters, hyphens, and underscores allowed',
        received: source
      });
    }
  }
  
  return errors;
}


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
    const checkoutID = url.searchParams.get('u');
    const source = url.searchParams.get('source');
    
    // Validate required parameters
    const validationErrors = validateRequest(productSlug, checkoutID, source);
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
    // const requestId = generateRequestId();
    const metadata = extractRequestMetadata(request);
    
    // Create attribution data
    const attributionData = createAttributionData(
      productSlug!,
      checkoutID || undefined,
      // requestId
    );
    
    // Build destination URL (handle both internal and external URLs)
    let destinationUrl = product.url.startsWith('http') 
      ? product.url // External URL - use as-is
      : `${new URL(request.url).origin}${product.url}`; // Internal URL - add origin
    
    // Add source parameter to destination URL if provided
    if (source) {
      const urlObj = new URL(destinationUrl);
      urlObj.searchParams.set('utm_source', source);
      destinationUrl = urlObj.toString();
    }
    
    // Log analytics event and wait for completion (with a short timeout so we don't block forever)
    const redirectEvent = createRedirectEvent(
      productSlug!,
      destinationUrl,
      "00000000-0000-0000-0000-000000000000", // Placeholder requestId
      metadata,
      checkoutID || undefined
    );

    // Create HTML page with client-side analytics and redirect
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Redirecting...</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: #f8fafc;
            color: #64748b;
        }
        .loader {
            text-align: center;
        }
        .spinner {
            border: 2px solid #e2e8f0;
            border-top: 2px solid #3b82f6;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            animation: spin 1s linear infinite;
            margin: 0 auto 16px;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="loader">
        <div class="spinner"></div>
        <p>Redirecting you now...</p>
    </div>
    
    <script>
        // Analytics event data
        const analyticsEvent = ${JSON.stringify(redirectEvent)};
        const destinationUrl = '${destinationUrl}';
        
        // Track analytics with server-side endpoint
        const trackAnalytics = async () => {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 800); // Shorter timeout
                
                const response = await fetch('/api/analytics/track', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(analyticsEvent),
                    keepalive: true, // Ensures request completes even after page unload
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error('Analytics request failed');
                }
                
                console.log('Analytics tracked successfully');
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.warn('Analytics tracking failed:', error);
                }
            }
        };
        
        // Perform redirect with fallback for cross-domain issues
        const redirect = () => {
            try {
                // For cross-domain redirects, use window.location.href
                window.location.href = destinationUrl;
            } catch (error) {
                console.error('Redirect failed:', error);
                // Fallback: try window.open as last resort
                window.open(destinationUrl, '_self');
            }
        };
        
        // Wait for DOM to be fully loaded
        const init = () => {
            console.log('Starting redirect process...');
            
            // Track analytics and redirect
            Promise.race([
                trackAnalytics(),
                new Promise(resolve => setTimeout(resolve, 1000)) // 1s max wait
            ]).finally(() => {
                console.log('Analytics complete or timed out, redirecting...');
                redirect();
            });
        };
        
        // Initialize when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        
        // Ultimate fallback redirect in case everything fails
        setTimeout(() => {
            console.log('Fallback redirect triggered');
            redirect();
        }, 3000);
        
        // Handle page visibility changes (e.g., if user switches tabs)
        // document.addEventListener('visibilitychange', () => {
        //     if (document.hidden) {
        //         // Page became hidden, ensure analytics request is sent
        //         navigator.sendBeacon('/api/analytics/track', JSON.stringify(analyticsEvent));
        //     }
        // });
    </script>
</body>
</html>`;

    // Create HTML response
    const response = new NextResponse(htmlContent, {
        status: 200,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-cache, no-store, must-revalidate, private',
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