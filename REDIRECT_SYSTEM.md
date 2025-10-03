# Product Redirect System

This document describes the product redirect system implementation for tracking attribution and analytics across the user journey from redirect → product → checkout → purchase.

## System Overview

The redirect system implements the following flow:

```
Marketing Link → /api/redirect?p=quickread&u=123 → External Product (ChatGPT/Notion) → Purchase Tracking
```

**Product Destinations:**
- `quickread` → https://chatgpt.com/g/g-689bf5fb269481918fccb4ffc7c32451-quickread
- `zettelkasten` → https://www.notion.so/Zettelkasten-26de70b7724b8088870acb39d8538f9e?duplicate=true&from=stripe

## Files Created

### Core Configuration
- `lib/product-config.ts` - Product mapping configuration with allowlisted slugs
- `lib/analytics-types.ts` - TypeScript types for all analytics events
- `lib/attribution-utils.ts` - Utility functions for attribution tracking and cookies
- `lib/analytics-service.ts` - PostHog integration service

### API Endpoints
- `app/api/redirect/route.ts` - Main redirect endpoint with validation and tracking
- `app/api/stripe/webhook/route.ts` - Stripe webhook handler for purchase completion

### Client-Side Integration
- `hooks/useAttribution.ts` - React hooks for client-side attribution tracking
- Updated `app/products/quickread/page.tsx` - Added analytics tracking to product page

## Testing the System

### 1. Start Development Server
```bash
pnpm dev
```

### 2. Test Basic Redirect (MVP)
Navigate to:
```
http://localhost:3000/api/redirect?p=quickread
```

Expected result:
- HTTP 302 redirect to `https://chatgpt.com/g/g-689bf5fb269481918fccb4ffc7c32451-quickread`
- Attribution cookie set
- `redirect_to_product` event logged to PostHog

### 3. Test Redirect with User ID (Stretch Goal)
Navigate to:
```
http://localhost:3000/api/redirect?p=quickread&u=user123
```

Expected result:
- HTTP 302 redirect to `https://chatgpt.com/g/g-689bf5fb269481918fccb4ffc7c32451-quickread`
- Attribution cookie set with user ID
- Event logged with user attribution

### 3b. Test Zettelkasten Product
Navigate to:
```
http://localhost:3000/api/redirect?p=zettelkasten&u=user456
```

Expected result:
- HTTP 302 redirect to `https://www.notion.so/Zettelkasten-26de70b7724b8088870acb39d8538f9e?duplicate=true&from=stripe`
- Attribution cookie set with user ID
- Event logged for zettelkasten product

### 4. Test Error Handling
Try invalid requests:
```
http://localhost:3000/api/redirect
http://localhost:3000/api/redirect?p=invalid-product
http://localhost:3000/api/redirect?p=quickread&u=invalid<>user
```

Expected results:
- HTTP 400 responses with validation errors
- No redirects performed
- Error messages logged

### 5. Test Product Page Analytics
1. Visit `/products/quickread` directly
2. Visit via redirect link
3. Check browser console for tracking events
4. Look for "Special link detected" message when coming from redirect

### 6. Test Checkout Tracking
1. Visit `/products/quickread` via redirect
2. Click "Get QuickRead" or "Buy QuickRead" buttons
3. Check browser console for `checkout_started` events

## Environment Variables Required

Make sure these are set in your `.env.local`:

```bash
# PostHog Analytics (required for tracking)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Stripe (for webhook signature verification - TODO)
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# Discord (existing functionality)
DISCORD_WEBHOOK_URL=your_discord_webhook
```

## Features Implemented

### ✅ Core Requirements Met
- **REQ-1.1.1 to REQ-1.1.5**: `/redirect` endpoint with validation and HTTP 302 redirects
- **REQ-1.2.1 to REQ-1.2.5**: Analytics tracking with PostHog, attribution cookies, request IDs
- **REQ-1.3.1 to REQ-1.3.5**: Stripe webhook handler structure (signature verification TODO)
- **REQ-2.1.1 to REQ-2.1.4**: Security measures including input sanitization and allowlists
- **REQ-2.2.2**: Asynchronous analytics logging to minimize redirect latency
- **REQ-3.1.1 to REQ-3.1.3**: Configurable product mapping
- **REQ-3.2.1 to REQ-3.2.5**: Complete analytics event schemas

### ⚠️ TODO Items
1. **Stripe Signature Verification**: Currently commented out in webhook handler
2. **Production Environment Variables**: Set up proper PostHog and Stripe keys
3. **Metadata Handling**: Client component can't export metadata (consider layout approach)
4. **Additional Product Pages**: Only QuickRead page updated so far

## System Architecture

### Request Flow
1. User clicks marketing link → `/api/redirect?p=quickread&u=123`
2. Server validates parameters against product allowlist
3. Server generates request ID and extracts metadata
4. Server sets attribution cookie and logs `redirect_to_product` event
5. Server returns HTTP 302 redirect to product page
6. Client loads product page and logs `product_page_view` event
7. User clicks buy button → logs `checkout_started` event
8. Stripe webhook receives `checkout.session.completed` → logs `purchase_completed` event

### Analytics Events Schema
- `redirect_to_product`: User hit redirect endpoint
- `product_page_view`: User viewed product page  
- `checkout_started`: User clicked buy button
- `purchase_completed`: Purchase completed via Stripe

### Attribution Cookie Format
```json
{
  "p": "quickread",        // product slug
  "u": "user123",          // user ID (optional)
  "rid": "abc123def456",   // request ID for correlation
  "ts": "2024-01-01T00:00:00.000Z"  // timestamp
}
```

## Monitoring and Debugging

### PostHog Events
Check your PostHog dashboard for these events:
- `redirect_to_product`
- `product_page_view` 
- `checkout_started`
- `purchase_completed`

### Browser Console
Client-side tracking logs appear in browser console:
```
Product page view tracked: { product: 'quickread', from_redirect: true, has_attribution: true }
Checkout started tracked: { product: 'quickread', checkout_url: '...', has_attribution: true }
```

### Server Logs
Check server console for:
- Redirect validation and processing
- Analytics event logging
- Error handling and warnings

## Security Notes

- Product destinations are allowlisted to prevent open redirects
- All user inputs are sanitized and validated
- Attribution cookies are httpOnly in production
- Request IDs prevent event correlation attacks
- Stripe webhook signatures should be verified (TODO)