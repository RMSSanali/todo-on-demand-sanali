// TOD/tod/apps-web/app/tod/app/minimal/page.tsx
"use client";

import { useState } from "react";
import { TodoList } from "@/components/todo/TodoList";

export default function MinimalTemplatePage() {
  const [title, setTitle] = useState("Groceries");

  // 📌 Sample grocery items
  const initialGroceries = [
    { id: 1, title: "Fresh strawberries", done: false },
    { id: 2, title: "Almond milk", done: false },
    { id: 3, title: "Brown bread", done: false },
    { id: 4, title: "Eggs (12-pack)", done: false },
    { id: 5, title: "Avocados", done: false },
    { id: 6, title: "Spinach", done: false },
    { id: 7, title: "Greek yogurt", done: false },
    { id: 8, title: "Chicken breast", done: false },
    { id: 9, title: "Tomatoes", done: false },
    { id: 10, title: "Oatmeal", done: false },
  ];

  return (
    <main
      className="min-h-[calc(100vh-4rem)] text-foreground flex justify-center"
      style={{
        background: "linear-gradient(135deg, #eadefaff 0%, #ffdbf8ff 100%)",
      }}
    >
      <div className="w-full max-w-md px-4 py-10 soft-fade-in">
        <section className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-700">
            Template · Minimalist
          </p>

          {/* Editable title */}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent text-3xl font-bold text-slate-900 focus:outline-none focus:ring-0 placeholder:text-slate-400"
            placeholder="My groceries"
          />

          <p className="text-sm text-slate-700">
            A clean, soft layout inspired by mobile todo apps.
          </p>
        </section>

        {/* Phone-like card */}
        <section
          className="rounded-[32px] border border-purple-200 shadow-lg shadow-purple-200/50 p-4 transform transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
          style={{
            background: `
              radial-gradient(circle at top right, rgba(255,255,255,0.4), transparent),
              linear-gradient(135deg, #C7B7FF 0%, #FFB6D9 100%)
            `,
          }}
        >
          {/* small top bar */}
          <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
            <span>To Do List</span>
            <span>{initialGroceries.filter(t => t.done).length} / {initialGroceries.length}</span>
          </div>

          {/* Add Task */}
          <div className="rounded-2xl bg-[#F7F3FF]/70 border border-purple-100 px-3 py-2 mb-3 text-xs text-slate-400">
            + Add a task…
          </div>

          {/* Actual todo list */}
          <TodoList
            variant="light"
            templateId="minimal"
            showNotes={false}
            showPriority={false}
            checkboxClassName="circle"
            enablePinned={false}
            showCategories={false}
            showSubtasks={false}
            initialTodos={initialGroceries}  //preload groceries!
          />
        </section>
      </div>
    </main>
  );
}
