import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Course — Mining Your Second Brain for Content",
  description: "Turn your connected notes into a reliable stream of publishable work.",
}

export default function MiningCourse() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="grid gap-6 md:grid-cols-[1fr_320px] items-start">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Make your notes pay dividends</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            A repeatable method to turn your Zettelkasten into outlines, drafts, and distribution plans.
          </p>
          <div className="mt-6 flex gap-3">
            <Button className="bg-indigo-600 hover:bg-indigo-700">Enroll now</Button>
            <Button variant="outline">See syllabus</Button>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6">
            <div className="text-sm text-muted-foreground">Format</div>
            <div className="mt-1">2.5 hours video · worksheets · case study · templates</div>
            <div className="mt-4 text-sm text-muted-foreground">Outcomes</div>
            <ul className="mt-1 list-disc pl-5 text-sm">
              <li>3 publish‑ready outlines</li>
              <li>A monthly content mining ritual</li>
              <li>Distribution checklist</li>
            </ul>
            <div className="mt-4 text-sm text-muted-foreground">Pricing & bundle</div>
            <div className="mt-1 text-sm">Standalone + bundle with Topic Atomizer & Chat</div>
          </CardContent>
        </Card>
      </header>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Syllabus</h2>
        <Accordion type="single" collapsible className="mt-4">
          <AccordionItem value="m1">
            <AccordionTrigger>Reflection cadences that surface themes</AccordionTrigger>
            <AccordionContent>See what ideas recur and deserve attention.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m2">
            <AccordionTrigger>Exploring connected notes for inspiration</AccordionTrigger>
            <AccordionContent>Navigate backlinks to find threads.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m3">
            <AccordionTrigger>Using Chat for expansion and synthesis</AccordionTrigger>
            <AccordionContent>Draft with citations from your notes.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m4">
            <AccordionTrigger>Formalizing ideas into outlines and drafts</AccordionTrigger>
            <AccordionContent>Move from fragments to structure.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="m5">
            <AccordionTrigger>Distribution strategies & repurposing</AccordionTrigger>
            <AccordionContent>Publish across channels with minimal extra work.</AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  )
}
