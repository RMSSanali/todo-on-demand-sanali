// TOD/tod/apps-web/components/todo/TodoList.tsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Priority = "low" | "medium" | "high";
type Category = "none" | "work" | "personal" | "study";

type Subtask = {
  id: number;
  title: string;
  done: boolean;
};

type Todo = {
  id: number;
  title: string;
  done: boolean;
  priority: Priority;
  note?: string; // optional
  pinned?: boolean; // optional pinned flag
  category?: Category; // simple category
  subtasks?: Subtask[]; // NEW: subtasks
};

type TodoListProps = {
  variant?: "light" | "dark";
  onCountChange?: (count: number) => void;
  templateId?: string;
  showNotes?: boolean;
  showPriority?: boolean;
  checkboxClassName?: string;
  enablePinned?: boolean;
  showCategories?: boolean;
  showSubtasks?: boolean; // NEW: toggle subtasks UI
};

const API_URL = "http://localhost:4000";

// Helper to build URLs with ?template=...
function makeUrl(path: string, templateId: string) {
  const url = new URL(path, API_URL);
  url.searchParams.set("template", templateId);
  return url.toString();
}

// 🔹 Priority badge styles (use variant, not Tailwind dark mode)
function getPriorityClasses(priority: Priority, variant: "light" | "dark") {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide cursor-pointer";

  if (priority === "high") {
    return (
      base +
      " " +
      (variant === "dark"
        ? "bg-rose-500/25 text-rose-50 border border-rose-400/70"
        : "bg-rose-50 text-rose-600 border border-rose-200")
    );
  }

  if (priority === "medium") {
    return (
      base +
      " " +
      (variant === "dark"
        ? "bg-amber-500/25 text-amber-50 border border-amber-400/70"
        : "bg-amber-50 text-amber-600 border border-amber-200")
    );
  }

  // low
  return (
    base +
    " " +
    (variant === "dark"
      ? "bg-emerald-500/25 text-emerald-50 border border-emerald-400/70"
      : "bg-emerald-50 text-emerald-600 border border-emerald-200")
  );
}

// 🔁 Helper to cycle priority when clicking the badge
function nextPriority(current: Priority): Priority {
  if (current === "low") return "medium";
  if (current === "medium") return "high";
  return "low";
}

