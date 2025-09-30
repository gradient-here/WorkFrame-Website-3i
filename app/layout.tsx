import type React from "react"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import "./globals.css"
import { PostHogProvider } from "@/components/PostHogProvider"
import { Outfit } from 'next/font/google'

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL("https://workframe.example.com"),
  title: "WorkFrame — From book to brilliant idea",
  description:
    "WorkFrame helps creators and knowledge workers turn reading into ideas, and ideas into publishable work. Tools, courses, and community for reading, note-making, and content creation.",
  openGraph: {
    title: "WorkFrame — From book to brilliant idea",
    description:
      "WorkFrame helps creators and knowledge workers turn reading into ideas, and ideas into publishable work. Tools, courses, and community for reading, note-making, and content creation.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WorkFrame — From book to brilliant idea",
    description:
      "WorkFrame helps creators and knowledge workers turn reading into ideas, and ideas into publishable work.",
    images: ["/og.png"],
  },
  generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="antialiased">
        <PostHogProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </PostHogProvider>
      </body>
    </html>
  )
}