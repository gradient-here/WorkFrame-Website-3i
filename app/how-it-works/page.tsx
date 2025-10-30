import type { Metadata } from "next"
import HowItWorksClientPage from "./how-it-works-client"

export const metadata: Metadata = {
  title: "How WorkFrame Works — From reading to content",
  description: "See how the WorkFrame workflow turns reading into connected notes and publishable output. Read → Record → Write.",
  openGraph: {
    title: "How WorkFrame Works — From reading to content",
    description: "A simple workflow powered by connected notes: Read → Record → Write. Turn your reading into ideas and publishable work.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "How WorkFrame Works — From reading to content",
    description: "See how the WorkFrame workflow turns reading into connected notes and publishable output.",
  },
}

export default function HowItWorksPage() {
  return <HowItWorksClientPage />
}
