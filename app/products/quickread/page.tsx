import type { Metadata } from "next"
import QuickreadClientPage from "./quickread-client"

export const metadata: Metadata = {
  title: "QuickRead — Choose your next book with confidence",
  description: "Ever bought a book that sounded amazing… but 50 pages in, it’s just not it?",
  openGraph: {
    title: "QuickRead — Choose your next book with confidence",
    description: "Ever bought a book that sounded amazing… but 50 pages in, it’s just not it?",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickRead — Choose your next book with confidence",
    description: "Ever bought a book that sounded amazing… but 50 pages in, it’s just not it?",
  },
}

export default function QuickreadPage() {
  return <QuickreadClientPage />
}
