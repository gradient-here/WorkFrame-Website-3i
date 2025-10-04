"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Check, Star, Users, TrendingUp, Heart, FileText, Zap, BookOpen, Link2, Target, Database, BarChart3, Home, GitBranch, RefreshCw } from "lucide-react"
import { useLandingPageAttribution } from "@/hooks/useLandingPageAttribution"

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

async function sendDiscordWebhook({ action }: {action: string}) {
  const content = `Product Engagement!\action: ${action}`
  const res = await fetch("/api/discord-webhook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  })
  return res.ok
}

// export const metadata = {
//   title: "Zettelkasten — Never lose a brilliant idea again",
//   description: "Transform scattered thoughts into connected insights. Zettelkasten helps you capture and grow your ideas over time."
// }

export default function ZettelPage() {
  const { handleBuyButtonClick } = useLandingPageAttribution();
  
  // Your Zettelkasten Stripe URL (update this to your actual URL)
  const ZETTELKASTEN_STRIPE_URL = 'https://buy.stripe.com/aFa14m87e3xhdlx3wVfrW01';
  
  // Handle checkout button clicks
  const handleCheckoutClick = () => {
    const enhancedUrl = handleBuyButtonClick('zettelkasten', ZETTELKASTEN_STRIPE_URL);
    
    console.log('🔗 Original Stripe URL:', ZETTELKASTEN_STRIPE_URL);
    console.log('✨ Enhanced with attribution:', enhancedUrl);
    
    // Open Stripe checkout
    window.open(enhancedUrl, '_blank');
  };

  return (
    <div>
      {/* Header */}
      <section className="border-b">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-14 md:py-20 grid gap-8 md:grid-cols-2 items-center">
          {/* Left: copy */}
          <div className="text-left">
            <span className="inline-block bg-[#F2F1F3] text-sm text-muted-foreground rounded-full px-3 py-1">Zettelkasten Toolbox</span>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight leading-tight">Build a durable knowledge graph in Notion</h1>
            <p className="mt-4 text-xl text-muted-foreground font-medium">
              A Notion template that turns scattered highlights into a connected knowledge graph.
            </p>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
              Stop forgetting what you read and start connecting your ideas. This template makes Notes, Topics, and Sources first-class citizens.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button 
                className="bg-indigo-600 hover:bg-indigo-700 text-lg px-8 py-4"
                onClick={(e) => {
                  e.preventDefault();
                  handleCheckoutClick();
                }}
              > 
                Get the Template
              </Button>
              <Button variant="outline" asChild>
                <div style={{cursor: "pointer"}} onClick={() => sendDiscordWebhook({action: "Zettelkasten Learn More"})}>Learn More</div>
              </Button>
            </div>
          </div>

          {/* Right: mockup */}
          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-[520px] rounded-lg overflow-hidden">
              <img
                src="/zettelkasten-hero.png"
                alt="Zettelkasten device mockup"
                className="w-full h-auto block object-cover"
                height={360}
                width={520}
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Turn reading into a connected knowledge system</h2>
          <p className="mt-3 text-muted-foreground">Every feature helps you capture cleanly, recall quickly, and see connections you'd otherwise miss.</p>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {/* Capture */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold">📝 Capture faster</h3>
              <p className="mt-2 text-sm text-muted-foreground">Input systems that work</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                <Zap className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Fast capture, fast recall</h4>
                  <p className="text-sm text-muted-foreground">“This Week’s Notes” surfaces fresh ideas when you need them.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Target className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Ready-to-use taxonomy</h4>
                  <p className="text-sm text-muted-foreground">Tag notes as Definition, Quote, Framework, or Strategy for easier filtering.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <BookOpen className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Source intelligence</h4>
                  <p className="text-sm text-muted-foreground">Track books, podcasts, newsletters with clean citations and URLs.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connect */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold">🔗 See connections</h3>
              <p className="mt-2 text-sm text-muted-foreground">Ideas that talk to each other</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                <Database className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Three-core-database system</h4>
                  <p className="text-sm text-muted-foreground">Notes, Topics, and Sources auto-link for context-rich knowledge.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <GitBranch className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Bi-directional relationships</h4>
                  <p className="text-sm text-muted-foreground">Ideas flow naturally between Notes ↔ Topics and Notes ↔ Sources.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <FileText className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Idea pipeline</h4>
                  <p className="text-sm text-muted-foreground">Turn raw highlights into “Topic Ideas” that evolve into insights.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Curate */}
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-xl font-semibold">✨ Curate smarter</h3>
              <p className="mt-2 text-sm text-muted-foreground">Build knowledge that compounds</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-3">
                <Target className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Topics gallery</h4>
                  <p className="text-sm text-muted-foreground">Refine big-picture concepts and themes over time.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <BarChart3 className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Knowledge analytics</h4>
                  <p className="text-sm text-muted-foreground">See where your research is deepest with rollups per Topic and Source.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Home className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Clean home hub</h4>
                  <p className="text-sm text-muted-foreground">Simple dashboard keeps everything one click away.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Why I built this</h2>
            <p className="mt-3 text-muted-foreground">From scattered notes to connected insights</p>
          </div>
          
          <Card className="mt-10 border-0 shadow-lg">
            <CardContent className="p-8">
              <blockquote className="text-lg leading-8 text-muted-foreground italic">
                "I created this template for myself to make reading and note-taking more durable. By tagging quotes and ideas as I read books or encounter content online, I've been able to build an incredibly valuable resource of connected thoughts and sources. Following the simple input process, I can now put ideas into conversation with one another in ways that I never could when everything was scattered."
              </blockquote>
              <footer className="mt-6">
                <div className="text-sm font-medium text-foreground">— Founder, WorkFrame</div>
              </footer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Early Feedback Section */}
      <section className="mx-auto max-w-[1200px] px-4 md:px-6 py-20">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Trusted by early users</h2>
        </div>
        
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <Card className="border-l-4 border-l-indigo-600">
            <CardContent className="p-6">
              <blockquote className="text-muted-foreground">
                "This helped me organize my PhD reading in ways I never could before."
              </blockquote>
              <footer className="mt-4 text-sm font-medium">
                — Columbia PhD Student
              </footer>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-indigo-600">
            <CardContent className="p-6">
              <blockquote className="text-muted-foreground">
                "Finally took my book club notes seriously after years of relying on Apple Notes."
              </blockquote>
              <footer className="mt-4 text-sm font-medium">
                — Real Estate Agent, North Carolina
              </footer>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Works with existing tools */}
      <section className="bg-muted/20 py-20">
        <div className="mx-auto max-w-[1200px] px-4 md:px-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Works with your existing tools</h2>
            <p className="mt-3 text-muted-foreground">Import and export seamlessly across your favorite apps</p>
          </div>
          
          <div className="mt-10 flex justify-center items-center gap-8 flex-wrap">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Notion
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Readwise
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Obsidian
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Logseq
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Roam
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Kindle
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Apple Notes
            </div>
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <FileText className="h-5 w-5" />
              Evernote
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-700 py-20">
        <div className="mx-auto max-w-[800px] px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Stop losing ideas. Build a durable knowledge system today.</h2>
          <p className="mt-4 text-lg text-indigo-100">
            Transform scattered highlights and thoughts into connected insights you can build on for years.
          </p>
          <div className="mt-8">
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-50 font-semibold px-8"
              onClick={(e) => {
                e.preventDefault();
                handleCheckoutClick();
              }}
            >
              Get the Template
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
