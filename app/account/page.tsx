"use client"

import { useState } from "react"
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

// export const metadata = {
//   title: "Account — Dashboard",
//   description: "Your WorkFrame dashboard",
// }



export default function DashboardPage() {

  const { user, loading, error, signIn, logOut } = useFirebaseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    signIn(email, password);
  };

  return (
    <div>
      <header className="mb-4">
        <h1 className="text-2xl font-semibold">Account</h1>
      </header>

      {user ? (
        <div className="space-y-4">
          <p className="text-green-700">Logged in as: <span className="font-bold">{user.email}</span></p>
          <Button variant="outline" onClick={logOut} disabled={loading}>
            Log out
          </Button>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <h2 className="text-lg font-medium">Email</h2>
            <Input
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2"
              type="email"
              autoComplete="email"
              required
            />
          </div>
          <div>
            <h2 className="text-lg font-medium">Password</h2>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2"
              autoComplete="current-password"
              required
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <Button variant="outline" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      )}
    </div>
  )
}
