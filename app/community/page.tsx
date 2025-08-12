"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

// export const metadata = {
//   title: "WorkFrame Community — Challenges and workshops",
//   description: "Join creators and researchers building better reading and writing habits together.",
// }

async function sendDiscordWebhook({ action }: {action: string}) {
  const content = `Community Engagement!\action: ${action}`
  const res = await fetch("/api/discord-webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
  return res.ok
}

export default function CommunityPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Don’t build alone</h1>
        <p className="mt-2 text-muted-foreground">Challenges, workshops, and betas to keep momentum.</p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">7‑Day Reading & Recording Challenge</h3>
            <p className="mt-2 text-sm text-muted-foreground">Daily prompts; share progress; certificate.</p>
            <Button onClick={() => sendDiscordWebhook({ action: "Reading Challenge" })} className="mt-4 bg-indigo-600 hover:bg-indigo-700">Join the challenge</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Live Workshops</h3>
            <p className="mt-2 text-sm text-muted-foreground">Monthly, 60 minutes; Q&A and live demos.</p>
            <Button onClick={() => sendDiscordWebhook({ action: "Workshop" })} variant="outline" className="mt-4 bg-transparent">
              Reserve a seat
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Beta Program</h3>
            <p className="mt-2 text-sm text-muted-foreground">Early access to new tools in exchange for feedback.</p>
            <Button onClick={() => sendDiscordWebhook({ action: "Beta Program" })} variant="outline" className="mt-4 bg-transparent">
              Apply to beta
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
