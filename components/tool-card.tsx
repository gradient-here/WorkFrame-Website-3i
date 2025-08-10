import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

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
        <img
          src={imageUrl || "/placeholder.svg"}
          alt={imageAlt || `${title} screenshot`}
          className="mb-3 w-full rounded-md border object-cover"
          height={160}
          width={320}
        />
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        <Link href={href} className="inline-flex items-center text-sm font-medium text-emerald-700 hover:underline">
          Learn more <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  )
}
