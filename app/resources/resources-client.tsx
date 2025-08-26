"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { NewsletterForm } from "@/components/newsletter-form"

async function sendDiscordWebhook({ action }: {action: string}) {
  const content = `Community Engagement!\action: ${action}`
  const res = await fetch("/api/discord-webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
  return res.ok
}

export default function ResourcesClient() {
  return (
    <>
      <Tabs defaultValue="blog" className="w-full">
        <TabsList>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="downloads" id="downloads">
            Free Downloads
          </TabsTrigger>
          <TabsTrigger value="videos" id="videos">
            Video Demos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "Reading with purpose" })}  className="pt-6">
                <h3 className="font-medium">Reading with purpose</h3>
                <p className="mt-2 text-sm text-muted-foreground">Pick books that support your work.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "Atomic notes 101" })} className="pt-6">
                <h3 className="font-medium">Atomic notes 101</h3>
                <p className="mt-2 text-sm text-muted-foreground">Write notes you’ll reuse.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "From notes to draft" })} className="pt-6">
                <h3 className="font-medium">From notes to draft</h3>
                <p className="mt-2 text-sm text-muted-foreground">Structure fast with synthesis.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="downloads" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "Reading habit PDF" })} className="pt-6">
                <h3 className="font-medium">Reading habit PDF</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "Zettelkasten template" })} className="pt-6">
                <h3 className="font-medium">Zettelkasten template</h3>
              </CardContent>
            </Card>
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "Distribution checklist" })} className="pt-6">
                <h3 className="font-medium">Distribution checklist</h3>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardContent onClick={() => {
                sendDiscordWebhook({ action: "Quickread demo" });
                window.location.href = "/products/quickread";
              }} className="pt-6">
                <h3 className="font-medium">Quickread demo</h3>
                <p className="mt-2 text-sm text-muted-foreground">2‑minute pick‑the‑book tour.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "Atomizer walkthrough" })} className="pt-6">
                <h3 className="font-medium">Atomizer walkthrough</h3>
                <p className="mt-2 text-sm text-muted-foreground">Map a topic in minutes.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent onClick={() => sendDiscordWebhook({ action: "Full workflow" })} className="pt-6">
                <h3 className="font-medium">Full workflow</h3>
                <p className="mt-2 text-sm text-muted-foreground">Read → Record → Write in action.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <section className="mt-12 rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Get one practical idea every week</h2>
        <p className="mt-2 text-sm text-muted-foreground">Join the newsletter.</p>
        <div className="mt-4">
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
