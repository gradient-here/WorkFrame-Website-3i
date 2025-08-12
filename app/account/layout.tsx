import type React from "react"
export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[800px] px-4 md:px-6 py-12">
      {/* <nav className="flex flex-wrap items-center gap-4 text-sm">
        <a href="/account" className="hover:underline">
          Dashboard
        </a>
        <a href="/account/notes" className="hover:underline">
          Notes
        </a>
        <a href="/account/billing" className="hover:underline">
          Billing & Plans
        </a>
        <a href="/account/settings" className="hover:underline">
          Settings
        </a>
        <a href="/account/onboarding" className="hover:underline">
          Onboarding
        </a>
      </nav> */}
      {children}
    </div>
  )
}
