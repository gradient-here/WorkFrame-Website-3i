import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "Account — Settings",
  description: "Profile, notifications, integrations, data export.",
}

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Settings</h1>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Profile</h3>
            <div className="mt-3 grid gap-3">
              <Input placeholder="First name" />
              <Input placeholder="Last name" />
              <Input placeholder="Email" />
              <Button className="bg-emerald-600 hover:bg-emerald-700">Save</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium">Integrations</h3>
            <p className="mt-2 text-sm text-muted-foreground">Connect Notion, Obsidian (coming soon).</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardContent className="pt-6">
            <h3 className="font-medium">Data export</h3>
            <p className="mt-2 text-sm text-muted-foreground">Export your notes anytime.</p>
            <Button variant="outline" className="mt-3 bg-transparent">
              Export
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
