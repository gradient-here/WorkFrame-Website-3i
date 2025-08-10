import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata = {
  title: "WorkFrame Chat — From notes to draft",
  description: "Use your connected notes to produce outlines and draft copy.",
}

export default function SynthesisChatPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Synthesize across your notes</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Turn connected notes into outlines, briefs, and draft sections.
          </p>
          <div className="mt-6">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/account/onboarding">Start a synthesis</Link>
            </Button>
          </div>
        </div>
        <img
          src="/placeholder.svg?height=360&width=520"
          alt="Chat (Synthesis) UI"
          className="w-full rounded-lg border"
          height={360}
          width={520}
        />
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">How it works</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Select a theme or tag</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Generate outline + key arguments</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Expand into sections and export to your editor</h3>
            </CardContent>
          </Card>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Features</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Works on your Z connections
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Draft snippets with citations
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Distribution checklist (for blog/newsletter/video)
          </li>
        </ul>
      </section>
    </div>
  )
}
