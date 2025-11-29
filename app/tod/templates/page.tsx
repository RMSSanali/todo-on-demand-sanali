// TOD/tod/apps-web/app/tod/templates/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

const templates = [
  {
    id: "minimal",
    name: "Minimalist",
    emoji: "🧼",
    description: "Clean, distraction-free layout for deep focus.",
    details: ["Single list", "Subtle colors", "Perfect for studying"],
  },
  {
    id: "dark",
    name: "Dark Mode",
    emoji: "🌙",
    description: "Sleek high-contrast layout for late-night work.",
    details: ["Dark background", "Bright accents", "Eye-friendly"],
  },
  {
    id: "project",
    name: "Project-Based",
    emoji: "📂",
    description: "Group tasks by project or category.",
    details: ["Categories", "Tags", "Great for multi-tasking"],
  },
  {
    id: "daily",
    name: "Daily Focus Planner",
    emoji: "📅",
    description: "Plan your top 3 tasks and daily wins.",
    details: ["Today's top 3", "Notes", "Review your day"],
  },
  {
    id: "emoji",
    name: "Emoji Checklist",
    emoji: "✨",
    description: "Playful and motivating task list with emojis.",
    details: ["Emoji-based sections", "Fun & visual", "Great for habits"],
  },
];

// 🔧 Fix broken route `/tod/app/...`
// Map template IDs to REAL ROUTES that exist in your app
function getTemplateHref(id: string) {
  if (id === "minimal") return "/tod/minimal";
  if (id === "dark") return "/tod/dark";

  // For templates without custom pages yet, fallback to builder page
  return "/tod/builder";
}

export default function TodTemplatesPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Page header */}
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-card-foreground/60">
            Templates
          </p>
          <h1 className="text-3xl font-bold">Pick a TOD template</h1>
          <p className="text-sm md:text-base text-card-foreground/70 max-w-2xl">
            Start with a layout that matches your style. All templates use the
            same secure backend and todo engine – only the experience changes.
          </p>
        </header>

        {/* Templates grid */}
        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="flex flex-col justify-between border-border/70 bg-card/90"
            >
              <CardHeader>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{template.emoji}</span>
                  <div>
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="text-xs md:text-sm text-card-foreground/80">
                <ul className="list-disc list-inside space-y-1">
                  {template.details.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="mt-auto pt-2">
                <Button asChild className="w-full">
                  <Link href={getTemplateHref(template.id)}>
                    Use {template.name}
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </section>
      </div>
    </main>
  );
}
