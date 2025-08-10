import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Account — Dashboard",
  description: "Your WorkFrame dashboard",
}

export default function DashboardPage() {
  const firstName = "Alex"
  return (
    <div>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Welcome back, {firstName}</h1>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h3 className="font-medium">Your queue</h3>
            <p className="mt-2 text-sm text-muted-foreground">No books yet. Use Quickread to build your queue.</p>
            <Button asChild size="sm" className="mt-3 bg-emerald-600 hover:bg-emerald-700">
              <Link href="/products/quickread">Try Quickread</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h3 className="font-medium">Recent notes</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              No notes yet. Save your first highlight from Chat on a Page.
            </p>
            <Button asChild size="sm" variant="outline" className="mt-3 bg-transparent">
              <Link href="/products/chat-on-a-page">Open Chat on a Page</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <h3 className="font-medium">Start a new…</h3>
            <div className="mt-3 grid gap-2">
              <Link href="/products/quickread" className="text-sm text-emerald-700 hover:underline">
                Quickread
              </Link>
              <Link href="/products/topic-atomizer" className="text-sm text-emerald-700 hover:underline">
                Atomize topic
              </Link>
              <Link href="/products/chat-on-a-page" className="text-sm text-emerald-700 hover:underline">
                Chat on a Page
              </Link>
              <Link href="/products/chat" className="text-sm text-emerald-700 hover:underline">
                Synthesize
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <h3 className="font-medium">Courses</h3>
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          <Badge variant="secondary">Read More & Remember — 0%</Badge>
          <Badge variant="secondary">Mining Your Second Brain — 0%</Badge>
        </div>
      </div>
    </div>
  )
}
