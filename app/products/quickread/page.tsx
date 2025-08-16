import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata = {
  title: "Quickread — Choose your next book with confidence",
  description: "Goal‑based book picks, rationales, and a reading queue that feeds your notes.",
}

export default function QuickreadPage() {
  return (
    <div>
      <section className="border-b">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-14 md:py-20 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Decide What to Read Next in Seconds.</h1>
            <p className="mt-3 text-lg text-muted-foreground">
              QuickRead by WorkFrame gives you instant summaries and key insights, making it fast and easy to find your next great read with confidence.
            </p>
            <div className="mt-6">
              <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
                <Link href="https://buy.stripe.com/6oUdR873ad7R2GTc3rfrW00">Get Quickread</Link>
              </Button>
            </div>
          </div>
          <video
            className="w-full rounded-lg max-w-md mx-auto md:max-w-none md:w-2/3"
            playsInline           // important for iOS
            muted                 // required for autoplay
            autoPlay              // will work only if muted + inline
            loop
            preload="auto"        // optional: hint to load
            poster="/workframe_quickread_poster.jpg" // optional: placeholder frame
          >
            <source src="/workframe_quickread.mp4" type="video/mp4" />
            {/* Optional second source for broader support */}
            <source src="/workframe_quickread.webm" type="video/webm" />
          </video>

          {/* <video
            src="/workframe_quickread.mp4"
            className="w-full rounded-lg max-w-md mx-auto md:max-w-none md:w-2/3"
            autoPlay
            loop
            muted
          /> */}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Tell us your goal and time window</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Get a ranked shortlist with why‑this‑book rationale</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Save to your reading queue + affiliate links</h3>
            </CardContent>
          </Card>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Features</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Goal‑based recommendations
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> “Why this book” reasoning
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Reading queue with reminders
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Export to notes (Z‑ready)
          </li>
        </ul>

        <div className="mt-12 rounded-lg border p-6">
          <h3 className="font-semibold">Pricing</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Included in Free plan; Pro unlocks saved queues and exports.
          </p>
          <div className="mt-4">
            <Button asChild variant="outline">
              <Link href="/account/onboarding">Start free</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
