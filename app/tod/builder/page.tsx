//  TOD/tod/apps-web/app/tod/app/builder/page.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TodoList } from "@/components/todo/TodoList";

export default function TodBuilderPage() {
  const [isDark, setIsDark] = useState(false);
  const [compact, setCompact] = useState(false);
  const [rounded, setRounded] = useState(true);
  const [showBorder, setShowBorder] = useState(true);

  const previewBg = isDark
    ? "bg-[radial-gradient(circle_at_top,_#4f46e5,_#020617)]"
    : "bg-[radial-gradient(circle_at_top,_#f4f0ff,_#fdf7ff)]";

  const previewCardClasses =
    "w-full max-w-md mx-auto " +
    (rounded ? "rounded-[32px]" : "rounded-xl") +
    " " +
    (showBorder ? "border " + (isDark ? "border-slate-700" : "border-purple-100") : "border-transparent") +
    " " +
    (isDark ? "bg-slate-900/95 shadow-xl shadow-indigo-900/40" : "bg-white/90 shadow-lg shadow-purple-100/50") +
    " " +
    (compact ? "p-3" : "p-4");

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        {/* Left side: Controls */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">TOD Builder</h1>
          <p className="text-sm text-slate-500">
            Toggle options and instantly preview your custom T.O.D layout. This is a prototype builder that controls how
            the todo view looks.
          </p>

          <Card className="bg-card/90 border-border/70">
            <CardHeader>
              <CardTitle>Layout options</CardTitle>
              <CardDescription>Choose how your todo template should look and feel.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Dark mode</p>
                  <p className="text-xs text-slate-500">
                    Switch between light and dark preview.
                  </p>
                </div>
                <Switch checked={isDark} onCheckedChange={setIsDark} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Compact mode</p>
                  <p className="text-xs text-slate-500">
                    Reduce padding for a denser layout.
                  </p>
                </div>
                <Switch checked={compact} onCheckedChange={setCompact} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Rounded corners</p>
                  <p className="text-xs text-slate-500">
                    Toggle between pill-shaped and boxy cards.
                  </p>
                </div>
                <Switch checked={rounded} onCheckedChange={setRounded} />
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-medium">Show border</p>
                  <p className="text-xs text-slate-500">
                    Turn card borders on or off.
                  </p>
                </div>
                <Switch checked={showBorder} onCheckedChange={setShowBorder} />
              </div>

              <div className="pt-2">
                <Button variant="outline" size="sm" onClick={() => {
                  setIsDark(false);
                  setCompact(false);
                  setRounded(true);
                  setShowBorder(true);
                }}>
                  Reset to default
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right side: Live preview */}
        <section className={"rounded-3xl p-6 " + previewBg}>
          <div className="w-full max-w-md mx-auto mb-4 text-xs text-slate-100/80 flex items-center justify-between">
            <span>Preview</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {isDark ? "Dark template" : "Light template"}
            </span>
          </div>

          <div className={previewCardClasses}>
            {/* Top bar depends on mode */}
            <div className="flex items-center justify-between text-xs mb-3">
              <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                {isDark ? "Today · 20 June" : "Groceries · Today"}
              </span>
              <span
                className={
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] uppercase tracking-wide " +
                  (isDark ? "bg-slate-800 text-slate-200" : "bg-[#F7F3FF] text-slate-500")
                }
              >
                <span
                  className={
                    "h-1.5 w-1.5 rounded-full " +
                    (isDark ? "bg-indigo-400" : "bg-purple-400")
                  }
                />
                {isDark ? "Focus" : "List"}
              </span>
            </div>

            {/* Actual TodoList */}
            <TodoList variant={isDark ? "dark" : "light"} />
          </div>
        </section>
      </div>
    </main>
  );
}
