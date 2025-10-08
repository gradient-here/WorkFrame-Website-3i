/**
 * Analytics Event Schemas
 * 
 * Defines TypeScript types for all analytics events in the redirect system.
 * These events track the user journey from redirect → product → checkout → purchase.
 */

/**
 * Base event properties that all analytics events should include
 */
export interface BaseEvent {
  /** Unique request ID for event correlation */
  request_id: string;
  /** Timestamp when the event occurred (ISO 8601) */
  timestamp: string;
  /** Product slug that triggered the event */
  product: string;
  /** Optional user identifier */
  user_id?: string;
  /** HTTP referrer header */
  referrer?: string;
  /** User agent string */
  user_agent?: string;
  /** Source IP address (for analytics, not stored as PII) */
  source_ip?: string;
  /** Optional traffic source string (e.g., 'email', 'social') */
  source?: string;
}

/**
 * Event fired when a user hits the /redirect endpoint
 */
export interface RedirectToProductEvent extends BaseEvent {
  event_type: 'redirect_to_product';
  /** Destination URL the user was redirected to */
  destination_url: string;
  /** HTTP status code of the redirect (should be 302) */
  redirect_status: number;
}

/**
 * Event fired when a user visits a product page
 */
export interface ProductPageViewEvent extends BaseEvent {
  event_type: 'product_page_view';
  /** Full URL of the product page */
  page_url: string;
  /** Whether this view came from a tracked redirect */
  from_redirect: boolean;
}

/**
 * Event fired when a user starts the checkout process
 */
export interface CheckoutStartedEvent extends BaseEvent {
  event_type: 'checkout_started';
  /** Stripe checkout session ID */
  checkout_session_id: string;
  /** Product price in cents */
  amount_cents: number;
  /** Currency code (e.g., 'usd') */
  currency: string;
}

/**
 * Event fired when a purchase is completed (from Stripe webhook)
 */
export interface PurchaseCompletedEvent extends BaseEvent {
  event_type: 'purchase_completed';
  /** Stripe checkout session ID */
  checkout_session_id: string;
  /** Stripe payment intent ID */
  payment_intent_id: string;
  /** Amount paid in cents */
  amount_paid_cents: number;
  /** Currency code */
  currency: string;
  /** Stripe customer ID */
  customer_id?: string;
  /** Customer email from Stripe */
  customer_email?: string;
}

/**
 * Union type for all analytics events
 */
export type AnalyticsEvent = 
  | RedirectToProductEvent 
  | ProductPageViewEvent 
  | CheckoutStartedEvent 
  | PurchaseCompletedEvent;

/**
 * Attribution data stored in cookies
 */
export interface AttributionData {
  /** Product slug */
  p: string;
  /** User identifier (optional) */
  u?: string;
  /** Request ID for correlation */
  rid: string;
  /** Timestamp when attribution was set */
  ts: string;
}

/**
 * Request metadata extracted from HTTP request
 */
export interface RequestMetadata {
  referrer?: string;
  user_agent?: string;
  source_ip?: string;
}

/**
 * Stripe webhook event data
 */
export interface StripeWebhookData {
  id: string;
  object: string;
  created: number;
  livemode: boolean;
  pending_webhooks: number;
  request: {
    id: string | null;
    idempotency_key: string | null;
  };
  type: string;
  data: {
    object: any;
  };
}

/**
 * Stripe checkout session metadata
 */
export interface StripeCheckoutMetadata {
  product?: string;
  user_id?: string;
  request_id?: string;
  attribution_data?: string; // JSON string of AttributionData
}

/**
 * Response from redirect API endpoint
 */
export interface RedirectResponse {
  success: boolean;
  error?: string;
  request_id?: string;
}

/**
 * Validation error details
 */
export interface ValidationError {
  field: string;
  message: string;
  received?: any;
}