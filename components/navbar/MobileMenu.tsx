"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { TodLogo } from "../TodLogo";
import { useEffect, useState } from "react";
import { getCurrentUser, clearCurrentUser } from "@/lib/auth";

export function MobileMenu() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleLogout = () => {
    clearCurrentUser();
    window.location.href = "/tod/login";
  };

  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="h-6 w-6 text-foreground" />
      </SheetTrigger>

      <SheetContent side="right" className="w-[260px] bg-background border-l border-border">
        <div className="py-4 flex flex-col gap-4">
          
          <TodLogo />

          <Link href="/tod" className="text-foreground hover:text-primary">
            Home
          </Link>

          <Link href="/tod/templates" className="text-foreground hover:text-primary">
            Templates
          </Link>

          <Link href="/tod/builder" className="text-foreground hover:text-primary">
            Builder
          </Link>

          {/* Auth Actions */}
          <div className="pt-4 flex flex-col gap-2">

            {user ? (
              <>
                <div className="text-sm text-muted-foreground">
                  Signed in as <b>{user.username}</b>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full py-2 rounded bg-destructive text-destructive-foreground"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/tod/login" className="w-full">
                  <button className="w-full py-2 rounded border border-border bg-card text-card-foreground">
                    Login
                  </button>
                </Link>

                <Link href="/tod/register" className="w-full">
                  <button className="w-full py-2 rounded bg-primary text-primary-foreground">
                    Sign Up
                  </button>
                </Link>
              </>
            )}

          </div>

        </div>
      </SheetContent>
    </Sheet>
  );
}
