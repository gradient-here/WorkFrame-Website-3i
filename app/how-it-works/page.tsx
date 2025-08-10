import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "How WorkFrame Works — From reading to content",
  description: "See how the WorkFrame workflow turns reading into connected notes and publishable output.",
}

export default function HowItWorksPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Read → Record → Write</h1>
        <p className="mt-2 text-muted-foreground">A simple workflow powered by connected notes.</p>
      </header>

      <section className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Read</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Choose high‑leverage sources with Quickread. Read with Chat on a Page.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Record</h3>
            <p className="mt-2 text-sm text-muted-foreground">Capture atomic notes (Z). Link them as you go.</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Write</h3>
            <p className="mt-2 text-sm text-muted-foreground">Use Chat to synthesize into outlines and drafts.</p>
          </CardContent>
        </Card>
      </section>

      <section className="mt-12 rounded-lg border p-6 grid gap-4 md:grid-cols-[1fr_240px] items-center">
        <div>
          <h3 className="font-semibold">Case study</h3>
          <p className="mt-1 text-sm text-muted-foreground">One book → 5 notes → 2 essays & a talk.</p>
        </div>
        <img
          src="/placeholder.svg?height=160&width=240"
          alt="Case study diagram"
          className="w-full rounded-md border"
          height={160}
          width={240}
        />
      </section>

      <div className="mt-12">
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href="/account/onboarding">Try the workflow</Link>
        </Button>
      </div>
    </div>
  )
}
