import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"

export const metadata = {
  title: "Chat on a Page — Converse with the text",
  description: "Explore ideas while you read, then send the best bits to your Zettelkasten.",
}

export default function ChatOnAPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Read with a thinking partner</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Ask questions and annotate as you read a page. Capture highlights as atomic notes.
          </p>
          <div className="mt-6">
            <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
              <Link href="/account/onboarding">Open Chat on a Page</Link>
            </Button>
          </div>
        </div>
        <img
          src="/placeholder.svg?height=360&width=520"
          alt="Chat on a Page UI"
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
              <h3 className="font-medium">Load a page or paste text</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Ask, clarify, and annotate</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Save highlights + responses to Z</h3>
            </CardContent>
          </Card>
        </div>

        <h2 className="mt-12 text-xl font-semibold">Features</h2>
        <ul className="mt-4 grid gap-2 text-sm">
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Side‑by‑side reading + chat
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600" /> Inline citations to the source
          </li>
          <li className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 text-emerald-600" /> One‑click export to notes
          </li>
        </ul>
      </section>
    </div>
  )
}
