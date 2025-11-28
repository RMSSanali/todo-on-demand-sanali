// TOD/tod/apps-web/app/tod/page.tsx
import Link from "next/link";
import { TodLogo } from "@/components/TodLogo";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function TodHomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col gap-10">
        {/* Hero section */}
        <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="uppercase tracking-wide">T.O.D · Todo on Demand</span>
            </div>

            <div className="flex items-center gap-3">
              <TodLogo />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Build your perfect to-do system.
            </h1>

            <p className="text-base md:text-lg text-card-foreground/70">
              Start fast with a ready-made template or design your own workflow
              with categories, priorities, reminders and more — all powered by
              the same secure backend.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/tod/templates">Browse templates</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/tod/builder">Open builder</Link>
              </Button>
            </div>
          </div>

          {/* Simple preview block */}
          <div className="hidden md:block flex-1">
            <div className="rounded-2xl border border-border bg-card/60 backdrop-blur p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wide text-card-foreground/70">
                  Today&apos;s Focus
                </span>
                <span className="text-xs text-card-foreground/50">
                  Minimalist view
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 rounded-lg bg-background/80 border border-border px-3 py-2">
                  <span className="h-3 w-3 rounded-full bg-primary" />
                  <span className="line-clamp-1">
                    Finish TOD landing page
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-background/40 border border-dashed border-border/70 px-3 py-2">
                  <span className="h-3 w-3 rounded-full bg-primary/40" />
                  <span className="line-clamp-1 text-card-foreground/70">
                    Connect template to real todos
                  </span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-background/40 border border-dashed border-border/70 px-3 py-2">
                  <span className="h-3 w-3 rounded-full bg-primary/40" />
                  <span className="line-clamp-1 text-card-foreground/70">
                    Try custom builder ideas
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Two main cards */}
        <section className="grid gap-6 md:grid-cols-2">
          {/* Pre-made templates card */}
          <Card className="border-border/70 bg-card/80">
            <CardHeader>
              <CardTitle>Pre-made TOD templates</CardTitle>
              <CardDescription>
                Start in seconds with a layout that fits your style.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="list-disc list-inside space-y-1 text-card-foreground/80">
                <li>Minimalist – clean, focus-first layout</li>
                <li>Dark Mode – sleek high-contrast view</li>
                <li>Project-based – tasks grouped by categories</li>
                <li>Daily focus planner – today&apos;s top 3 tasks</li>
                <li>Emoji checklist – playful & motivating</li>
              </ul>
              <Button className="mt-2 w-full" asChild>
                <Link href="/tod/templates">Choose a template</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Custom builder card */}
          <Card className="border-primary/40 bg-card">
            <CardHeader>
              <CardTitle>Customize your own TOD</CardTitle>
              <CardDescription>
                Mix and match features to create your perfect system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="list-disc list-inside space-y-1 text-card-foreground/80">
                <li>Toggle dark mode, priorities, and subtasks</li>
                <li>Enable categories, tags and deadlines</li>
                <li>Add notes, reminders and focus sections</li>
                <li>Reuse the same backend-powered todo engine</li>
              </ul>
              <Button className="mt-2 w-full" asChild>
                <Link href="/tod/builder">Open builder</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}
