// TOD/tod/apps-web/components/builder/PremadeChecklistPicker.tsx
"use client";

import { useMemo, useState } from "react";
import {
  CHECKLIST_TEMPLATES,
  ChecklistCategory,
  ChecklistTemplate,
} from "@/data/checklistTemplates";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

const CATEGORY_FILTERS: { value: ChecklistCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "daily", label: "Daily" },
  { value: "study", label: "Study" },
  { value: "work", label: "Work" },
  { value: "weekly", label: "Weekly" },
  { value: "health", label: "Health" },
];

type PremadeChecklistPickerProps = {
  onImport: (template: ChecklistTemplate) => Promise<void> | void;
  isImporting?: boolean;
};

export function PremadeChecklistPicker({
  onImport,
  isImporting = false,
}: PremadeChecklistPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<ChecklistCategory | "all">("all");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);

  const templates = useMemo(
    () =>
      selectedCategory === "all"
        ? CHECKLIST_TEMPLATES
        : CHECKLIST_TEMPLATES.filter((t) => t.category === selectedCategory),
    [selectedCategory]
  );

  const selectedTemplate =
    templates.find((t) => t.id === selectedTemplateId) ?? templates[0] ?? null;

  return (
    <div className="space-y-4 rounded-2xl border border-border bg-card/70 p-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Premade checklists
        </h3>
        <Badge variant="outline" className="text-[10px] uppercase tracking-wide">
          New
        </Badge>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORY_FILTERS.map((cat) => (
          <Button
            key={cat.value}
            type="button"
            variant={selectedCategory === cat.value ? "default" : "outline"}
            size="sm"
            className="text-[11px] px-2 py-1"
            onClick={() => setSelectedCategory(cat.value as any)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      <div className="grid gap-3 grid-cols-1">
        <ScrollArea className="h-40 rounded-xl border bg-background/60 p-2">
          <div className="space-y-1.5">
            {templates.map((template) => (
              <button
                key={template.id}
                type="button"
                onClick={() => setSelectedTemplateId(template.id)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-xs transition hover:bg-muted ${
                  selectedTemplate?.id === template.id ? "border-primary" : "border-border"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-medium">{template.name}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {template.category}
                  </Badge>
                </div>
                {template.description && (
                  <p className="mt-1 line-clamp-2 text-[11px] text-muted-foreground">
                    {template.description}
                  </p>
                )}
              </button>
            ))}

            {templates.length === 0 && (
              <p className="text-[11px] text-muted-foreground">
                No templates in this category yet.
              </p>
            )}
          </div>
        </ScrollArea>

        {/* Preview + Import */}
        <div className="rounded-xl border bg-background/60 p-3 text-xs space-y-2">
          <p className="text-[11px] font-semibold text-muted-foreground">Preview</p>

          {selectedTemplate ? (
            <>
              <p className="text-sm font-medium">{selectedTemplate.name}</p>
              {selectedTemplate.description && (
                <p className="text-[11px] text-muted-foreground">
                  {selectedTemplate.description}
                </p>
              )}

              <ul className="mt-1 list-disc pl-4 space-y-0.5 text-[11px] text-muted-foreground">
                {selectedTemplate.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-[11px] text-muted-foreground">
              Choose a checklist on the left to see the steps here.
            </p>
          )}

          <Button
            type="button"
            size="sm"
            className="mt-2 w-full"
            disabled={!selectedTemplate || isImporting}
            onClick={() => {
              if (selectedTemplate) onImport(selectedTemplate);
            }}
          >
            {isImporting ? "Importing..." : "Import into this template"}
          </Button>
          <p className="text-[10px] text-muted-foreground">
            This will create real todos using your current layout.
          </p>
        </div>
      </div>
    </div>
  );
}
