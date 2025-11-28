// TOD/tod/apps-web/app/tod/app/minimal/page.tsx

export default function MinimalTemplatePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-4">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-card-foreground/60">
            Template · Minimalist
          </p>
          <h1 className="text-3xl font-bold">Minimalist TOD</h1>
          <p className="text-sm md:text-base text-card-foreground/70">
            This page will show your minimalist todo layout using the shared
            todo engine. Soon we&apos;ll plug in the real TodoList component here.
          </p>
        </header>

        <section className="mt-6 border border-border rounded-xl bg-card/90 p-6 text-sm text-card-foreground/80">
          <p>
            Placeholder: here we will render the real <code>TodoList</code>{" "}
            component from your existing todo feature.
          </p>
        </section>
      </div>
    </main>
  );
}
