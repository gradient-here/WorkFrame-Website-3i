import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import { PrimaryChip } from "./primary-chip"

type ToolCardProps = {
  title: string
  description: string
  href: string
  imageAlt?: string
  imageUrl?: string
}

export function ToolCard({
  title = "Tool",
  description = "Short description",
  href = "/",
  imageAlt = "",
  imageUrl = "/placeholder.svg?height=160&width=320",
}: ToolCardProps) {
  return (
    <Card className="h-full transition hover:shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <img
            src={imageUrl || "/placeholder.svg"}
            alt={imageAlt || `${title} screenshot`}
            className="mb-3 w-full rounded-md border object-cover grayscale contrast-125"
            height={160}
            width={320}
          />
          {/* <PrimaryChip className="absolute bottom-2 right-2" size="sm" /> */}
        </div>
        <p className="mb-3 text-sm text-muted-foreground">{description}</p>
        <Link href={href} className="inline-flex items-center text-sm font-medium underline">
          Learn more <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  )
}
