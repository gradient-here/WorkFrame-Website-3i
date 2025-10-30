import type { Metadata } from "next"
import QuickreadClientPage from "./quickread-client"

export const metadata: Metadata = {
  title: "QuickRead — Choose your next book with confidence",
  description: "Goal‑based book picks, rationales, and a reading queue that feeds your notes. Instantly grasp the core ideas of any book.",
  openGraph: {
    title: "QuickRead — Choose your next book with confidence",
    description: "Instantly grasp the core ideas of any book. QuickRead helps busy professionals, students, and lifelong learners choose what's worth their time.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "QuickRead — Choose your next book with confidence",
    description: "Goal‑based book picks, rationales, and a reading queue that feeds your notes.",
  },
}

export default function QuickreadPage() {
  return <QuickreadClientPage />
}
