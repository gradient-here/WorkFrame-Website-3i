import Link from "next/link"
import { ToolCard } from "@/components/tool-card"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "WorkFrame Products — Tools, courses, and commerce",
  description:
    "Explore WorkFrame’s toolkit, courses, and creator‑friendly commerce that connect reading, notes, and writing.",
}

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12 md:py-16">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Products that work together</h1>
        <p className="mt-2 text-muted-foreground">Start anywhere. Everything connects.</p>
      </header>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Tools</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ToolCard title="Quickread" description="Pick your next book with confidence." href="/products/quickread" />
          <ToolCard
            title="Topic Atomizer"
            description="Break any idea into angles, arguments, and questions."
            href="/products/topic-atomizer"
          />
          <ToolCard
            title="Chat on a Page"
            description="Converse with a page while you read."
            href="/products/chat-on-a-page"
          />
          <ToolCard
            title="Chat (Synthesis)"
            description="Synthesize across your notes for outlines and drafts."
            href="/products/chat"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Courses</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">How to Read More & Remember What You’ve Read</h3>
              <p className="mt-2 text-sm text-muted-foreground">Habits, capture, and recall.</p>
              <Link href="/courses/read-more-remember" className="mt-3 inline-block text-indigo-700 hover:underline">
                See syllabus
              </Link>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Mining Your Second Brain for Content</h3>
              <p className="mt-2 text-sm text-muted-foreground">Turn notes into a content engine.</p>
              <Link href="/courses/mining-second-brain" className="mt-3 inline-block text-indigo-700 hover:underline">
                See syllabus
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="mt-4 text-sm text-muted-foreground">Learning paths available as bundles.</div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Commerce</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Affiliate book hub</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Staff picks with honest notes; links support the project.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Custom products</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Notebooks, pencils, notepads designed for atomic notes.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Merch</h3>
              <p className="mt-2 text-sm text-muted-foreground">Hoodies and simple apparel.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12 flex items-center justify-between rounded-lg border px-6 py-6">
        <div>
          <h3 className="font-semibold">Not sure where to start? Try Quickread — it’s free.</h3>
        </div>
        <Button asChild className="bg-indigo-600 hover:bg-indigo-700">
          <Link href="/products/quickread">Try Quickread</Link>
        </Button>
      </section>
    </div>
  )
}
