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
        <h3 className="mb-3 text-xl font-semibold tracking-tight">{copy}</h3>
        <Button asChild>
          <Link href={href}>{buttonText}</Link>
        </Button>
      </div>
    </section>
  )
}
