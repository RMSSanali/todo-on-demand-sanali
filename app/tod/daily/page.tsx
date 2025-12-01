import { TopThreePriorities } from "@/components/focus/TopThreePriorities";
import { FocusTimer } from "@/components/focus/FocusTimer";
import { DailySummaryCard } from "@/components/focus/DailySummaryCard";
import { MorningReflectionCard } from "@/components/focus/MorningReflectionCard";

export default function DailyFocusPage() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  return (
    <main className="min-h-screen bg-[#f5f7f5] px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm text-slate-500">Daily Focus Planner</p>
            <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
              Good morning, Sanali 🌤️
            </h1>
          </div>

          <div className="rounded-2xl bg-white px-4 py-2 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              Today
            </p>
            <p className="text-sm font-medium text-slate-800">{today}</p>
          </div>
        </header>

        {/* Main layout grid */}
        <section className="grid gap-4 md:grid-cols-[2fr,1.3fr]">
          {/* Left column */}
          <div className="space-y-4">
            {/* Top 3 priorities */}
            <TopThreePriorities />

            {/* Morning reflection */}
            <MorningReflectionCard />
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <FocusTimer />
            <DailySummaryCard />
          </div>
        </section>
      </div>
    </main>
  );
}
