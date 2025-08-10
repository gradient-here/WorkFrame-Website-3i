import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Account — Billing & Plans",
  description: "Manage your plan and invoices.",
}

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Billing & Plans</h1>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Current plan</h3>
            <p className="mt-1 text-sm text-muted-foreground">Trial — 14 days remaining</p>
            <div className="mt-4 flex gap-3">
              <Button className="bg-emerald-600 hover:bg-emerald-700">Change plan</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Invoices</h3>
            <p className="mt-1 text-sm text-muted-foreground">No invoices yet.</p>
            <Button variant="outline" className="mt-4 bg-transparent">
              Download latest
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
