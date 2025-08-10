import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

type CourseCardProps = {
  title: string
  blurb: string
  href: string
}

export function CourseCard({ title = "Course Title", blurb = "Short blurb", href = "/" }: CourseCardProps) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-3">{blurb}</p>
        <Link href={href} className="inline-flex items-center text-sm font-medium text-emerald-700 hover:underline">
          See syllabus <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  )
}
