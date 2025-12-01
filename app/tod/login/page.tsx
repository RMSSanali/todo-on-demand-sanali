"use client";

import * as React from "react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCurrentUser } from "@/lib/auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    if (!username.trim()) return;

    // Save user
    setCurrentUser({ username });

    // Redirect
    window.location.href = "/tod/builder";
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
          <p className="text-sm text-muted-foreground">
            Login to access your templates and checklists
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don’t have an account?{" "}
          <Link href="/tod/register" className="underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
