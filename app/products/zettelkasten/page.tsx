import type { Metadata } from "next"
import ZettelClientPage from "./zettelkasten-client"

export const metadata: Metadata = {
  title: "Zettelkasten — Build a durable knowledge graph in Notion",
  description: "Stop forgetting what you read and start connecting your ideas. This template makes Notes, Topics, and Sources first-class citizens.",
  openGraph: {
    title: "Zettelkasten — Build a durable knowledge graph in Notion",
    description: "Stop forgetting what you read and start connecting your ideas. This template makes Notes, Topics, and Sources first-class citizens.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zettelkasten — Build a durable knowledge graph in Notion",
    description: "Stop forgetting what you read and start connecting your ideas. This template makes Notes, Topics, and Sources first-class citizens.",
  },
}

export default function ZettelPage() {
  return <ZettelClientPage />
}
