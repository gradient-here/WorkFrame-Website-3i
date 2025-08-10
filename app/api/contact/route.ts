import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const body = await req.json()
  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing fields" }, { status: 400 })
  }
  await new Promise((r) => setTimeout(r, 600))
  return NextResponse.json({ ok: true })
}
