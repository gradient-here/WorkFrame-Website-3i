/**
 * Attribution Utilities
 * 
 * Helper functions for managing attribution data, cookies, and request correlation.
 */

import { randomBytes } from 'crypto';
import type { 
  AttributionData, 
  RequestMetadata, 
  AnalyticsEvent,
  RedirectToProductEvent,
  ProductPageViewEvent 
} from './analytics-types';

/**
 * Cookie configuration
 */
export const ATTRIBUTION_COOKIE = {
  name: 'wf_attribution',
  maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
};

/**
 * Generate a unique request ID for event correlation
 */
export function generateRequestId(): string {
  return randomBytes(16).toString('hex');
}

/**
 * Generate current timestamp in ISO 8601 format
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Extract request metadata from Next.js Request object
 */
export function extractRequestMetadata(request: Request): RequestMetadata {
  const headers = request.headers;
  
  return {
    referrer: headers.get('referer') || undefined,
    user_agent: headers.get('user-agent') || undefined,
    source_ip: headers.get('x-forwarded-for') || 
               headers.get('x-real-ip') || 
               'unknown'
  };
}

/**
 * Create attribution data object
 */
export function createAttributionData(
  product: string, 
  userId?: string,
  requestId?: string
): AttributionData {
  return {
    p: product,
    u: userId,
    rid: requestId || generateRequestId(),
    ts: getCurrentTimestamp()
  };
}

/**
 * Serialize attribution data to cookie string
 */
export function serializeAttribution(data: AttributionData): string {
  return JSON.stringify(data);
}

/**
 * Parse attribution data from cookie string
 */
export function parseAttribution(cookieValue: string): AttributionData | null {
  try {
    const parsed = JSON.parse(cookieValue);
    
    // Validate required fields
    if (!parsed.p || !parsed.rid || !parsed.ts) {
      return null;
    }
    
    return {
      p: parsed.p,
      u: parsed.u || undefined,
      rid: parsed.rid,
      ts: parsed.ts
    };
  } catch (error) {
    console.error('Failed to parse attribution cookie:', error);
    return null;
  }
}

/**
 * Check if attribution data is expired (older than 7 days)
 */
export function isAttributionExpired(attribution: AttributionData): boolean {
  try {
    const attributionDate = new Date(attribution.ts);
    const now = new Date();
    const diffInDays = (now.getTime() - attributionDate.getTime()) / (1000 * 60 * 60 * 24);
    
    return diffInDays > 7;
  } catch (error) {
    console.error('Failed to check attribution expiry:', error);
    return true; // Consider expired if we can't parse the date
  }
}

/**
 * Sanitize and validate input parameters
 */
export function sanitizeInput(input: string | null | undefined): string | undefined {
  if (!input) return undefined;
  
  // Remove any potentially dangerous characters and trim
  return input
    .toString()
    .trim()
    .replace(/[<>\"'&]/g, '') // Remove basic XSS vectors
    .substring(0, 500); // Limit length
}

/**
 * Validate product slug format
 */
export function validateProductSlug(slug: string): boolean {
  // Product slugs should be lowercase alphanumeric with hyphens
  const productSlugPattern = /^[a-z0-9\-]+$/;
  return productSlugPattern.test(slug) && slug.length <= 50;
}

/**
 * Validate user ID format (if provided)
 */
export function validateUserId(userId: string): boolean {
  // User IDs should be alphanumeric and reasonable length
  const userIdPattern = /^[a-zA-Z0-9\-_]+$/;
  return userIdPattern.test(userId) && userId.length <= 100;
}

/**
 * Create base event data from request and attribution
 */
export function createBaseEventData(
  product: string,
  requestId: string,
  metadata: RequestMetadata,
  userId?: string
) {
  return {
    request_id: requestId,
    timestamp: getCurrentTimestamp(),
    product: sanitizeInput(product) || '',
    user_id: userId ? sanitizeInput(userId) : undefined,
    referrer: sanitizeInput(metadata.referrer),
    user_agent: sanitizeInput(metadata.user_agent),
    source_ip: metadata.source_ip // Already sanitized by header extraction
  };
}

/**
 * Create redirect event data
 */
export function createRedirectEvent(
  product: string,
  destinationUrl: string,
  requestId: string,
  metadata: RequestMetadata,
  userId?: string
): RedirectToProductEvent {
  return {
    event_type: 'redirect_to_product',
    ...createBaseEventData(product, requestId, metadata, userId),
    destination_url: sanitizeInput(destinationUrl) || '',
    redirect_status: 302
  };
}

/**
 * Create product page view event data
 */
export function createProductPageViewEvent(
  product: string,
  pageUrl: string,
  requestId: string,
  metadata: RequestMetadata,
  fromRedirect: boolean = false,
  userId?: string
): ProductPageViewEvent {
  return {
    event_type: 'product_page_view',
    ...createBaseEventData(product, requestId, metadata, userId),
    page_url: sanitizeInput(pageUrl) || '',
    from_redirect: fromRedirect
  };
}

/**
 * Get full URL from request (for logging destination URLs)
 */
export function getFullUrl(request: Request): string {
  try {
    const url = new URL(request.url);
    return url.toString();
  } catch (error) {
    console.error('Failed to parse request URL:', error);
    return 'unknown';
  }
}

/**
 * Create cookie header string for setting attribution cookie
 */
export function createAttributionCookieHeader(attributionData: AttributionData): string {
  const cookieValue = serializeAttribution(attributionData);
  const options = ATTRIBUTION_COOKIE;
  
  let cookie = `${options.name}=${cookieValue}; Max-Age=${options.maxAge}; Path=${options.path}; SameSite=${options.sameSite}`;
  
  if (options.httpOnly) {
    cookie += '; HttpOnly';
  }
  
  if (options.secure) {
    cookie += '; Secure';
  }
  
  return cookie;
}