import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Course — How to Read More & Remember What You’ve Read",
  description: "Build better reading habits and a capture system that compounds your learning.",
}

export default function ReadMoreCourse() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="grid gap-6 md:grid-cols-[1fr_320px] items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Read more. Remember more.</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            A practical system for choosing what to read, building the habit, and capturing ideas you’ll use later.
          </p>
          <div className="mt-6 flex gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Enroll now</Button>
            <Button variant="outline">See syllabus</Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Format</div>
            <div className="mt-1">2 hours of video · templates · live Q&A replay · certificate</div>
            <div className="mt-4 text-sm text-muted-foreground">Outcomes</div>
            <ul className="mt-1 list-disc pl-5 text-sm">
              <li>A curated reading queue</li>
              <li>A repeatable capture workflow</li>
              <li>A review cadence that sticks</li>
            </ul>
            <div className="mt-4 text-sm text-muted-foreground">Pricing</div>
            <div className="mt-1 text-sm">Standalone price + bundle with Quickread Pro</div>
          </CardContent>
        </Card>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Syllabus</h2>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="m1">
            <AccordionTrigger>Choosing what to read with Quickread</AccordionTrigger>
            <AccordionContent>Use goals and time windows to pick high‑leverage books.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m2">
            <AccordionTrigger>Reading habit strategies</AccordionTrigger>
            <AccordionContent>Practical tactics to read consistently.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m3">
            <AccordionTrigger>Flagging ideas while you read</AccordionTrigger>
            <AccordionContent>Light‑weight capture to mark ideas for later.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m4">
            <AccordionTrigger>Recording notes as atomic Zettels</AccordionTrigger>
            <AccordionContent>Write notes you’ll reuse and connect.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m5">
            <AccordionTrigger>Reflection cadences & spaced review</AccordionTrigger>
            <AccordionContent>Make what you learn stick with simple reviews.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="q1">
            <AccordionTrigger>Is it beginner‑friendly?</AccordionTrigger>
            <AccordionContent>Yes. No prior systems knowledge required.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>How long does it take?</AccordionTrigger>
            <AccordionContent>About two hours to watch; put it into practice at your pace.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>Do I need special software?</AccordionTrigger>
            <AccordionContent>No. We share templates and options.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>Refund policy?</AccordionTrigger>
            <AccordionContent>14‑day no‑questions‑asked refund.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}
