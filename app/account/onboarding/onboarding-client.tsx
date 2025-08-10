"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function OnboardingClient() {
  const [goal, setGoal] = useState<string | null>(null)
  const [firstNote, setFirstNote] = useState("")

  return (
    <div className="mx-auto max-w-[800px] px-4 md:px-6 py-12">
      <h1 className="text-2xl font-semibold">Let’s get you set up</h1>
      <p className="mt-2 text-muted-foreground">Pick a goal, build a reading queue, save your first note.</p>

      <section className="mt-6">
        <h2 className="text-lg font-medium">Pick your goal</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {["Write more", "Study better", "Research a topic"].map((g) => (
            <button
              key={g}
              className={`rounded-lg border px-4 py-3 text-left text-sm hover:bg-muted ${goal === g ? "ring-2 ring-emerald-600" : ""}`}
              onClick={() => setGoal(g)}
              aria-pressed={goal === g}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Build a reading queue (Quickread)</h2>
        <p className="mt-1 text-sm text-muted-foreground">Use Quickread to get a shortlist aligned to your goal.</p>
        <Button asChild className="mt-3 bg-emerald-600 hover:bg-emerald-700">
          <Link href="/products/quickread">Open Quickread</Link>
        </Button>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium">Save your first note</h2>
        <Card className="mt-2">
          <CardContent className="pt-6">
            <label htmlFor="note" className="sr-only">
              Note
            </label>
            <Input
              id="note"
              placeholder="Paste a highlight or idea"
              value={firstNote}
              onChange={(e) => setFirstNote(e.target.value)}
            />
            <div className="mt-3 flex gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save to Z</Button>
              <Button variant="outline">Link success: “Linked to 3 notes.”</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="mt-8">
        <Button asChild variant="outline">
          <Link href="/account">Finish</Link>
        </Button>
      </div>
    </div>
  )
}
