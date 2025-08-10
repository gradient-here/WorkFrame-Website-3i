"use client"

import Link from "next/link"
import { useState } from "react"
import { Logo } from "./logo"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Menu, Search, ChevronDown } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [query, setQuery] = useState("")

  const NavLinks = () => (
    <nav className="hidden items-center gap-6 md:flex">
      <Link href="/" className="text-sm hover:underline underline-offset-4">
        Home
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="text-sm inline-flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground rounded-sm px-1">
          Products <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="min-w-[240px]">
          <DropdownMenuItem asChild>
            <Link href="/products" className="w-full">
              All Products
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/products/quickread" className="w-full">
              Quickread
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/products/topic-atomizer" className="w-full">
              Topic Atomizer
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/products/chat-on-a-page" className="w-full">
              Chat on a Page
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/products/chat" className="w-full">
              Chat (Synthesis)
            </Link>
          </DropdownMenuItem>
          <div className="px-2 pt-2">
            <div className="px-2 pb-1 text-xs text-muted-foreground">Courses</div>
            <DropdownMenuItem asChild>
              <Link href="/courses" className="w-full">
                All Courses
              </Link>
            </DropdownMenuItem>
          </div>
          <div className="px-2 pt-2">
            <div className="px-2 pb-1 text-xs text-muted-foreground">Commerce</div>
            <DropdownMenuItem asChild>
              <Link href="/commerce" className="w-full">
                Shop
              </Link>
            </DropdownMenuItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Link href="/how-it-works" className="text-sm hover:underline underline-offset-4">
        How It Works
      </Link>
      <Link href="/resources" className="text-sm hover:underline underline-offset-4">
        Resources
      </Link>
      <Link href="/community" className="text-sm hover:underline underline-offset-4">
        Community
      </Link>
      <Link href="/about" className="text-sm hover:underline underline-offset-4">
        About
      </Link>
      <Link href="/contact" className="text-sm hover:underline underline-offset-4">
        Contact
      </Link>
    </nav>
  )

  const Actions = () => (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Search WorkFrame</DialogTitle>
          </DialogHeader>
          <div>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, tools, courses"
              aria-label="Search query"
            />
            <p className="mt-2 text-xs text-muted-foreground">{'Tip: Try "Quickread" or "How it works"'}</p>
          </div>
        </DialogContent>
      </Dialog>
      <Button asChild>
        <Link href="/account/onboarding">Start free</Link>
      </Button>
      <Button asChild variant="outline">
        <Link href="/account">Sign in</Link>
      </Button>
    </div>
  )

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>
        <NavLinks />
        <div className="hidden md:block">
          <Actions />
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px]">
              <div className="mt-4 flex flex-col gap-4">
                <NavLinks />
                <Actions />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
