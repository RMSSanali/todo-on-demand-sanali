"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const DEFAULT_DURATION_MINUTES = 25;

export function FocusTimer() {
  const [secondsLeft, setSecondsLeft] = useState(DEFAULT_DURATION_MINUTES * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Percentage for progress bar
  const totalSeconds = DEFAULT_DURATION_MINUTES * 60;
  const progress = 100 - Math.round((secondsLeft / totalSeconds) * 100);

  useEffect(() => {
    if (!isRunning) return;

    const id = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Timer finished
          window.clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(id);
  }, [isRunning]);

  function formatTime(totalSeconds: number) {
    const m = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (totalSeconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleStartPause() {
    if (secondsLeft === 0) return; // do nothing if finished
    setIsRunning((prev) => !prev);
  }

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(totalSeconds);
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Focus timer</h2>
          <p className="text-xs text-slate-500">
            Classic Pomodoro – stay focused in short bursts.
          </p>
        </div>

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {DEFAULT_DURATION_MINUTES} min
        </span>
      </div>

      {/* Time display */}
      <div className="flex flex-col items-center justify-center gap-3 py-4">
        <div className="flex h-24 w-24 items-center justify-center rounded-full border-[6px] border-slate-200 bg-slate-50">
          <span className="text-xl font-semibold tabular-nums text-slate-900">
            {formatTime(secondsLeft)}
          </span>
        </div>

        <p className="text-[11px] text-slate-500">
          {isRunning
            ? "Focus mode ON. Don’t touch your phone 👀"
            : secondsLeft === 0
            ? "Well done! Take a short break 🧘‍♀️"
            : "Press start and focus on one task only."}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-2">
        <Button
          type="button"
          size="sm"
          onClick={handleStartPause}
          disabled={secondsLeft === 0}
          className="flex-1 text-xs"
        >
          {isRunning ? "Pause" : "Start focus"}
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleReset}
          className="flex-1 text-xs"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
