"use client"

import { type FormEvent, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  function isValidEmail(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!isValidEmail(email)) {
      setError("Please enter a valid email.")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        throw new Error("Failed")
      }
      setEmail("")
      toast({ title: "Subscribed", description: "Thanks — you’ll get one idea each week." })
    } catch {
      setError("Something went sideways. Try again or contact support.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md items-start gap-2">
      <div className="flex-1">
        <label htmlFor="newsletter-email" className="sr-only">
          Email
        </label>
        <Input
          id="newsletter-email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? "newsletter-error" : undefined}
        />
        {error && (
          <p id="newsletter-error" className="mt-1 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700" disabled={loading}>
        {loading ? "Subscribing…" : "Subscribe"}
      </Button>
    </form>
  )
}
