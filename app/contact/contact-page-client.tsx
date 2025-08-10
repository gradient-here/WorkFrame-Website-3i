"use client"

import ContactForm from "./contact-form"

export default function ContactPageClient() {
  return (
    <div className="mx-auto max-w-[800px] px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Say hello</h1>
      <p className="mt-2 text-muted-foreground">Partnerships, support, and press.</p>

      <div className="mt-8">
        <ContactForm />
      </div>

      <div className="mt-8 text-sm text-muted-foreground">
        Or email support@workframe.example · Follow @workframe on social
      </div>
    </div>
  )
}
