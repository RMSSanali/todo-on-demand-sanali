"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

export function DailySummaryCard() {
  const [reflection, setReflection] = useState("");
  const [mood, setMood] = useState<number[]>([7]); // 1–10
  const [top3Done, setTop3Done] = useState(false);
  const [focusDone, setFocusDone] = useState(false);

  // Simple progress formula:
  // Top 3 done (40%) + Focus session (30%) + Reflection written (30%)
  const reflectionDone = reflection.trim().length > 0;
  const progress =
    (top3Done ? 40 : 0) +
    (focusDone ? 30 : 0) +
    (reflectionDone ? 30 : 0);

  function moodLabel(value: number) {
    if (value <= 3) return "Drained 🥱";
    if (value <= 6) return "Okay 🙂";
    if (value <= 8) return "Good 😊";
    return "Great 💪";
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Daily progress & evening reflection
          </h2>
          <p className="text-xs text-slate-500">
            Close your day with a quick check-in.
          </p>
        </div>
        <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-medium text-white">
          {progress}%
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Toggles */}
      <div className="mb-3 space-y-1 text-xs text-slate-600">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={top3Done}
            onChange={(e) => setTop3Done(e.target.checked)}
            className="h-3 w-3"
          />
          <span>Completed my top 3 priorities</span>
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={focusDone}
            onChange={(e) => setFocusDone(e.target.checked)}
            className="h-3 w-3"
          />
          <span>Did at least one focused Pomodoro session</span>
        </label>

        <p className="text-[11px] text-slate-400">
          (These help calculate your completion score for today.)
        </p>
      </div>

      {/* Mood slider */}
      <div className="mb-3 space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium text-slate-700">How do you feel?</span>
          <span className="text-[11px] text-slate-500">
            {moodLabel(mood[0])}
          </span>
        </div>
        <Slider
          min={1}
          max={10}
          step={1}
          value={mood}
          onValueChange={setMood}
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>

      {/* Reflection textarea */}
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-700">
          Evening reflection
        </label>
        <Textarea
          rows={3}
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          placeholder="What went well today? What would you like to improve tomorrow?"
          className="text-xs"
        />
        <p className="text-[10px] text-slate-400">
          A few honest sentences are enough. This also boosts your progress%.
        </p>
      </div>
    </div>
  );
}
