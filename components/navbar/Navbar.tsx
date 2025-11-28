// TOD/tod/apps-web/components/navbar/Navbar.tsx
"use client";

import Link from "next/link";
import { TodLogo } from "../TodLogo";
import { Button } from "@/components/ui/button";
//import { LanguageSwitcher } from "@/app/LanguageSwitcher";
import { MobileMenu } from "./MobileMenu";

export function Navbar() {
  return (
    <nav className="w-full border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side: Logo */}
        <Link href="/tod" className="flex items-center gap-2">
          <TodLogo />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/tod" className="text-foreground hover:text-primary">
            Home
          </Link>

          <Link href="/tod/templates" className="text-foreground hover:text-primary">
            Templates
          </Link>

          <Link href="/tod/builder" className="text-foreground hover:text-primary">
            Builder
          </Link>

          {/* EN / SV Switch */}
          {/*<LanguageSwitcher /> */}

          {/* Auth Buttons (fake for now) */}
          <Button variant="outline">Login</Button>
          <Button>Register</Button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
}
