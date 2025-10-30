import type { Metadata } from "next"
import CommunityClientPage from "./community-client"

export const metadata: Metadata = {
  title: "WorkFrame Community — Challenges and workshops",
  description: "Join creators and researchers building better reading and writing habits together. 7-day challenges, live workshops, and beta access.",
  openGraph: {
    title: "WorkFrame Community — Challenges and workshops",
    description: "Join creators and researchers building better reading and writing habits together.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkFrame Community — Challenges and workshops",
    description: "Join creators and researchers building better reading and writing habits together.",
  },
}

export default function CommunityPage() {
  return <CommunityClientPage />
}
