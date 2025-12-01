// TOD/tod/apps-web/app/tod/premade/page.tsx
"use client";

import { useMemo, useState } from "react";
import {
  CHECKLIST_TEMPLATES,
  ChecklistCategory,
  ChecklistTemplate,
} from "@/data/checklistTemplates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

const CATEGORY_FILTERS: { value: ChecklistCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "daily", label: "Daily" },
  { value: "study", label: "Study" },
  { value: "work", label: "Work" },
  { value: "weekly", label: "Weekly" },
  { value: "health", label: "Health" },
];

export default function PremadeChecklistsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    ChecklistCategory | "all"
  >("all");
  const [previewTemplate, setPreviewTemplate] =
    useState<ChecklistTemplate | null>(null);

  const templates = useMemo(
    () =>
      selectedCategory === "all"
        ? CHECKLIST_TEMPLATES
        : CHECKLIST_TEMPLATES.filter(
            (t) => t.category === selectedCategory
          ),
    [selectedCategory]
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Premade Checklists
        </p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Start faster with ready-made checklist templates
        </h1>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Browse professional checklists for morning routines, study, work and
          more. Preview a template, then import it into your own todo list in
          seconds.
        </p>
      </header>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        {CATEGORY_FILTERS.map((cat) => (
          <Button
            key={cat.value}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.value as any)}
            className="text-xs"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Gallery */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="flex flex-col justify-between border-muted-foreground/10 hover:border-primary/40 transition"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-sm font-semibold">
                  {template.name}
                </CardTitle>
                <Badge variant="outline" className="text-[10px]">
                  {template.category}
                </Badge>
              </div>
              {template.description && (
                <CardDescription className="text-xs mt-1">
                  {template.description}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="pb-2">
              <p className="text-[11px] text-muted-foreground mb-1">
                Includes {template.items.length} steps.
              </p>
              <ul className="text-[11px] text-muted-foreground space-y-1">
                {template.items.slice(0, 3).map((item, i) => (
                  <li key={i} className="line-clamp-1">
                    • {item}
                  </li>
                ))}
                {template.items.length > 3 && (
                  <li className="text-[11px] italic text-muted-foreground">
                    + more steps…
                  </li>
                )}
              </ul>
            </CardContent>

            <CardFooter className="pt-0">
              <Button
                size="sm"
                className="w-full text-xs"
                variant="outline"
                onClick={() => setPreviewTemplate(template)}
              >
                Preview checklist
              </Button>
            </CardFooter>
          </Card>
        ))}

        {templates.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No templates in this category yet.
          </p>
        )}
      </section>

      {/* Preview dialog */}
      <Dialog
        open={!!previewTemplate}
        onOpenChange={(open) => !open && setPreviewTemplate(null)}
      >
        <DialogContent className="max-w-md">
          {previewTemplate && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between gap-2">
                  <span>{previewTemplate.name}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {previewTemplate.category}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-3">
                {previewTemplate.description && (
                  <p className="text-sm text-muted-foreground">
                    {previewTemplate.description}
                  </p>
                )}

                <ScrollArea className="h-52 rounded-md border p-3">
                  <ol className="list-decimal pl-4 space-y-1 text-sm">
                    {previewTemplate.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ol>
                </ScrollArea>

                {/* Open Builder where real import happens */}
                <Button
                  asChild
                  size="sm"
                  className="w-full"
                  variant="default"
                >
                  <Link href="/tod/builder">
                    Open in TOD Builder
                  </Link>
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
