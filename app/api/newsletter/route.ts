import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 })
  }
  // const res = await fetch("/api/newsletter", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ email }),
  // })
  // if (!res.ok) {
  //   throw new Error("Failed")
  // }
  // // Simulate success
  // // await new Promise((r) => setTimeout(r, 400))
  // return NextResponse.json({ ok: true })
    // const { content } = await req.json()

    const webhookUrl = process.env.NEXT_PUBLIC_DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      return NextResponse.json({ error: "Webhook URL not configured" }, { status: 500 })
    }

    try {
      const discordRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "content": `Newsletter!\nEmail: ${email}` }),
      })

      if (!discordRes.ok) {
        return NextResponse.json({ error: "Failed to send to Discord" }, { status: discordRes.status })
      }

      return NextResponse.json({ success: true })
    } catch (err) {
      return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
    }
}
