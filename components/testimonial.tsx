import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type TestimonialProps = {
  quote: string
  name: string
  role: string
}
export function Testimonial({
  quote = "Short quote about results.",
  name = "Alex",
  role = "Writer",
}: TestimonialProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()
  return (
    <figure className="rounded-lg border p-6 h-full">
      <blockquote className="text-sm leading-relaxed">
        {"“"}
        {quote}
        {"”"}
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div>
          <div className="text-sm font-medium">{name}</div>
          <div className="text-xs text-muted-foreground">{role}</div>
        </div>
      </figcaption>
    </figure>
  )
}
