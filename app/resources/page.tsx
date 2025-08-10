import type { Metadata } from "next"
import ResourcesClientPage from "./resources-client-page"

export const metadata: Metadata = {
  title: "WorkFrame Resources — Blog, templates, and demos",
  description: "Tutorials and templates to help you read smarter and create faster.",
}

export default function ResourcesPage() {
  return <ResourcesClientPage />
}
