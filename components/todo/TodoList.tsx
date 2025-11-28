// TOD/tod/apps-web/components/todo/TodoList.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

type TodoListProps = {
  variant?: "light" | "dark";
  onCountChange?: (count: number) => void;
};

export function TodoList({ variant = "light", onCountChange }: TodoListProps) {
  const isDark = variant === "dark";

  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, title: "Finish TOD Minimalist template", done: false },
    { id: 2, title: "Create Dark Mode template", done: false },
    { id: 3, title: "Prepare demo flow", done: true },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // 🔥 Notify parent when the number of tasks changes
  useEffect(() => {
    onCountChange?.(todos.length);
  }, [todos, onCountChange]);

  function addTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const title = newTodo.trim();
    if (!title) return;

    if (editingId !== null) {
      // 🔁 Update existing todo
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, title } : todo
        )
      );
      setEditingId(null);
    } else {
      // ➕ Add new todo
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), title, done: false },
      ]);
    }

    setNewTodo("");
  }

  function toggleTodo(id: number) {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  }

  function deleteTodo(id: number) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  return (
    <div className="space-y-4">
      {/* Add form */}
      <form onSubmit={addTodo} className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task..."
          className={
            "flex-1 rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 " +
            (isDark
              ? "border-slate-700 bg-slate-900 text-slate-100 focus:ring-indigo-500/60"
              : "border-purple-100 bg-white text-slate-800 focus:ring-purple-400/60")
          }
        />
        <Button type="submit" variant={isDark ? "outline" : "default"}>
          {editingId === null ? "Add" : "Update"}
        </Button>
      </form>

      {/* Todo list */}
      <div className="space-y-2">
        {todos.length === 0 && (
          <p
            className={
              isDark ? "text-sm text-slate-400" : "text-sm text-slate-500"
            }
          >
            No tasks yet. Add your first todo!
          </p>
        )}

        {todos.map((todo) => (
          <div
            key={todo.id}
            className={
              "flex items-center gap-3 rounded-2xl border px-3 py-3 text-sm shadow-sm " +
              (isDark
                ? "border-slate-700 bg-slate-900"
                : "border-purple-100 bg-[#F9F7FF]")
            }
          >
            <input
              type="checkbox"
              checked={todo.done}
              onChange={() => toggleTodo(todo.id)}
              className={
                "h-4 w-4 rounded-full border " +
                (isDark
                  ? "border-slate-500 accent-indigo-400"
                  : "border-purple-200 accent-purple-500")
              }
            />

            <span
              className={
                "flex-1 " +
                (isDark
                  ? todo.done
                    ? "line-through text-slate-500"
                    : "text-slate-100"
                  : todo.done
                  ? "line-through text-slate-400"
                  : "text-slate-700")
              }
            >
              {todo.title}
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingId(todo.id);
                  setNewTodo(todo.title);
                }}
                className={
                  "text-xs " +
                  (isDark
                    ? "text-slate-400 hover:text-slate-200"
                    : "text-slate-400 hover:text-slate-600")
                }
              >
                Edit
              </button>

              <button
                type="button"
                onClick={() => deleteTodo(todo.id)}
                className={
                  "text-xs " +
                  (isDark
                    ? "text-slate-500 hover:text-rose-400"
                    : "text-slate-300 hover:text-rose-400")
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