export function TodoList({
  variant = "light",
  onCountChange,
  templateId = "default",
  showNotes = true,
  showPriority = true,
  checkboxClassName,
  enablePinned = true,
  showCategories = true,
  showSubtasks = true,
}: TodoListProps) {
  const isDark = variant === "dark";

  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      title: "Plan today’s 3 main tasks",
      done: false,
      priority: "high",
      note: "Choose only the most important tasks.",
      pinned: true,
      category: "work",
      subtasks: [
        { id: 1, title: "Pick top 3 tasks", done: false },
        { id: 2, title: "Estimate time for each", done: false },
      ],
    },
    {
      id: 2,
      title: "Check Jira board",
      done: false,
      priority: "medium",
      note: "Move tasks to In Progress.",
      pinned: false,
      category: "work",
      subtasks: [],
    },
    {
      id: 3,
      title: "Clean up completed tasks",
      done: true,
      priority: "low",
      note: "Archive or tick off finished items.",
      pinned: false,
      category: "personal",
      subtasks: [],
    },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [editingNoteText, setEditingNoteText] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // For adding subtasks: one input per todo
  const [subtaskDrafts, setSubtaskDrafts] = useState<Record<number, string>>({});

  console.log(
    "🔥 TodoList using API_URL:",
    API_URL,
    "templateId:",
    templateId,
    "variant:",
    variant,
    "showNotes:",
    showNotes,
    "showPriority:",
    showPriority,
    "enablePinned:",
    enablePinned,
    "showCategories:",
    showCategories,
    "showSubtasks:",
    showSubtasks
  );

  // Load todos from backend when component mounts / template changes
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        setLoading(true);
        setLoadError(null);

        const res = await fetch(makeUrl("/todos", templateId));
        if (!res.ok) {
          throw new Error(`Failed to load todos (${res.status})`);
        }

        const raw = await res.json();

        // Add default priority + one example note (for demo)
        const data: Todo[] = (raw as any[]).map((t, index) => ({
          id: t.id,
          title: t.title,
          done: t.done,
          priority: "medium" as Priority,
          note:
            t.note ??
            (index === 0
              ? "Example note: break this task into small steps."
              : undefined),
          pinned: false,
          category: "none",
          subtasks: [], // start empty when loading from server
        }));

        setTodos(data);
      } catch (err) {
        console.error(err);
        setLoadError("Could not load tasks from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [templateId]);

  // Notify parent about count
  useEffect(() => {
    if (onCountChange) {
      onCountChange(todos.length);
    }
  }, [todos, onCountChange]);

  // ➕ Create todo
  const handleAddTodo = async () => {
    const title = newTodo.trim();
    if (!title) return;

    try {
      setActionError(null);

      const res = await fetch(makeUrl("/todos", templateId), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error(`Failed to create todo (${res.status})`);
      }

      const raw = await res.json();
      const created: Todo = {
        id: raw.id,
        title: raw.title,
        done: raw.done,
        priority: "medium", // default
        note: undefined,
        pinned: false,
        category: "none",
        subtasks: [],
      };

      setTodos((prev) => [...prev, created]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
      setActionError("Could not create task.");
    }
  };

  // ✅ Toggle done
  const handleToggleDone = async (id: number, done: boolean) => {
    try {
      setActionError(null);

      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ done }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update todo (${res.status})`);
      }

      const raw = await res.json();
      const updatedFromServer = {
        id: raw.id,
        title: raw.title,
        done: raw.done,
      };

      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...updatedFromServer,
              }
            : t
        )
      );
    } catch (err) {
      console.error(err);
      setActionError("Could not update task.");
    }
  };

  // ✏️ Start editing title
  const startEditingTitle = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  // 💾 Save edited title
  const handleSaveEditTitle = async (id: number) => {
    const title = editingTitle.trim();
    if (!title) return;

    try {
      setActionError(null);

      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update todo (${res.status})`);
      }

      const raw = await res.json();
      const updatedFromServer = {
        id: raw.id,
        title: raw.title,
        done: raw.done,
      };

      setTodos((prev) =>
        prev.map((t) =>
          t.id === id
            ? {
                ...t,
                ...updatedFromServer,
              }
            : t
        )
      );
      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error(err);
      setActionError("Could not save changes.");
    }
  };

  // 📝 Start editing note (local only for now)
  const startEditingNote = (todo: Todo) => {
    setEditingNoteId(todo.id);
    setEditingNoteText(todo.note ?? "");
  };

  const handleSaveNote = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, note: editingNoteText.trim() || undefined } : t
      )
    );
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  const handleCancelNote = () => {
    setEditingNoteId(null);
    setEditingNoteText("");
  };

  // 🗑 Delete todo
  const handleDelete = async (id: number) => {
    try {
      setActionError(null);

      const res = await fetch(`${API_URL}/todos/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Failed to delete todo (${res.status})`);
      }

      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
      setActionError("Could not delete task.");
    }
  };

  // 🔁 Change priority locally (no backend yet)
  const handleChangePriority = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, priority: nextPriority(t.priority) } : t
      )
    );
  };

  // 📌 Toggle pinned (local only)
  const handleTogglePinned = (id: number) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, pinned: !t.pinned } : t
      )
    );
  };

  // 🗂️ Change category (local only)
  const handleChangeCategory = (id: number, category: Category) => {
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, category } : t
      )
    );
  };

  // ➕ Add subtask (local only)
  const handleAddSubtask = (todoId: number) => {
    const draft = (subtaskDrafts[todoId] ?? "").trim();
    if (!draft) return;

    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== todoId) return t;
        const nextId =
          (t.subtasks && t.subtasks.length > 0
            ? Math.max(...t.subtasks.map((s) => s.id)) + 1
            : 1);
        const newSubtask: Subtask = {
          id: nextId,
          title: draft,
          done: false,
        };
        return {
          ...t,
          subtasks: [...(t.subtasks ?? []), newSubtask],
        };
      })
    );

    setSubtaskDrafts((prev) => ({ ...prev, [todoId]: "" }));
  };

  // ✅ Toggle subtask done (local only)
  const handleToggleSubtaskDone = (todoId: number, subtaskId: number) => {
    setTodos((prev) =>
      prev.map((t) => {
        if (t.id !== todoId) return t;
        return {
          ...t,
          subtasks: (t.subtasks ?? []).map((s) =>
            s.id === subtaskId ? { ...s, done: !s.done } : s
          ),
        };
      })
    );
  };

  const inputClasses =
    "flex-1 rounded-md border border-border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring " +
    (isDark
      ? "bg-slate-900 text-slate-50 placeholder:text-slate-500"
      : "bg-background text-slate-900 placeholder:text-slate-400");

  const rootTextColor = isDark ? "text-slate-50" : "text-slate-900";

  // 🔀 Sort todos: pinned first, then others (keep relative order)
  const sortedTodos = [...todos].sort((a, b) => {
    const aPinned = a.pinned ?? false;
    const bPinned = b.pinned ?? false;
    if (aPinned && !bPinned) return -1;
    if (!aPinned && bPinned) return 1;
    return 0;
  });

  return (
    <div className={`space-y-4 ${rootTextColor}`}>
      {/* New todo input */}
      <div className="flex gap-2">
        <input
          className={inputClasses}
          placeholder="Add a task and sync it to your real backend..."
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddTodo();
          }}
        />
        <Button onClick={handleAddTodo} size="sm">
          Add
        </Button>
      </div>

      {/* Loading & error messages */}
      {loading && (
        <p className={isDark ? "text-xs text-slate-200" : "text-xs text-slate-500"}>
          Loading tasks from server...
        </p>
      )}

      {loadError && (
        <p className={isDark ? "text-xs text-red-300" : "text-xs text-red-500"}>
          {loadError}
        </p>
      )}

      {actionError && (
        <p className={isDark ? "text-xs text-red-300" : "text-xs text-red-500"}>
          {actionError}
        </p>
      )}

      {/* Todo list */}
      <ul className="space-y-2">
        {sortedTodos.map((todo) => (
          <li
            key={todo.id}
            className={
              "flex items-start justify-between gap-3 rounded-xl px-3 py-2 transition-colors " +
              (isDark
                ? "bg-slate-800/90 border border-slate-700"
                : "bg-slate-50/80 border border-slate-100")
            }
          >
            {/* Left side: checkbox + title + meta */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={(e) => handleToggleDone(todo.id, e.target.checked)}
                  className={`h-5 w-5 border border-slate-300 ${
                    checkboxClassName ? checkboxClassName : "rounded"
                  }`}
                />

                {editingId === todo.id ? (
                  <input
                    className={
                      "flex-1 rounded-md border border-slate-300 px-2 py-1 text-xs " +
                      (isDark
                        ? "bg-slate-900 text-slate-50"
                        : "bg-background text-slate-900")
                    }
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleSaveEditTitle(todo.id);
                      if (e.key === "Escape") {
                        setEditingId(null);
                        setEditingTitle("");
                      }
                    }}
                  />
                ) : (
                  <span
                    className={
                      "text-sm " +
                      (todo.done
                        ? isDark
                          ? "line-through text-slate-500"
                          : "line-through text-slate-400"
                        : isDark
                        ? "text-slate-50"
                        : "text-slate-800")
                    }
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              {/* Category selector */}
              {showCategories && (
                <div className="mt-1 flex items-center gap-2 text-[11px]">
                  <span
                    className={
                      isDark ? "text-slate-300" : "text-slate-500"
                    }
                  >
                    Category:
                  </span>
                  <select
                    value={todo.category ?? "none"}
                    onChange={(e) =>
                      handleChangeCategory(todo.id, e.target.value as Category)
                    }
                    className={
                      "rounded-md border border-slate-300 px-2 py-0.5 text-[11px] " +
                      (isDark
                        ? "bg-slate-900 text-slate-50"
                        : "bg-white text-slate-800")
                    }
                  >
                    <option value="none">None</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="study">Study</option>
                  </select>
                </div>
              )}

              {/* Subtasks */}
              {showSubtasks && (
                <div className="mt-2 space-y-1">
                  {(todo.subtasks ?? []).length > 0 && (
                    <ul className="space-y-1">
                      {(todo.subtasks ?? []).map((sub) => (
                        <li
                          key={sub.id}
                          className="flex items-center gap-2 text-[11px]"
                        >
                          <input
                            type="checkbox"
                            checked={sub.done}
                            onChange={() =>
                              handleToggleSubtaskDone(todo.id, sub.id)
                            }
                            className="h-4 w-4 rounded border-slate-300"
                          />
                          <span
                            className={
                              sub.done
                                ? isDark
                                  ? "line-through text-slate-400"
                                  : "line-through text-slate-400"
                                : isDark
                                ? "text-slate-100"
                                : "text-slate-700"
                            }
                          >
                            {sub.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Add subtask input */}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add subtask..."
                      value={subtaskDrafts[todo.id] ?? ""}
                      onChange={(e) =>
                        setSubtaskDrafts((prev) => ({
                          ...prev,
                          [todo.id]: e.target.value,
                        }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddSubtask(todo.id);
                        }
                      }}
                      className={
                        "flex-1 rounded-md border border-slate-300 px-2 py-1 text-[11px] " +
                        (isDark
                          ? "bg-slate-900 text-slate-50 placeholder:text-slate-500"
                          : "bg-white text-slate-800 placeholder:text-slate-400")
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleAddSubtask(todo.id)}
                      className={
                        "text-[11px] rounded-md border px-2 py-1 " +
                        (isDark
                          ? "border-slate-600 text-slate-100"
                          : "border-slate-300 text-slate-700")
                      }
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}

              {/* Note display / edit - only if showNotes is true */}
              {showNotes && (
                <>
                  {editingNoteId === todo.id ? (
                    <div className="mt-2 space-y-1">
                      <textarea
                        className={
                          "w-full rounded-md border border-slate-300 px-2 py-1 text-xs " +
                          (isDark
                            ? "bg-slate-900 text-slate-50"
                            : "bg-background text-slate-800")
                        }
                        rows={2}
                        value={editingNoteText}
                        onChange={(e) => setEditingNoteText(e.target.value)}
                      />
                      <div className="flex gap-2 text-[11px]">
                        <button
                          onClick={() => handleSaveNote(todo.id)}
                          className="underline"
                        >
                          Save note
                        </button>
                        <button
                          onClick={handleCancelNote}
                          className={
                            isDark
                              ? "underline text-slate-300"
                              : "underline text-slate-500"
                          }
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-1 space-y-1">
                      {todo.note && (
                        <p
                          className={
                            isDark
                              ? "text-xs text-slate-200"
                              : "text-xs text-slate-600"
                          }
                        >
                          {todo.note}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => startEditingNote(todo)}
                        className={
                          "text-[11px] underline " +
                          (isDark ? "text-slate-300" : "text-slate-400")
                        }
                      >
                        {todo.note ? "Edit note" : "Add note"}
                      </button>
                    </div>
                  )}
                </>
              )}

              {/* Edit / Delete actions (title) */}
              <div
                className={
                  "mt-1 flex gap-2 text-[11px] " +
                  (isDark ? "text-slate-300" : "text-slate-500")
                }
              >
                {editingId === todo.id ? (
                  <>
                    <button
                      onClick={() => handleSaveEditTitle(todo.id)}
                      className="underline"
                    >
                      Save title
                    </button>
                    <button
                      onClick={() => {
                        setEditingId(null);
                        setEditingTitle("");
                      }}
                      className="underline"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => startEditingTitle(todo)}
                      className="underline"
                    >
                      Edit title
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="underline"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right side: pin + priority */}
            <div className="ml-2 flex flex-col items-end gap-2">
              {enablePinned && (
                <button
                  type="button"
                  onClick={() => handleTogglePinned(todo.id)}
                  className={
                    "text-[11px] inline-flex items-center gap-1 rounded-full px-2 py-1 border transition " +
                    (todo.pinned
                      ? isDark
                        ? "border-amber-400 bg-amber-500/20 text-amber-100"
                        : "border-amber-300 bg-amber-50 text-amber-700"
                      : isDark
                      ? "border-slate-600 bg-slate-800 text-slate-200"
                      : "border-slate-200 bg-white text-slate-500")
                  }
                >
                  <span>{todo.pinned ? "📌" : "📍"}</span>
                  <span>{todo.pinned ? "Pinned" : "Pin"}</span>
                </button>
              )}

              {showPriority && (
                <button
                  type="button"
                  onClick={() => handleChangePriority(todo.id)}
                >
                  <span className={getPriorityClasses(todo.priority, variant)}>
                    {todo.priority === "high"
                      ? "High"
                      : todo.priority === "medium"
                      ? "Medium"
                      : "Low"}
                  </span>
                </button>
              )}
            </div>
          </li>
        ))}

        {sortedTodos.length === 0 && !loading && !loadError && (
          <li className={isDark ? "text-xs text-slate-200" : "text-xs text-slate-500"}>
            No tasks yet. Add one and I’ll save it to PostgreSQL for you. ✨
          </li>
        )}
      </ul>
    </div>
  );
}
