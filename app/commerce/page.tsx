import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "WorkFrame Commerce — Books, notebooks, and merch",
  description: "Shop curated books and custom stationery made for atomic notes and Zettelkasten workflows.",
}

export default function CommercePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Tools you can touch</h1>
        <p className="mt-2 text-muted-foreground">Creator‑friendly goods that support your practice.</p>
      </header>

      <div className="grid gap-6 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Affiliate book hub</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Staff picks with honest notes; links support the project.
            </p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Shop now</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Custom products</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Notebooks, pencils, notepads designed for atomic notes.
            </p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Shop now</Button>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Merch</h3>
            <p className="mt-2 text-sm text-muted-foreground">Hoodies and simple apparel.</p>
            <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Shop now</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
