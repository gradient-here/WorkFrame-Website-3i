"use client"
import React, { useEffect } from "react"
import { getProductBySlug } from "@/lib/product-config"
import { createRedirectEvent } from "@/lib/attribution-utils"

function generateClientRequestId(): string {
  try {
    if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
      const arr = new Uint8Array(16)
      crypto.getRandomValues(arr)
      return Array.from(arr).map((b) => b.toString(16).padStart(2, '0')).join('')
    }
  } catch (e) {
    // ignore
  }

  return `${Date.now().toString(16)}-${Math.random().toString(16).slice(2)}`
}

export default function RedirectPage() {
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const p = params.get('p')
      const u = params.get('u')
      const source = params.get('source')

      if (!p) {
        window.location.href = '/'
        return
      }

      const product = getProductBySlug(p)
      if (!product) {
        window.location.href = '/404'
        return
      }

      let destinationUrl = product.url.startsWith('http')
        ? product.url
        : `${window.location.origin}${product.url}`

      if (source) {
        const urlObj = new URL(destinationUrl)
        urlObj.searchParams.set('utm_source', source)
        destinationUrl = urlObj.toString()
      }

      const requestId = generateClientRequestId()

      const metadata = {
        referrer: document.referrer || undefined,
        user_agent: navigator.userAgent || undefined,
        source_ip: 'client'
      }

      const analyticsEvent = createRedirectEvent(p, destinationUrl, requestId, metadata as any, u || undefined, source || undefined)

      const trackAnalytics = () => {
        return new Promise(async (resolve, reject) => {
          try {
            const res = await fetch('/api/analytics/track', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(analyticsEvent),
              keepalive: true,
            })

            if (!res.ok) throw new Error('Analytics endpoint returned non-OK')

            resolve(res)
          } catch (error: any) {
            if (error?.name !== 'AbortError') {
              console.warn('Analytics tracking failed:', error)
            }

            reject(error)
          }
        })
      }

      const redirect = () => {
        try {
          window.location.href = destinationUrl
        } catch (err) {
          window.open(destinationUrl, '_self')
        }
      }

      trackAnalytics().then(() => { redirect() }).catch((e) => console.log('Analytics tracking failed :: ' + e)

    } catch (err) {
      console.error('Redirect client error', err)
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
      <div className="text-center loader">
        <div className="spinner border-2 border-slate-200 border-t-2 border-t-blue-600 rounded-full w-6 h-6 animate-spin mx-auto mb-4" />
        <p className="text-sm text-slate-600">Redirecting you now...</p>
      </div>
    </div>
  )
}
