// TOD/tod/apps-web/app/tod/emoji-checklists/page.tsx
import { EmojiGallery } from "@/components/emoji-checklist/EmojiGallery";

export default function EmojiChecklistsPage() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-16">
      <section className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
            Emoji Checklists
          </h1>
          <p className="mt-2 text-sm md:text-base text-muted-foreground">
            Make your tasks fun, colorful, and friendly with emoji-based templates ✨
          </p>
        </header>

        <EmojiGallery />
      </section>
    </main>
  );
}
