import type { Metadata } from "next"
import ZettelClientPage from "./zettelkasten-client"

export const metadata: Metadata = {
  title: "Zettelkasten — Never lose a brilliant idea again",
  description: "Transform scattered thoughts into connected insights. Zettelkasten helps you capture and grow your ideas over time with a durable knowledge graph in Notion.",
  openGraph: {
    title: "Zettelkasten — Never lose a brilliant idea again",
    description: "Build a durable knowledge graph in Notion. Turn scattered highlights into a connected knowledge system.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zettelkasten — Never lose a brilliant idea again",
    description: "Transform scattered thoughts into connected insights with our Notion template.",
  },
}

export default function ZettelPage() {
  return <ZettelClientPage />
}
