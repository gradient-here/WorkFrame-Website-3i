'use client';

import { useLandingPageAttribution } from '@/hooks/useLandingPageAttribution';
import { Button } from '@/components/ui/button';

export default function LandingDemoPage() {
  const { attribution, handleBuyButtonClick } = useLandingPageAttribution();

  const QUICKREAD_STRIPE_URL = 'https://buy.stripe.com/aFa14m87e3xhdlx3wVfrW01';

  const handleQuickReadPurchase = () => {
    const enhancedUrl = handleBuyButtonClick('quickread', QUICKREAD_STRIPE_URL);
    
    // In production, this would open the Stripe checkout
    // For demo, we'll just log and show what would happen
    console.log('🚀 Would open Stripe checkout with enhanced URL:', enhancedUrl);
    
    // Uncomment this line to actually open Stripe checkout:
    // window.open(enhancedUrl, '_blank');
    
    // For demo, let's simulate what happens after purchase
    alert(`Demo: Would open Stripe checkout with:\\n\\n${enhancedUrl}\\n\\nAfter purchase, user would be redirected back to /api/purchase-redirect`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-8">QuickRead Landing Page Demo</h1>
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-lg mb-8">
        <h2 className="text-3xl font-bold mb-4">Choose Your Next Book with Confidence</h2>
        <p className="text-xl mb-6">
          QuickRead helps busy professionals instantly grasp the core ideas of any book. 
          Know what's worth your time before you commit.
        </p>
        
        <div className="flex gap-4">
          <Button 
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
            onClick={handleQuickReadPurchase}
          >
            🚀 Get QuickRead - $12
          </Button>
          
          <Button 
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-blue-600"
            onClick={handleQuickReadPurchase}
          >
            👉 Buy Now
          </Button>
        </div>
      </div>

      {/* Current Session Info */}
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <h3 className="text-xl font-semibold mb-4">Current Session Info</h3>
        
        {attribution ? (
          <div className="space-y-2">
            <div><strong>Session ID:</strong> <code>{attribution.sessionId}</code></div>
            <div><strong>Timestamp:</strong> {attribution.timestamp}</div>
            <div><strong>Referrer:</strong> {attribution.referrer || 'Direct'}</div>
            
            {attribution.utmParams && Object.keys(attribution.utmParams).length > 0 && (
              <div className="mt-4">
                <strong>UTM Parameters:</strong>
                <ul className="ml-4 mt-2 space-y-1">
                  {Object.entries(attribution.utmParams).map(([key, value]) => 
                    value ? (
                      <li key={key}>
                        <code>{key}</code>: {value}
                      </li>
                    ) : null
                  )}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div>Loading session data...</div>
        )}
      </div>

      {/* Expected Flow */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Expected Flow</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Landing Page:</strong> User arrives (tracked with session ID)</li>
          <li><strong>Buy Button Click:</strong> Enhances Stripe URL with <code>client_reference_id</code></li>
          <li><strong>Stripe Checkout:</strong> User completes purchase on Stripe</li>
          <li><strong>Success Redirect:</strong> Stripe redirects to <code>/api/purchase-redirect?session_id=cs_xxx</code></li>
          <li><strong>Product Redirect:</strong> Server validates purchase and redirects to QuickRead ChatGPT</li>
        </ol>

        <div className="mt-4 p-4 bg-white rounded border-l-4 border-blue-500">
          <strong>Key Point:</strong> The <code>client_reference_id</code> allows us to connect the 
          buy button click with the completed purchase, enabling accurate conversion tracking.
        </div>
      </div>

      {/* Test Links */}
      <div className="mt-8 space-y-4">
        <h3 className="text-xl font-semibold">Test Links</h3>
        <div className="flex gap-4">
          <Button asChild variant="outline">
            <a href="?utm_source=google&utm_medium=cpc&utm_campaign=quickread">
              Test with UTM params
            </a>
          </Button>
          
          <Button asChild variant="outline">
            <a href="/api/purchase-redirect?session_id=test-session-123">
              Test Purchase Redirect
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}