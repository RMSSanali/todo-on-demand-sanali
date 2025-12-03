// TOD/tod/apps-web/components/navbar/Navbar.tsx
"use client";

import Link from "next/link";
import { TodLogo } from "../TodLogo";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { useEffect, useState } from "react";
import { getCurrentUser, clearCurrentUser } from "@/lib/auth";

export function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    window.location.href = "/tod/login";
  };

  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/tod" className="flex items-center gap-2 cursor-pointer">
          <TodLogo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-foreground hover:text-primary">
            Home
          </Link>

          <Link href="/tod/templates" className="text-foreground hover:text-primary">
            Templates
          </Link>

          <Link href="/tod/builder" className="text-foreground hover:text-primary">
            Builder
          </Link>

          {/* Auth actions */}
          {user ? (
            <>
              <span className="text-sm text-muted-foreground">
                👤 {user.username}
              </span>
              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/tod/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/tod/register">
                <Button>Register</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
