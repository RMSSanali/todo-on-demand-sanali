// TOD/tod/apps-web/app/tod/app/builder/page.tsx
"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { TodoList } from "@/components/todo/TodoList";

type TemplateStyle = "minimalist" | "project" | "daily" | "emoji";

export default function TodBuilderPage() {
  const [isDark, setIsDark] = useState(false);
  const [compact, setCompact] = useState(false);
  const [rounded, setRounded] = useState(true);
  const [showBorder, setShowBorder] = useState(true);

  // Template + feature toggles
  const [templateStyle, setTemplateStyle] = useState<TemplateStyle>("minimalist");
  const [showNotes, setShowNotes] = useState(true);
  const [showPriority, setShowPriority] = useState(true);
  const [enablePinned, setEnablePinned] = useState(true);
  const [showCategories, setShowCategories] = useState(true);
  const [showSubtasks, setShowSubtasks] = useState(true); // NEW

  // Apply template preset (controls templateStyle + feature toggles)
  const applyTemplatePreset = (style: TemplateStyle) => {
    setTemplateStyle(style);

    if (style === "minimalist") {
      setShowNotes(false);
      setShowPriority(false);
      setEnablePinned(false);
      setShowCategories(false);
      setShowSubtasks(false);
    } else if (style === "project") {
      setShowNotes(true);
      setShowPriority(true);
      setEnablePinned(true);
      setShowCategories(true);
      setShowSubtasks(true);
    } else if (style === "daily") {
      setShowNotes(false);
      setShowPriority(true);
      setEnablePinned(true);
      setShowCategories(true);
      setShowSubtasks(true);
    } else if (style === "emoji") {
      setShowNotes(false);
      setShowPriority(false);
      setEnablePinned(true);
      setShowCategories(false);
      setShowSubtasks(false);
    }
  };

  const previewBg = isDark
    ? "bg-[radial-gradient(circle_at_top,_#4f46e5,_#020617)]"
    : "bg-[radial-gradient(circle_at_top,_#f4f0ff,_#fdf7ff)]";

  const previewLabelClasses = isDark
    ? "text-xs text-slate-100/80"
    : "text-xs text-slate-600";

  const previewCardClasses =
    "w-full max-w-md mx-auto " +
    (rounded ? "rounded-[32px]" : "rounded-xl") +
    " " +
    (showBorder
      ? "border " + (isDark ? "border-slate-700" : "border-purple-100")
      : "border-transparent") +
    " " +
    (isDark
      ? "bg-slate-900/95 shadow-xl shadow-indigo-900/40"
      : "bg-white/90 shadow-lg shadow-purple-100/50") +
    " " +
    (compact ? "p-3" : "p-4") +
    " transition-all duration-300";

  const previewCardStyle =
    templateStyle === "minimalist" && !isDark
      ? {
          background: `radial-gradient(circle at top right, rgba(255,255,255,0.4), transparent),
                       linear-gradient(135deg, #C7B7FF 0%, #FFB6D9 100%)`,
        }
      : undefined;

  const templateLabel =
    templateStyle === "minimalist"
      ? "Minimalist"
      : templateStyle === "project"
      ? "Project-based"
      : templateStyle === "daily"
      ? "Daily focus"
      : "Emoji checklist";

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)]">
        {/* Left side: Controls */}
        <section className="space-y-4">
          <h1 className="text-3xl font-bold">TOD Builder</h1>
          <p className="text-sm text-slate-500">
            Toggle options and instantly preview your custom T.O.D layout. This
            is a prototype builder that controls how the todo view looks.
          </p>

          <Card className="bg-card/90 border-border/70">
            <CardHeader>
              <CardTitle>Layout options</CardTitle>
              <CardDescription>
                Choose how your todo template should look and feel.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              {/* Theme & layout */}
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

              {/* Divider */}
              <div className="pt-2 border-t border-slate-100/60 mt-2" />

              {/* Content & features */}
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Content & features
                </p>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Show notes</p>
                    <p className="text-xs text-slate-500">
                      Allow extra details under each task.
                    </p>
                  </div>
                  <Switch checked={showNotes} onCheckedChange={setShowNotes} />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Show priority badges</p>
                    <p className="text-xs text-slate-500">
                      Display low / medium / high tags.
                    </p>
                  </div>
                  <Switch
                    checked={showPriority}
                    onCheckedChange={setShowPriority}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Pinned tasks</p>
                    <p className="text-xs text-slate-500">
                      Keep important items at the top of the list.
                    </p>
                  </div>
                  <Switch
                    checked={enablePinned}
                    onCheckedChange={setEnablePinned}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Show categories</p>
                    <p className="text-xs text-slate-500">
                      Simple labels like Work / Personal / Study.
                    </p>
                  </div>
                  <Switch
                    checked={showCategories}
                    onCheckedChange={setShowCategories}
                  />
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Show subtasks</p>
                    <p className="text-xs text-slate-500">
                      Add smaller steps under each task.
                    </p>
                  </div>
                  <Switch
                    checked={showSubtasks}
                    onCheckedChange={setShowSubtasks}
                  />
                </div>
              </div>

              {/* Divider */}
              <div className="pt-2 border-t border-slate-100/60 mt-2" />

              {/* Template style */}
              <div className="space-y-2 pt-3">
                <p className="text-[11px] uppercase tracking-wide text-slate-400">
                  Template style
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => applyTemplatePreset("minimalist")}
                    className={
                      "rounded-lg border px-2 py-2 text-xs text-left transition " +
                      (templateStyle === "minimalist"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 hover:border-slate-300")
                    }
                  >
                    Minimalist
                    <span className="block text-[10px] text-slate-500">
                      Clean, no notes or extras.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyTemplatePreset("project")}
                    className={
                      "rounded-lg border px-2 py-2 text-xs text-left transition " +
                      (templateStyle === "project"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 hover:border-slate-300")
                    }
                  >
                    Project-based
                    <span className="block text-[10px] text-slate-500">
                      Steps with notes, priority, categories & subtasks.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyTemplatePreset("daily")}
                    className={
                      "rounded-lg border px-2 py-2 text-xs text-left transition " +
                      (templateStyle === "daily"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 hover:border-slate-300")
                    }
                  >
                    Daily focus
                    <span className="block text-[10px] text-slate-500">
                      Today&apos;s priorities with tags & subtasks.
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => applyTemplatePreset("emoji")}
                    className={
                      "rounded-lg border px-2 py-2 text-xs text-left transition " +
                      (templateStyle === "emoji"
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-slate-200 hover:border-slate-300")
                    }
                  >
                    Emoji checklist
                    <span className="block text-[10px] text-slate-500">
                      Fun, playful checklist style.
                    </span>
                  </button>
                </div>
              </div>

              {/* Reset */}
              <div className="pt-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-slate-700 dark:text-slate-200"
                  onClick={() => {
                    setIsDark(false);
                    setCompact(false);
                    setRounded(true);
                    setShowBorder(true);
                    applyTemplatePreset("minimalist");
                  }}
                >
                  Reset to default
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Right side: Live preview */}
        <section className={"rounded-3xl p-6 " + previewBg}>
          <div
            className={
              "w-full max-w-md mx-auto mb-4 flex items-center justify-between " +
              previewLabelClasses
            }
          >
            <span>Preview</span>
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              {isDark ? "Dark" : "Light"} · {templateLabel}
            </span>
          </div>

          <div className={previewCardClasses} style={previewCardStyle}>
            {/* Top bar depends on mode */}
            <div className="flex items-center justify-between text-xs mb-3">
              <span className={isDark ? "text-slate-400" : "text-slate-500"}>
                Template · {templateLabel}
              </span>
              <span
                className={
                  "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] uppercase tracking-wide " +
                  (isDark
                    ? "bg-slate-800 text-slate-200"
                    : "bg-[#F7F3FF] text-slate-500")
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
            <TodoList
              variant={isDark ? "dark" : "light"}
              templateId={templateStyle}
              showNotes={showNotes}
              showPriority={showPriority}
              enablePinned={enablePinned}
              showCategories={showCategories}
              showSubtasks={showSubtasks}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
