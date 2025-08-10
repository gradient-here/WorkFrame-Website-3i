import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "About WorkFrame — Mission and team",
  description: "Meet the team building tools and courses that connect reading, notes, and writing.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">We help curious people create</h1>
        <p className="mt-2 text-muted-foreground">
          WorkFrame started with a simple goal: make it easier to keep what you learn and turn it into work you’re proud
          of.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-[1fr_320px] items-start">
        <div>
          <h2 className="text-xl font-semibold">Story</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We built WorkFrame around a simple diagram: Read → Record → Write. It’s a loop that compounds your learning.
          </p>
        </div>
        <img
          src="/placeholder.svg?height=220&width=320"
          alt="Read → Record → Write diagram"
          className="w-full rounded-md border"
          height={220}
          width={320}
        />
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Values</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Respect attention</h3>
              <p className="mt-2 text-sm text-muted-foreground">Clarity, calm defaults, and no dark patterns.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Default to clarity</h3>
              <p className="mt-2 text-sm text-muted-foreground">Plain language and useful defaults.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Build for longevity</h3>
              <p className="mt-2 text-sm text-muted-foreground">Durable tools that age well.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Team</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Alex Rivera</h3>
              <p className="text-sm text-muted-foreground">Founder & Product</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Sam Kim</h3>
              <p className="text-sm text-muted-foreground">Design</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Taylor Chen</h3>
              <p className="text-sm text-muted-foreground">Engineering</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold">Press kit</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Logos</h3>
              <p className="text-sm text-muted-foreground">Download logo assets.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Screenshots</h3>
              <p className="text-sm text-muted-foreground">Product shots for press.</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-medium">Fact sheet</h3>
              <p className="text-sm text-muted-foreground">Quick stats and contact.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
