import type { Metadata } from "next"
import OnboardingClientPage from "./onboarding-client-page"

export const metadata: Metadata = {
  title: "Onboarding — WorkFrame",
  description: "Get started with WorkFrame.",
}

export default function OnboardingPage() {
  return <OnboardingClientPage />
}
