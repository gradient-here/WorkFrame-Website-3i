'use client';

// Declare global Reddit pixel function
declare global {
  interface Window {
    rdt?: (event: string, action: string, data?: any) => void;
  }
}

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { useLandingPageAttribution } from "@/hooks/useLandingPageAttribution"
import Script from "next/script"

export default function QuickreadClientPage() {
  const { handleBuyButtonClick } = useLandingPageAttribution();

  // Your actual Stripe checkout URL
  const STRIPE_CHECKOUT_URL = 'https://buy.stripe.com/6oUdR873ad7R2GTc3rfrW00'; // Using your original QuickRead URL
  
  // Handle checkout button clicks
  const handleCheckoutClick = () => {
    const enhancedUrl = handleBuyButtonClick('quickread', STRIPE_CHECKOUT_URL);
    
    // Track Reddit conversion event
    if (typeof window !== 'undefined' && window.rdt) {
      window.rdt('track', 'Buy_Button_Click');
    }
    
    console.log('🔗 Original Stripe URL:', STRIPE_CHECKOUT_URL);
    console.log('✨ Enhanced with attribution:', enhancedUrl);
    
    return enhancedUrl;
  };

  return (
    <>
      {/* Reddit Pixel */}
      <Script
        id="reddit-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','a2_gqf2t1jw2qjy');rdt('track', 'PageVisit');
          `
        }}
      />
      <div>
      {/* Header */}
      <section className="border-b">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-14 md:py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <span className="inline-block bg-[#F2F1F3] text-sm text-muted-foreground rounded-full px-3 py-1">QuickRead by WorkFrame</span>
            <h1 className="mt-4 text-4xl md:text-5xl tracking-tight leading-tight">Decide What to Read Next in Seconds.</h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Too many books, too little time? QuickRead by WorkFrame helps busy professionals, students, and lifelong learners instantly grasp the core ideas of any book — so you can choose what's worth your time and start reading with confidence.
            </p>
            <div className="mt-6">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={(e) => {
                  e.preventDefault();
                  const enhancedUrl = handleCheckoutClick();
                  window.open(enhancedUrl, '_blank');
                }}
              >
                👉 Get QuickRead
              </Button>
            </div>
          </div>
          <video
            className="w-full rounded-lg max-w-md mx-auto md:max-w-none md:w-2/3"
            playsInline
            muted              
            autoPlay        
            loop
            preload="auto"
            poster="/workframe_quickread_poster.png"
          >
            <source src="/workframe_quickread.mp4" type="video/mp4" />
          </video>
        </div>
      </section>

      {/* Feature Callouts */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-4">

          <div className="md:col-span-1">
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold">1. Capture Any Book</h3>
              <p className="mt-2 text-sm">Scan a cover or type in a title - physical or digital, QuickRead works with both.</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold">2. Core Insights in Seconds</h3>
              <p className="mt-2 text-sm">Receive instant summaries with the book's main topics and key ideas.</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold">3. Read With Confidence</h3>
              <p className="mt-2 text-sm">Add books to your reading queue with clarity - no more guesswork or wasted time.</p>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="p-6 rounded-lg border">
              <h3 className="font-semibold">4. Anytime, Anywhere</h3>
              <p className="mt-2 text-sm">QuickRead runs inside of ChatGPT on both desktop and mobile.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why QuickRead? */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <div className="flex flex-col items-center mt-8 bg-[#F2F1F3] rounded-t-lg p-6">
          <div className="mt-0 rounded-lg p-0 max-w-100">      
            <img src="/QR_Instant_Summaries.png" alt="Quickread Icon" className="w-full rounded-xl" />
          </div>
        </div>

        <div className="mt-0 rounded-b-lg border p-6">
          {/* <h3 className="font-semibold">QuickRead</h3> */}
          <p className="text-2xl font-bold">Why QuickRead?</p>
          <p className="mt-3 text-md text-muted-foreground">Everyone has a growing TBR pile - books you want to read but never get to. QuickRead helps you cut through the overwhelm and focus on what's truly worth your time.</p>
          {/* <p className="mt-4 text-sm text-muted-foreground">
            With QuickRead, you can:
          </p> */}
          <ul className="mt-2 list-disc space-y-2 pl-6 text-left">
            <li className="pl-0">Quickly see if a book deserves a spot on your list</li>
            <li className="pl-0">Make confident decisions about what to read next</li>
            <li className="pl-0">Clear out your TBR pile filtering out "someday" reads</li>
            <li className="pl-0">Access summaries and insights anytime, anywhere</li>
          </ul>
          <p className="mt-12 text-lg italic">Stop letting your TBR pile hold you back. With QuickRead, you'll spend less time choosing and more time reading what matters.</p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">

        <div className="flex flex-col items-center mt-8 bg-[#F2F1F3] rounded-t-lg p-6">
          <div className="mt-0 rounded-lg p-0 max-w-100">      
            <img src="/QR_Search.png" alt="Quickread Icon" className="w-full rounded-xl" />
          </div>
        </div>

        <div className="mt-0 rounded-b-lg border p-6">

        {/* <h2 className="mt-12 text-xl font-semibold">Features</h2> */}
        <p className="text-2xl font-bold">Features</p>

        <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 text-sm">
          <li className="flex items-start gap-2 md:flex-col md:items-center">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Key ideas in seconds
          </li>
          <li className="flex items-start gap-2 md:flex-col md:items-center">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> One-time purchase (no subscription)
          </li>
          <li className="flex items-start gap-2 md:flex-col md:items-center">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Works with physical & digital books
          </li>
          <li className="flex items-start gap-2 md:flex-col md:items-center">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Easy access via ChatGPT & mobile
          </li>
        </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <div className="flex flex-col items-center mt-8 bg-[#F2F1F3] rounded-t-lg p-6">
          <div className="mt-0 rounded-lg p-0 max-w-100">      
            <img src="/one_time_purchase.png" alt="Quickread Icon" className="w-full rounded-xl" />
          </div>
        </div>

        <div className="mt-0 rounded-b-lg border p-6">
          <h3 className="font-semibold">Pricing</h3>
          <p className="text-2xl font-bold">Get QuickRead Today</p>
          <p className="mt-2 text-sm text-muted-foreground">
            One-time purchase, no subscription required.
          </p>
          <p className="mt-4 text-lg font-semibold">For the price of a book, never second-guess a read again</p>
          <div className="mt-4 flex items-center justify-between">
            <Button 
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                const enhancedUrl = handleCheckoutClick();
                window.open(enhancedUrl, '_blank');
              }}
            >
              Buy QuickRead
            </Button>
            <p className="text-2xl font-bold">$12.00</p>
          </div>
        </div>
      </section>
      </div>
    </>
  )
}
