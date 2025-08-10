import Image from "next/image"
import { PrimaryChip } from "@/components/primary-chip"
import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Aesthetic Guide — WorkFrame",
  description: "Black & white base with primary accents, directional lighting, and sharp focus.",
}

export default function StyleGuidePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-6">
      <h1 className="text-3xl font-semibold tracking-tight">Aesthetic Guide</h1>
      <p className="mt-2 text-muted-foreground">
        Black/white foundation. Minimalist composition. Products in sharp focus. Primaries used as small accents.
      </p>

      <section className="mt-8 grid gap-6 md:grid-cols-[1fr_360px]">
        <Card>
          <CardContent className="pt-6">
            <div className="relative">
              <Image
                src="/images/aesthetic-moodboard.png"
                alt="Moodboard: black & white with primary chips, directional light, product shots"
                width={1200}
                height={768}
                className="w-full rounded-md border"
                priority
              />
              <PrimaryChip className="absolute bottom-3 right-3" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-sm">
            <div>
              <div className="font-medium">Principles</div>
              <ul className="mt-2 list-disc pl-5 text-muted-foreground">
                <li>Black/white base</li>
                <li>Primary accents: red, yellow, blue</li>
                <li>Minimalist, product‑first</li>
                <li>Directional lighting, sharp focus</li>
              </ul>
            </div>
            <div className="mt-6">
              <div className="font-medium">Accent</div>
              <PrimaryChip className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
