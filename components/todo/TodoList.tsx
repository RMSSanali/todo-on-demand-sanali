"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type TodoListProps = {
  variant?: "light" | "dark";
  onCountChange?: (count: number) => void;

  // NEW: which template this list belongs to
  // e.g. "builder" | "minimal" | "dark"
  templateId?: string;
};

// For now we hardcode API URL to avoid .env confusion
const API_URL = "http://localhost:4000";

// Helper to build URLs with ?template=...
function makeUrl(path: string, templateId: string) {
  const url = new URL(path, API_URL);
  url.searchParams.set("template", templateId);
  return url.toString();
}

export function TodoList({
  variant = "light",
  onCountChange,
  templateId = "default",
}: TodoListProps) {
  const isDark = variant === "dark";

  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  console.log("🔥 TodoList using API_URL:", API_URL, "templateId:", templateId);

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

        const data: Todo[] = await res.json();
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

      const created: Todo = await res.json();
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

      const updated: Todo = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
      setActionError("Could not update task.");
    }
  };

  // ✏️ Start editing
  const startEditing = (todo: Todo) => {
    setEditingId(todo.id);
    setEditingTitle(todo.title);
  };

  // 💾 Save edited title
  const handleSaveEdit = async (id: number) => {
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

      const updated: Todo = await res.json();
      setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)));
      setEditingId(null);
      setEditingTitle("");
    } catch (err) {
      console.error(err);
      setActionError("Could not save changes.");
    }
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

  const inputClasses =
    "flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

  const itemBg = isDark ? "bg-muted/40" : "bg-muted/60";

  return (
    <div className="space-y-4">
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
        <p className="text-xs text-muted-foreground">
          Loading tasks from server...
        </p>
      )}

      {loadError && (
        <p className="text-xs text-red-500">{loadError}</p>
      )}

      {actionError && (
        <p className="text-xs text-red-500">{actionError}</p>
      )}

      {/* Todo list */}
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${itemBg}`}
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={todo.done}
                onChange={(e) =>
                  handleToggleDone(todo.id, e.target.checked)
                }
              />
              {editingId === todo.id ? (
                <input
                  className="rounded-md border border-border bg-background px-2 py-1 text-xs"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSaveEdit(todo.id);
                    }
                    if (e.key === "Escape") {
                      setEditingId(null);
                      setEditingTitle("");
                    }
                  }}
                />
              ) : (
                <span
                  className={
                    todo.done
                      ? "line-through text-muted-foreground"
                      : ""
                  }
                >
                  {todo.title}
                </span>
              )}
            </div>

            <div className="flex gap-1">
              {editingId === todo.id ? (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleSaveEdit(todo.id)}
                >
                  Save
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => startEditing(todo)}
                >
                  Edit
                </Button>
              )}
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(todo.id)}
              >
                ✕
              </Button>
            </div>
          </li>
        ))}

        {todos.length === 0 && !loading && !loadError && (
          <li className="text-xs text-muted-foreground">
            No tasks yet. Add one and I’ll save it to PostgreSQL for you. ✨
          </li>
        )}
      </ul>
    </div>
  );
}
