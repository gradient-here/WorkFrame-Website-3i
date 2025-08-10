import type { Metadata } from "next"
import ContactPageClient from "./contact-page-client"

export const metadata: Metadata = {
  title: "Contact WorkFrame",
  description: "Get in touch about partnerships, press, or support.",
}

export default function ContactPage() {
  return <ContactPageClient />
}
