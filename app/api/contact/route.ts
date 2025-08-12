import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
  }
  const res = await fetch("/api/discord-webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: `Contact from ${body.name} <${body.email}>: ${body.message}` }),
  })
  if (!res.ok) {
    return NextResponse.json({ ok: false, error: "Failed to send to Discord" }, { status: res.status })
  }
  
  return NextResponse.json({ ok: true })
}

