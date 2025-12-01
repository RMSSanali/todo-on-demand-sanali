"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

type ProtectedLockScreenProps = {
  title?: string;
  description?: string;
  ctaLabel?: string;
  redirectTo?: string;
};

export function ProtectedLockScreen({
  title = "Templates are protected",
  description = "Log in to unlock premade checklists and your personal setup.",
  ctaLabel = "Go to Login",
  redirectTo = "/tod/login",
}: ProtectedLockScreenProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Card className="w-full max-w-md border-dashed">
        <CardHeader className="flex items-center gap-2 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted">
            <Lock className="h-6 w-6" />
          </div>
          <CardTitle className="mt-2 text-xl font-semibold">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-3">
          <Link href={redirectTo}>
            <Button className="w-full">🔐 {ctaLabel}</Button>
          </Link>
          <p className="text-xs text-muted-foreground">
            Tip: Use the login demo to show how templates become available after signing in.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
