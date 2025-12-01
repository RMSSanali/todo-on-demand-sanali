// TOD/tod/apps-web/components/focus/TopThreePriorities.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type PriorityLevel = "low" | "medium" | "high";

type PriorityTask = {
  id: number;
  title: string;
  done: boolean;
  priority: PriorityLevel;
};

export function TopThreePriorities() {
  const [tasks, setTasks] = useState<PriorityTask[]>([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<PriorityLevel>("high");

  const canAddMore = tasks.length < 3;
  const isAddDisabled = !title.trim() || !canAddMore;

  function handleAddTask() {
    if (isAddDisabled) return;

    const newTask: PriorityTask = {
      id: Date.now(),
      title: title.trim(),
      done: false,
      priority,
    };

    setTasks((prev) => [...prev, newTask]);
    setTitle("");
    setPriority("high");
  }

  function toggleDone(id: number) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  function removeTask(id: number) {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }

  function priorityLabel(level: PriorityLevel) {
    if (level === "high") return "High";
    if (level === "medium") return "Medium";
    return "Low";
  }

  return (
    <div className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">
            Top 3 priorities
          </h2>
          <p className="text-xs text-slate-500">
            Focus only on the most important tasks for today.
          </p>
        </div>
        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
          {tasks.length}/3 set
        </span>
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              "flex items-center gap-3 rounded-xl border px-3 py-2",
              task.done
                ? "border-emerald-100 bg-emerald-50"
                : "border-slate-100 bg-slate-50"
            )}
          >
            <Checkbox
              checked={task.done}
              onCheckedChange={() => toggleDone(task.id)}
            />

            <div className="flex-1">
              <p
                className={cn(
                  "text-xs font-medium text-slate-900",
                  task.done && "line-through opacity-60"
                )}
              >
                {task.title}
              </p>
            </div>

            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
                task.priority === "high" && "bg-red-100 text-red-700",
                task.priority === "medium" && "bg-amber-100 text-amber-700",
                task.priority === "low" && "bg-emerald-100 text-emerald-700"
              )}
            >
              {priorityLabel(task.priority)}
            </span>

            <button
              type="button"
              onClick={() => removeTask(task.id)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}

        {tasks.length === 0 && (
          <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500">
            No priorities yet. Add up to three tasks you absolutely must finish
            today.
          </p>
        )}
      </div>

      {/* Add form */}
      <div className="mt-3 space-y-2">
        <Input
          placeholder={
            canAddMore
              ? "Add a top priority task..."
              : "You already set 3 priorities for today"
          }
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={!canAddMore}
          className="text-xs"
        />

        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Priority selector */}
          <div className="flex gap-1">
            {(["high", "medium", "low"] as PriorityLevel[]).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setPriority(level)}
                className={cn(
                  "rounded-full px-3 py-1 text-[11px] font-medium capitalize",
                  priority === level
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {level}
              </button>
            ))}
          </div>

          <Button
            size="sm"
            type="button"
            onClick={handleAddTask}
            disabled={isAddDisabled}
            className="text-xs"
          >
            Add priority
          </Button>
        </div>

        {!canAddMore && (
          <p className="text-[10px] text-slate-400">
            You can only set 3 top priorities to keep your day focused.
          </p>
        )}
      </div>
    </div>
  );
}
