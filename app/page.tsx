import type { Metadata } from "next"
import HomeClientPage from "./home-client"

export const metadata: Metadata = {
  title: "WorkFrame — From book to brilliant idea",
  description: "WorkFrame helps creators and knowledge workers turn reading into ideas, and ideas into publishable work. Tools, courses, and community for reading, note-making, and content creation.",
  openGraph: {
    title: "WorkFrame — From book to brilliant idea",
    description: "WorkFrame helps creators and knowledge workers turn reading into ideas, and ideas into publishable work. Tools, courses, and community for reading, note-making, and content creation.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkFrame — From book to brilliant idea",
    description: "WorkFrame helps creators and knowledge workers turn reading into ideas, and ideas into publishable work.",
    images: ["/og.png"],
  },
}

export default function HomePage() {
  return <HomeClientPage />
}
