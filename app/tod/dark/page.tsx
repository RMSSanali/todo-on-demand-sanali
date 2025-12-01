// TOD/tod/apps-web/app/tod/dark/page.tsx
"use client";

import { useState } from "react";
import { TodoList } from "@/components/todo/TodoList";

export default function DarkTemplatePage() {
  const [taskCount, setTaskCount] = useState(3);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_#4f46e5,_#020617)] text-foreground flex justify-center">
      <div className="w-full max-w-md px-4 py-10">
        {/* Header above phone card */}
        <section className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-300">
            Template · Dark Mode
          </p>
          <h1 className="text-3xl font-bold text-slate-50">
            You&apos;ve got {taskCount} task{taskCount === 1 ? "" : "s"} to crush today
          </h1>
          <p className="text-sm text-slate-300">
            A sleek, focused layout for late-night sessions.
          </p>
        </section>

        {/* Phone-like dark card */}
        <section className="rounded-[32px] border border-slate-700 bg-slate-900/95 shadow-xl shadow-indigo-900/40 p-4 space-y-4">
          {/* Top bar */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Today · 20 June</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-800 px-2 py-1 text-[10px] uppercase tracking-wide text-slate-200">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              {taskCount} task{taskCount === 1 ? "" : "s"}
            </span>
          </div>

          {/* Tabs row */}
          <div className="flex items-center gap-2 text-xs">
            <button className="rounded-full bg-indigo-500 px-3 py-1 text-slate-50">
              Today
            </button>
            <button className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
              Upcoming
            </button>
            <button className="rounded-full bg-slate-800 px-3 py-1 text-slate-300">
              Personal
            </button>
          </div>

          {/* Real todo list */}
          <div className="mt-2">
            <TodoList variant="dark" templateId="dark" />
          </div>
        </section>
      </div>
    </main>
  );
}
