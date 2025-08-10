"use client"
import ResourcesClient from "./resources-client"

export default function ResourcesClientPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-4 md:px-6 py-12">
      <header className="mb-6">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Learn by doing</h1>
        <p className="mt-2 text-muted-foreground">Tutorials, templates, and weekly ideas.</p>
      </header>
      <ResourcesClient />
    </div>
  )
}
