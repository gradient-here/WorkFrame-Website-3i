import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export const metadata = {
  title: "WorkFrame Courses — Reading, notes, and content",
  description: "Hands‑on courses that pair with WorkFrame tools to create a durable creative practice.",
}

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Learn the system, not just the tools</h1>
        <p className="mt-2 text-muted-foreground">
          Practical courses to build habits, capture ideas, and publish more.
        </p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">How to Read More & Remember What You’ve Read</h3>
            <p className="mt-2 text-sm text-muted-foreground">Habits, capture, and recall.</p>
            <div className="mt-3 space-x-4">
              <Link href="/courses/read-more-remember" className="text-indigo-700 hover:underline">
                See syllabus
              </Link>
              <Link href="/account/onboarding" className="hover:underline">
                Enroll now
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Mining Your Second Brain for Content</h3>
            <p className="mt-2 text-sm text-muted-foreground">Turn notes into a content engine.</p>
            <div className="mt-3 space-x-4">
              <Link href="/courses/mining-second-brain" className="text-indigo-700 hover:underline">
                See syllabus
              </Link>
              <Link href="/account/onboarding" className="hover:underline">
                Enroll now
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="mt-8 rounded-lg border p-6">
        <h3 className="font-semibold">Learning paths & bundles</h3>
        <p className="mt-2 text-sm text-muted-foreground">Save with tool + course combos.</p>
      </section>
    </div>
  )
}
