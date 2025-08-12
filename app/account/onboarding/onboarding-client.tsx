"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

async function sendDiscordWebhook({ email, goal }: {email: string; goal: string | null}) {
  const content = `Onboarding finished!\nEmail: ${email}\nReason: ${goal}`
  const res = await fetch("/api/discord-webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
  return res.ok
}

export default function OnboardingClient() {
  const [goal, setGoal] = useState<string | null>(null)
  const [firstNote, setFirstNote] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [status, setStatus] = useState<"idle" | "success" | "error" | "loading">("idle")

  function valid() {
    return (
      // name.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
      goal
      // firstNote.trim()
    )
  }

  const handleFinish = async () => {
    setStatus("loading")
    const ok = await sendDiscordWebhook({ email, goal})
    setStatus(ok ? "success" : "error")
    setFirstNote("")
    setEmail("")
    setName("")
    setGoal(null)
  }

  return (
    <div className="mx-auto max-w-[800px] px-4 md:px-6 py-12">
      <h1 className="text-2xl font-semibold">Let’s get you set up</h1>
      <p className="mt-2 text-muted-foreground">Pick a goal, build a reading queue, save your first note.</p>

      {/* <section className="mt-6">
        <h2 className="text-lg font-medium">Your name</h2>
        <Input
          id="name"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2"
        />
      </section> */}

      <section className="mt-6">
        <h2 className="text-lg font-medium">Pick your goal</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {["Write more", "Study better", "Research a topic"].map((g) => (
            <button
              key={g}
              className={`rounded-lg border px-4 py-3 text-left text-sm hover:bg-muted ${goal === g ? "ring-2 ring-indigo-600" : ""}`}
              onClick={() => setGoal(g)}
              aria-pressed={goal === g}
            >
              {g}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-medium">Your email</h2>
        <Input
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2"
        />
      </section>

      {/* <section className="mt-6">
        <h2 className="text-lg font-medium">Your first note</h2>
        <Input
          id="note"
          placeholder="Paste a highlight or idea"
          value={firstNote}
          onChange={(e) => setFirstNote(e.target.value)}
          className="mt-2"
        />
      </section> */}

      <div className="mt-8">
        <Button variant="outline" onClick={handleFinish} disabled={!valid() || status === "loading"}>
          {status === "loading" ? "Sending..." : "Finish"}
        </Button>
        {status === "success" && (
          <div className="mt-2 text-green-600">Thank you! Your onboarding info was sent.</div>
        )}
        {status === "error" && (
          <div className="mt-2 text-red-600">Something went wrong. Please try again.</div>
        )}
      </div>
    </div>
  )
}
