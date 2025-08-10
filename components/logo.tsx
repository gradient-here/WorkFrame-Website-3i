"use client"
import { cn } from "@/lib/utils"
import { PrimaryChip } from "./primary-chip"

type LogoProps = {
  className?: string
}

export function Logo({ className }: LogoProps = { className: "" }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative h-6 w-6 rounded-sm bg-black" aria-hidden="true">
        <PrimaryChip size="sm" className="absolute -bottom-1 -right-1" />
      </div>
      <span className="font-semibold tracking-tight">WorkFrame</span>
    </div>
  )
}
