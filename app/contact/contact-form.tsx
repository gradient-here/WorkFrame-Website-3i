"use client"

import { useState, type FormEvent } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [reason, setReason] = useState("Partnership")
  const [message, setMessage] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  function valid() {
    if (!name.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !message.trim()) return false
    return true
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    if (!valid()) {
      setError("Please complete all fields with a valid email.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, reason, message }),
      })
      if (!res.ok) throw new Error("Failed")
      setName("")
      setEmail("")
      setMessage("")
      setSuccess("Thanks — we’ll get back within 2 business days.")
    } catch {
      setError("Something went sideways. Try again or contact support.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} className="grid gap-4">
      <div>
        <label htmlFor="name" className="sr-only">
          Name
        </label>
        <Input id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <Input id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className="sr-only" htmlFor="reason">
          Reason
        </label>
        <Select value={reason} onValueChange={setReason}>
          <SelectTrigger id="reason">
            <SelectValue placeholder="Reason" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Partnership">Partnership</SelectItem>
            <SelectItem value="Press">Press</SelectItem>
            <SelectItem value="Support">Support</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <label htmlFor="message" className="sr-only">
          Message
        </label>
        <Textarea id="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      {success && <p className="text-sm text-emerald-700">{success}</p>}
      <div>
        <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
          {loading ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  )
}
