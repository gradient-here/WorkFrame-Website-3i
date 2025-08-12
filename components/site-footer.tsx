import Link from "next/link"
import { NewsletterForm } from "./newsletter-form"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h4 className="text-sm font-semibold mb-3">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-3">Get one practical idea each week.</p>
            <NewsletterForm />
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Products</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="http://tangram.tools/quickread">
                  Quickread
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="http://tangram.tools/z">
                  Zettelkasten
                </Link>
              </li>
              {/* <li>
                <Link className="hover:underline" href="/products/chat-on-a-page">
                  Chat on a Page
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/products/chat">
                  Chat
                </Link>
              </li> */}
              <li>
                <Link className="hover:underline" href="/">
                  Courses
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/">
                  Commerce
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/">
                  About
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Careers (future)</span>
              </li>
              <li>
                <Link className="hover:underline" href="/">
                  Press Kit
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:underline" href="/resources">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/resources#downloads">
                  Free Downloads
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/resources#videos">
                  Video Demos
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground">Docs (future)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} WorkFrame. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-sm md:justify-end">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/cookies" className="hover:underline">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
