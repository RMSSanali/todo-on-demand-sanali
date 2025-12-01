"use client";

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

export function MorningReflectionCard() {
  const [intention, setIntention] = useState("");
  const [oneThing, setOneThing] = useState("");

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <h2 className="mb-1 text-sm font-semibold text-slate-900">
        Morning reflection
      </h2>
      <p className="mb-3 text-xs text-slate-500">
        Set your mindset before the day starts.
      </p>

      <div className="space-y-2">
        {/* Intention */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-700">
            What is my intention today?
          </label>
          <Textarea
            rows={2}
            value={intention}
            onChange={(e) => setIntention(e.target.value)}
            placeholder="Example: Stay calm, focus on one task at a time, and finish my most important work."
            className="text-xs"
          />
        </div>

        {/* One thing */}
        <div className="space-y-1">
          <label className="text-[11px] font-medium text-slate-700">
            If I only do one thing today, it will be:
          </label>
          <Textarea
            rows={2}
            value={oneThing}
            onChange={(e) => setOneThing(e.target.value)}
            placeholder="Example: Complete my study session / finish my project section / send that important email."
            className="text-xs"
          />
        </div>

        <p className="text-[10px] text-slate-400">
          You don’t need to write a lot. Clear and simple is enough.
        </p>
      </div>
    </div>
  );
}
