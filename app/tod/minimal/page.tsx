// TOD/tod/apps-web/app/tod/app/minimal/page.tsx
import { TodoList } from "@/components/todo/TodoList";

export default function MinimalTemplatePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[radial-gradient(circle_at_top,_#f4f0ff,_#fdf7ff)] text-foreground flex justify-center">
      <div className="w-full max-w-md px-4 py-10">
        <section className="mb-6 space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
            Template · Minimalist
          </p>
          <h1 className="text-3xl font-bold text-slate-900">Groceries</h1>
          <p className="text-sm text-slate-500">
            A clean, soft layout inspired by mobile todo apps.
          </p>
        </section>

        {/* Phone-like card */}
        <section className="rounded-[32px] border border-purple-100 bg-white/90 shadow-lg shadow-purple-100/50 p-4">
          {/* small top bar like in the design */}
          <div className="flex items-center justify-between mb-4 text-xs text-slate-400">
            <span>To Do List</span>
            <span>5 / 9</span>
          </div>

          <div className="rounded-2xl bg-[#F7F3FF]/70 border border-purple-100 px-3 py-2 mb-3 text-xs text-slate-400">
            + Add a task…
          </div>

          {/* Actual todo list */}
          <TodoList variant="light" />
        </section>
      </div>
    </main>
  );
}
