import { cn } from "@/lib/utils"

type PrimaryChipProps = {
  className?: string
  size?: "sm" | "md"
}

/**
 * Three-primary color accent mark used in corners or near product shots.
 * Matches the moodboard: red, yellow, blue chips.
 */
export function PrimaryChip({ className, size = "md" }: PrimaryChipProps) {
  const h = size === "sm" ? "h-2" : "h-2.5"
  const w = size === "sm" ? "w-3" : "w-3.5"
  const gap = size === "sm" ? "gap-1" : "gap-1.5"
  return (
    <div className={cn("inline-flex items-center", gap, className)}>
      <span className={cn("rounded-sm bg-red-600", h, w)} aria-hidden="true" />
      <span className={cn("rounded-sm bg-yellow-400", h, w)} aria-hidden="true" />
      <span className={cn("rounded-sm bg-blue-600", h, w)} aria-hidden="true" />
      <span className="sr-only">Primary color accent</span>
    </div>
  )
}
