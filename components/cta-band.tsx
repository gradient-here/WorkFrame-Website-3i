import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CtaBand({
  copy = "Ready to build a system you’ll actually use?",
  buttonText = "Start free",
  href = "/account/onboarding",
} = {}) {
  return (
    <section className="my-16">
      <div className="mx-auto max-w-[1200px] rounded-lg border bg-muted/40 px-6 py-10 text-center">
        <h3 className="text-xl font-semibold tracking-tight mb-3">{copy}</h3>
        <Button asChild className="bg-emerald-600 hover:bg-emerald-700">
          <Link href={href}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}
