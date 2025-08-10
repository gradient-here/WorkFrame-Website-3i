import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CourseCard } from "@/components/course-card"
import { Testimonial } from "@/components/testimonial"
import { CtaBand } from "@/components/cta-band"
import { BookOpen, Wand2, MessagesSquare, PlayCircle } from "lucide-react"
import { ToolCard } from "@/components/tool-card"

export const metadata = {
  title: "WorkFrame — Tools and courses to turn reading into content",
  description: "Turn what you read into ideas and publishable work with WorkFrame’s tools, courses, and community.",
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-16 md:py-24 grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl/tight md:text-5xl font-semibold tracking-tight">From book to brilliant idea</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tools and courses that turn what you read into reusable ideas — and reusable ideas into finished content.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/account/onboarding">Start free</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/resources#videos" className="inline-flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Watch a 2‑minute demo
                </Link>
              </Button>
            </div>
            <div className="mt-4">
              <Badge variant="secondary">{"Trusted by writers, researchers, and lifelong learners."}</Badge>
            </div>
          </div>
          <div aria-hidden="true">
            <img
              src="/placeholder.svg?height=420&width=600"
              alt="Diagram of the Read → Record → Write workflow"
              className="w-full rounded-lg border"
              height={420}
              width={600}
            />
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Learn smarter. Think deeper. Create faster.
        </h2>
        <p className="mt-3 text-muted-foreground">
          WorkFrame connects your reading, notes, and writing so progress compounds over time.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-medium">Learn smarter</h3>
              <p className="mt-1 text-sm text-muted-foreground">Choose the right books and read with purpose.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                <Wand2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-medium">Think deeper</h3>
              <p className="mt-1 text-sm text-muted-foreground">Capture atomic notes and uncover connections.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                <MessagesSquare className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-medium">Create faster</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Turn notes into outlines, drafts, and distribution plans.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Tools overview */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">The WorkFrame toolkit</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ToolCard
              title="Quickread"
              description="Pick your next book with confidence."
              href="/products/quickread"
              imageUrl="/placeholder.svg?height=160&width=320"
            />
            <ToolCard
              title="Topic Atomizer"
              description="Break any idea into angles, arguments, and questions."
              href="/products/topic-atomizer"
              imageUrl="/placeholder.svg?height=160&width=320"
            />
            <ToolCard
              title="Chat on a Page"
              description="Converse with a page while you read."
              href="/products/chat-on-a-page"
              imageUrl="/placeholder.svg?height=160&width=320"
            />
            <ToolCard
              title="Chat (Synthesis)"
              description="Synthesize across your notes for outlines and drafts."
              href="/products/chat"
              imageUrl="/placeholder.svg?height=160&width=320"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16">
        <div className="grid gap-8 md:grid-cols-[1fr_320px] items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">One workflow, many outputs</h2>
            <p className="mt-3 text-muted-foreground">
              Read → Record → Write. Your notes become a Zettelkasten that feeds articles, videos, talks, and more.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline">
                <Link href="/how-it-works">See the workflow</Link>
              </Button>
            </div>
          </div>
          <img
            src="/placeholder.svg?height=220&width=320"
            alt="Workflow diagram"
            className="w-full rounded-lg border"
            height={220}
            width={320}
          />
        </div>
      </section>

      {/* Courses preview */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Learn the system behind the tools</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <CourseCard
              title="How to Read More & Remember What You’ve Read"
              blurb="Build the habits and capture systems that stick."
              href="/courses/read-more-remember"
            />
            <CourseCard
              title="Mining Your Second Brain for Content"
              blurb="Turn notes into a reliable content engine."
              href="/courses/mining-second-brain"
            />
          </div>
        </div>
      </section>

      {/* Customer proof */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Results we love</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Testimonial
            quote="Quickread helped me stop doom‑scrolling book lists and start reading what matters."
            name="Jamie L."
            role="Writer"
          />
          <Testimonial
            quote="Atomizer broke my research topic into angles I hadn’t considered."
            name="Rahul K."
            role="Consultant"
          />
          <Testimonial
            quote="Chat on a Page made my study sessions way more productive."
            name="Sofia A."
            role="Student"
          />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Get one new idea each week</h2>
          <p className="mt-2 text-muted-foreground">A short email on reading smarter and creating faster.</p>
          <div className="mt-6">
            {/* Reuse footer form but inline here */}
            {/* Intentionally duplicated for clarity */}
            {/* eslint-disable-next-line jsx-a11y/aria-proptypes */}
            {/* We'll just embed same component */}
            {/* @ts-expect-error Server Component to Client Component boundary is acceptable */}
            {/**/}
          </div>
        </div>
      </section>

      <CtaBand />
    </div>
  )
}
