// TOD/tod/apps-web/app/page.tsx
import Link from "next/link";
import Image from "next/image";
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
              <span className="uppercase tracking-wide">
                T.O.D · Todo on Demand
              </span>
            </div>

            <div className="flex items-center gap-3">
              <TodLogo />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              Build your perfect to-do system.
            </h1>

            <p className="text-base md:text-lg text-slate-600 dark:text-slate-300">
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
                  <span className="line-clamp-1">Finish TOD landing page</span>
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

        {/* 🔥 Template preview cards */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Template previews</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Click a template to jump straight into that layout.
              </p>
            </div>
            <Button variant="ghost" asChild>
              <Link href="/tod/templates">View all</Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Minimalist */}
            <Link href="/tod/minimal" className="group">
              <Card className="h-full overflow-hidden border-purple-200/70 bg-gradient-to-b from-purple-50 to-background shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-44 w-full bg-gradient-to-br from-purple-100 to-purple-200">
                  <Image
                    src="/tod/minimalist.png"
                    alt="Minimalist template preview"
                    fill
                    sizes="100vw"
                    className="object-cover object-top opacity-95 group-hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Minimalist</span>
                    <span className="rounded-full bg-purple-100 px-2 py-0.5 text-[10px] font-medium text-purple-700">
                      Soft &amp; Clean
                    </span>
                  </CardTitle>
                  <CardDescription>
                    A clean mobile-style todo layout.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full text-xs font-medium border-purple-500 text-purple-600 hover:bg-purple-50"
                  >
                    Use this template
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Daily Focus Planner */}
            <Link href="/tod/daily" className="group">
              <Card className="h-full overflow-hidden border-emerald-200/70 bg-gradient-to-b from-emerald-50 to-background shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-44 w-full bg-gradient-to-br from-emerald-100 to-emerald-200">
                  <Image
                    src="/tod/daily-planner.png"
                    alt="Daily focus planner template preview"
                    fill
                    sizes="100vw"
                    className="object-cover object-top opacity-95 group-hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Daily Focus Planner</span>
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
                      Productivity
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Plan tasks, Pomodoro sessions, and daily reflections.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full text-xs font-medium border-emerald-500 text-emerald-700 hover:bg-emerald-50"
                  >
                    Use this template
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Projects Overview */}
            <Link href="/tod/projects" className="group">
              <Card className="h-full overflow-hidden bg-slate-950 text-slate-50 border-slate-800 shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-44 w-full bg-slate-900">
                  <Image
                    src="/tod/project1.png"
                    alt="Projects overview dashboard preview"
                    fill
                    sizes="100vw"
                    className="object-cover object-top opacity-95 group-hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Projects Overview</span>
                    <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-100">
                      Dashboard
                    </span>
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Track projects, active tasks, and weekly completion.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full text-xs font-medium border-slate-500 text-slate-50 hover:bg-slate-800"
                  >
                    Use this template
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Emoji Checklists */}
            <Link href="/tod/emoji-checklists" className="group">
              <Card className="h-full overflow-hidden border-amber-200/70 bg-gradient-to-b from-amber-50 to-background shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-44 w-full bg-gradient-to-br from-amber-100 via-pink-100 to-sky-100">
                  <Image
                    src="/tod/emoji-checklists.png"
                    alt="Emoji checklists template preview"
                    fill
                    sizes="100vw"
                    className="object-cover object-top opacity-95 group-hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Emoji Checklists</span>
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                      Fun
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Playful emoji-based boards for Work, Study, and Fitness.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full text-xs font-medium border-amber-500 text-amber-700 hover:bg-amber-50"
                  >
                    Use this template
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* Sherlock Mind Map */}
            <Link href="/tod/mindmap" className="group">
              <Card className="h-full overflow-hidden border-sky-200/70 bg-gradient-to-b from-sky-50 to-background shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-44 w-full bg-sky-50">
                  <Image
                    src="/tod/sherlock-mind-map.png"
                    alt="Sherlock mind map template preview"
                    fill
                    sizes="100vw"
                    className="object-cover object-top opacity-95 group-hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>Sherlock Mind Map</span>
                    <span className="rounded-full bg-sky-100 px-2 py-0.5 text-[10px] font-medium text-sky-700">
                      Visual
                    </span>
                  </CardTitle>
                  <CardDescription>
                    A colorful mind-mapping canvas for complex ideas.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full text-xs font-medium border-sky-500 text-sky-700 hover:bg-sky-50"
                  >
                    Use this template
                  </Button>
                </CardContent>
              </Card>
            </Link>

            {/* TOD Builder */}
            <Link href="/tod/builder" className="group">
              <Card className="h-full overflow-hidden border-indigo-200/70 bg-gradient-to-b from-indigo-50 to-background shadow-sm hover:shadow-xl transition-shadow cursor-pointer">
                <div className="relative h-44 w-full bg-gradient-to-br from-indigo-400 via-purple-500 to-sky-500">
                  <Image
                    src="/tod/tod-builder.png"
                    alt="TOD builder template preview"
                    fill
                    sizes="100vw"
                    className="object-cover object-top opacity-95 group-hover:scale-105 transition-transform"
                  />
                </div>

                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center justify-between">
                    <span>TOD Builder</span>
                    <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                      Advanced
                    </span>
                  </CardTitle>
                  <CardDescription>
                    Customize fields, layout, and components with a live
                    preview.
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Button
                    variant="outline"
                    className="w-full text-xs font-medium border-indigo-500 text-indigo-700 hover:bg-indigo-50"
                  >
                    Open builder
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </section>

        {/* 🎥 TOD demo video */}
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="text-xl font-semibold">Watch TOD in action</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                A quick walkthrough of how you can use TOD to plan your day and projects.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-black/90 shadow-lg">
            <video
              src="/tod/videos/tod-demo.mp4"
              controls
              preload="metadata"
              className="w-full h-auto"
            />
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
                <li>Emoji checklist – playful &amp; motivating</li>
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
