
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export const metadata = {
  title: "Zettelkasten — Build Your Personal Knowledge Graph",
  description: "Capture, connect, and grow your ideas with Zettelkasten by WorkFrame."
}

export default function ZettelPage() {
  return (
    <div>
      {/* Header */}
      <section className="border-b">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-14 md:py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Build Your Personal Knowledge Graph</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Too many scattered notes? Zettelkasten by WorkFrame helps knowledge workers, researchers, and lifelong learners capture ideas as they happen — and connect them into a network of insight you can build on forever.
          </p>
          <div className="mt-8 flex justify-center">
            <Button asChild className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4">
              <Link href="/account/onboarding">Get Zettelkasten</Link>
            </Button>
          </div>
          <div className="mt-10 flex justify-center">
            {/* Device mockup image placeholder */}
            <img
              src="/placeholder.svg?height=360&width=520"
              alt="Zettelkasten device mockup"
              className="w-full max-w-md rounded-lg border shadow"
              height={360}
              width={520}
            />
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <h2 className="text-2xl font-bold">How it works</h2>
        <div className="mt-6">
          <Tabs defaultValue="notes">
            <TabsList>
              <TabsTrigger value="notes">Notes</TabsTrigger>
              <TabsTrigger value="topics">Topics</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
            </TabsList>
            <TabsContent value="notes">
              <div className="lg:flex lg:items-center lg:justify-between lg:space-x-6 px-6 py-4 rounded-lg border">
                <div className="lg:w-1/2">
                  <h3 className="font-semibold text-lg">Standardize your notes</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Save notes to your Zettelkasten tagging them to build your knowledge graph.
                  </p>
                </div>
                <div className="lg:w-1/2">
                  <img
                    src="/placeholder.svg?height=160&width=320"
                    alt="Note capture visual callout"
                    className="w-full rounded-lg border"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="topics">
              <div className="p-6 rounded-lg border">
                <h3 className="font-semibold">Organize your ideas around topics</h3>
                <p className="mt-2 text-sm">Create custom topics to group related ideas. <span className='text-muted-foreground block'>So you can see connections others miss.</span></p>
              </div>
            </TabsContent>
            <TabsContent value="sources">
              <div className="p-6 rounded-lg border">
                <h3 className="font-semibold">Track your sources</h3>
                <p className="mt-2 text-sm">Save notes with references to sources like articles, books, and podcasts. <span className='text-muted-foreground block'>So you can credit the original ideas.</span></p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Why Zettelkasten? */}
      {/* <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <div className="flex flex-col items-center mt-8 bg-[#F2F1F3] rounded-t-lg p-6">
          <div className="mt-0 rounded-lg p-0 max-w-100">      
            <img src="/placeholder.svg?height=180&width=320" alt="Knowledge graph visual callout" className="w-full rounded-xl" />
          </div>
        </div>
        <div className="mt-0 rounded-b-lg border p-6">
          <p className="text-2xl font-bold">Why Zettelkasten?</p>
          <p className="mt-3 text-md text-muted-foreground">Your mind is full of ideas — but traditional notes bury them in folders you’ll never open again. Zettelkasten helps you surface, link, and grow your thinking over time.</p>
          <ul className="mt-2 list-disc space-y-2 pl-6 text-left">
            <li className="pl-0">Capture fleeting thoughts before they vanish</li>
            <li className="pl-0">Connect notes with related concepts, people, and topics</li>
            <li className="pl-0">Discover new insights from patterns across your ideas</li>
            <li className="pl-0">Build a searchable knowledge graph you’ll actually use</li>
          </ul>
          <p className="mt-12 text-lg italic text-center">Stop losing ideas to chaos. With Zettelkasten, your notes become knowledge.</p>
        </div>
      </section> */}

      {/* Features */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <div className="flex flex-col items-center mt-8 bg-[#F2F1F3] rounded-t-lg p-6">
          <div className="mt-0 rounded-lg p-0 max-w-100">      
            <img src="/placeholder.svg?height=120&width=120" alt="Feature visual 1" className="w-full rounded-xl" />
          </div>
        </div>
        <div className="mt-0 rounded-b-lg border p-6">
          <p className="text-2xl font-bold">Features</p>
          <ul className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4 text-sm">
            <li className="flex items-start gap-2 md:flex-col md:items-center">
              <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Linked, contextual notes
            </li>
            <li className="flex items-start gap-2 md:flex-col md:items-center">
              <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Instant capture & tagging
            </li>
            <li className="flex items-start gap-2 md:flex-col md:items-center">
              <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Searchable knowledge graph
            </li>
            <li className="flex items-start gap-2 md:flex-col md:items-center">
              <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> Works across devices & platforms
            </li>
            {/* <li className="flex items-start gap-2 md:flex-col md:items-center">
              <Check className="mt-0.5 h-4 w-4 text-indigo-600" /> One-time purchase (no subscription)
            </li> */}
          </ul>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
        <div className="flex flex-col items-center mt-8 bg-[#F2F1F3] rounded-t-lg p-6">
          <div className="mt-0 rounded-lg p-0 max-w-100">      
            <img src="/one_time_purchase.png" alt="Zettelkasten Icon" className="w-full rounded-xl" />
          </div>
        </div>
        <div className="mt-0 rounded-b-lg border p-6">
          <h3 className="font-semibold">Pricing</h3>
          <p className="text-2xl font-bold">Get Zettelkasten Today</p>
          <p className="mt-2 text-sm text-muted-foreground">
            One-time purchase, no subscription required.
          </p>
          <p className="mt-4 text-lg font-semibold">For the price of a notebook, build a second brain you’ll never lose</p>
          <div className="mt-4 flex items-center justify-between">
            <Button asChild variant="outline">
              <Link href="/account/onboarding">Buy Zettelkasten</Link>
            </Button>
            <p className="text-2xl font-bold">$59.00</p>
          </div>
        </div>
      </section>
    </div>
  )
}
