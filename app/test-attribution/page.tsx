'use client';

import { useAttribution, useCheckoutTracking } from '@/hooks/useAttribution';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function TestAttributionPage() {
  const { attribution, hasAttribution, fromRedirect } = useAttribution();
  const { enhanceStripeUrl } = useCheckoutTracking();
  const [enhancedUrl, setEnhancedUrl] = useState<string>('');

  const ORIGINAL_STRIPE_URL = 'https://buy.stripe.com/aFa14m87e3xhdlx3wVfrW01';

  useEffect(() => {
    // Generate enhanced URL when attribution loads
    if (attribution) {
      const enhanced = enhanceStripeUrl(ORIGINAL_STRIPE_URL);
      setEnhancedUrl(enhanced);
    }
  }, [attribution, enhanceStripeUrl]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Attribution Tracking Test</h1>
      
      {/* Attribution Status */}
      <div className="mb-8 p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Current Attribution Status</h2>
        
        {hasAttribution ? (
          <div className="space-y-2">
            <div className="text-green-600">✅ Attribution data found!</div>
            <div><strong>Product:</strong> {attribution?.p}</div>
            <div><strong>User ID:</strong> {attribution?.u || 'None'}</div>
            <div><strong>Request ID:</strong> {attribution?.rid}</div>
            <div><strong>Timestamp:</strong> {attribution?.ts}</div>
            <div><strong>From Redirect:</strong> {fromRedirect ? 'Yes' : 'No'}</div>
          </div>
        ) : (
          <div className="text-orange-600">
            ⚠️ No attribution data found. 
            <a href="/api/redirect?p=quickread&u=testuser123" className="ml-2 underline text-blue-600">
              Click here to set attribution
            </a>
          </div>
        )}
      </div>

      {/* URL Comparison */}
      <div className="mb-8 p-4 rounded-lg border">
        <h2 className="text-xl font-semibold mb-4">Stripe URL Enhancement</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Original Stripe URL:</label>
            <code className="block p-2 bg-gray-100 rounded text-sm break-all">
              {ORIGINAL_STRIPE_URL}
            </code>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Enhanced URL (with client_reference_id):</label>
            <code className="block p-2 bg-blue-50 rounded text-sm break-all">
              {enhancedUrl || 'No attribution data available'}
            </code>
          </div>
          
          {enhancedUrl && (
            <div className="text-sm text-gray-600">
              ✨ The <code>client_reference_id</code> parameter contains encoded attribution data that Stripe will return to us after checkout completion.
            </div>
          )}
        </div>
      </div>

      {/* Test Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test Actions</h2>
        
        <div className="flex gap-4">
          <Button asChild>
            <a href="/api/redirect?p=quickread&u=testuser123">
              1. Set Attribution Data
            </a>
          </Button>
          
          {enhancedUrl && (
            <Button 
              onClick={() => {
                console.log('🚀 Opening enhanced Stripe URL:', enhancedUrl);
                window.open(enhancedUrl, '_blank');
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              2. Test Enhanced Checkout
            </Button>
          )}
          
          <Button asChild variant="outline">
            <a href="/api/purchase-redirect?session_id=test-session-123">
              3. Test Post-Purchase
            </a>
          </Button>
        </div>
      </div>

      {/* Expected Flow */}
      <div className="mt-8 p-4 rounded-lg bg-blue-50">
        <h2 className="text-xl font-semibold mb-4">Expected Flow</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm">
          <li>User clicks marketing link → <code>/api/redirect?p=quickread&u=123</code></li>
          <li>Attribution cookie set → User redirected to product</li>
          <li>On product page → Attribution data loaded from cookie</li>
          <li>Buy button clicked → Stripe URL enhanced with <code>client_reference_id</code></li>
          <li>User completes Stripe checkout → Stripe stores the <code>client_reference_id</code></li>
          <li>Stripe redirects to success URL → <code>/api/purchase-redirect?session_id=cs_xxx</code></li>
          <li>Server retrieves session → Extracts attribution from <code>client_reference_id</code></li>
          <li>Purchase logged → User redirected to product</li>
        </ol>
      </div>
    </div>
  );
}