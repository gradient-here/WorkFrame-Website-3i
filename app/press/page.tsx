import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Press Kit — WorkFrame",
  description: "Press resources for WorkFrame: logos, product screenshots, fact sheet, and contact information.",
  openGraph: {
    title: "Press Kit — WorkFrame",
    description: "Press resources for WorkFrame: logos, product screenshots, fact sheet, and contact information.",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Press Kit — WorkFrame",
    description: "Press resources for WorkFrame: logos, product screenshots, fact sheet, and contact information.",
  },
}

export default function PressPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Press Kit</h1>
      <p className="mt-2 text-muted-foreground">Logos, product screenshots, fact sheet, contact email</p>
    </div>
  )
}
