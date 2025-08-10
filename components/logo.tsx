"use client"
import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps = { className: "" }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-6 w-6 rounded-sm bg-emerald-500" aria-hidden="true" />
      <span className="font-semibold tracking-tight">WorkFrame</span>
    </div>
  )
}
