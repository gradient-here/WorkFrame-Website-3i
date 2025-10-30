"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CourseCard } from "@/components/course-card"
import { Testimonial } from "@/components/testimonial"
import { CtaBand } from "@/components/cta-band"
import { Sparkles, BookOpen, Wand2, MessagesSquare, PlayCircle } from "lucide-react"
import { ToolCard } from "@/components/tool-card"
import { PrimaryChip } from "@/components/primary-chip"
import { motion } from 'framer-motion'

// export const metadata = {
//   title: "WorkFrame — Tools and courses to turn reading into content",
//   description: "Turn what you read into ideas and publishable work with WorkFrames tools, courses, and community.",
// }

async function sendDiscordWebhook({ action }: {action: string}) {
  const content = `Product Engagement!\action: ${action}`
  const res = await fetch("/api/discord-webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
  return res.ok
}

export default function HomeClientPage() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 md:grid-cols-2 md:px-6 md:py-24">
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2 background-transparent text-black px-4 py-2 mb-8 rounded-full border border-neutral-200 hover:bg-neutral-50 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-accent-500" />
              <span className="sm:text-[11px] text-[10px] font-small text-muted-foreground">
                Trusted by writers, researchers, and lifelong learners.
              </span>
            </motion.div>
            <h1 className="text-4xl/tight font-semibold tracking-tight md:text-5xl">From book to brilliant idea</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tools and courses that help you read more and actually remember what you read.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button asChild>
                <Link href="/account/onboarding">Start free</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/resources#videos" className="inline-flex items-center gap-2">
                  <PlayCircle className="h-4 w-4" aria-hidden="true" />
                  Watch a 2‑minute demo
                </Link>
              </Button>
            </div>
          </div>
          <div aria-hidden="true" className="relative">
            <img
              src="/readwrite.png?height=420&width=600"
              alt="Diagram of the Read → Record → Write workflow"
              height={420}
              width={600}
            />
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          Learn smarter. Think deeper. Create faster.
        </h2>
        <p className="mt-3 text-muted-foreground">
          WorkFrame connects your reading, notes, and writing so progress compounds over time.
        </p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-medium">Learn smarter</h3>
              <p className="mt-1 text-sm text-muted-foreground">Choose the right books and read with purpose.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
                <Wand2 className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-medium">Think deeper</h3>
              <p className="mt-1 text-sm text-muted-foreground">Capture atomic notes and uncover connections.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-md bg-black text-white">
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
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">The WorkFrame toolkit</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <ToolCard
              title="🟨🟦🟥 Quickread"
              description="Pick your next book with confidence."
              href="/products/quickread"
              imageUrl="/quickread_icon.png?height=160&width=320"
            />
            <ToolCard
              title="🟨🟦🟥 Zettelkasten"
              description="Break any idea into angles, arguments, and questions."
              href="/products/zettelkasten"
              imageUrl="/Zettelkasten_icon.png?height=160&width=320"
            />
            {/* <ToolCard
              title="Topic Atomizer"
              description="Converse with a page while you read."
              href="/products/chat-on-a-page"
              imageUrl="/placeholder.svg?height=160&width=320"
            />
            <ToolCard
              title="Chat (Synthesis)"
              description="Synthesize across your notes for outlines and drafts."
              href="/products/chat"
              imageUrl="/placeholder.svg?height=160&width=320"
            /> */}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto grid max-w-[1200px] items-center gap-8 px-4 py-16 md:grid-cols-[1fr_320px] md:px-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">One workflow, many outputs</h2>
          <p className="mt-3 text-muted-foreground">
            Read → Record → Write. Your notes become the knowledge base that feeds articles, videos, talks, and more.
          </p>
          <div className="mt-6">
            <Button asChild variant="outline">
              <Link href="/how-it-works">See the workflow</Link>
            </Button>
          </div>
        </div>
        <div className="relative">
          <img
            src="/placeholder.svg?height=220&width=320"
            alt="Workflow diagram"
            className="w-full rounded-lg border grayscale contrast-125"
            height={220}
            width={320}
          />
          <PrimaryChip className="absolute bottom-2 right-2" size="sm" />
        </div>
      </section>

      {/* Courses preview */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Learn the system behind the tools</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div onClick={() => sendDiscordWebhook({action: "Read More & Remember"})}>
              <CourseCard
                title="How to Read More & Remember What You’ve Read"
                blurb="Build the habits and capture systems that stick."
                href="/"
              />
            </div>
            <div onClick={() => sendDiscordWebhook({action: "Mining Second Brain"})}>
              <CourseCard
                title="Mining Your Second Brain for Content"
                blurb="Turn notes into a reliable content engine."
                href="/"
              />
            </div>
            {/* <CourseCard
              onClick={() => sendDiscordWebhook({action: "Read More & Remember"})}
              title="How to Read More & Remember What You’ve Read"
              blurb="Build the habits and capture systems that stick."
              href="/"
            />
            <CourseCard
              title="Mining Your Second Brain for Content"
              blurb="Turn notes into a reliable content engine."
              // href="/courses/mining-second-brain"
            /> */}
          </div>
        </div>
      </section>

      {/* Customer proof */}
      <section className="mx-auto max-w-[1200px] px-4 py-16 md:px-6">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Results we love</h2>
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

      <CtaBand />
    </div>
  )
}
