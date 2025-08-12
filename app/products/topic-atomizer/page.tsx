import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata = {
  title: "Topic Atomizer — Turn any idea into a map of angles",
  description: "Break topics into arguments and questions; save insights straight into your notes.",
}

export default function AtomizerPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Never face a blank page again</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Atomize any topic into angles, questions, and sources to explore.
          </p>
          <div className="mt-6">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
              <Link href="/account/onboarding">Explore Atomizer</Link>
            </Button>
          </div>
        </div>
        <img
          src="/placeholder.svg?height=360&width=520"
          alt="Topic Atomizer UI screenshot"
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
              <h3 className="font-medium">Drop a topic or thesis</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Get atomic prompts: arguments, counterpoints, examples</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Save selections to your Zettelkasten</h3>
            </CardContent>
          </Card>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Features</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Cross‑discipline prompts
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Opposing view generation
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Link suggestions to existing notes
          </li>
        </ul>

        <h2 className="mt-12 text-xl font-semibold">Use cases</h2>
        <div className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <div className="rounded-lg border p-4">Outline essays or videos</div>
          <div className="rounded-lg border p-4">Prep talks and workshops</div>
          <div className="rounded-lg border p-4">Explore new research areas</div>
        </div>
      </section>
    </div>
  )
}
