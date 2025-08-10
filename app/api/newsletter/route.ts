import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email } = await req.json()
  if (!email || typeof email !== "string") {
    return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 })
  }
  // Simulate success
  await new Promise((r) => setTimeout(r, 400))
  return NextResponse.json({ ok: true })
}
