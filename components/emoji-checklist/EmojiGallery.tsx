// apps-web/components/emoji-checklist/EmojiGallery.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EmojiTemplateCard } from "./EmojiTemplateCard";
import {
  EmojiTemplatePreviewDialog,
  type EmojiTemplateImportPayload,
} from "./EmojiTemplatePreviewDialog";
import { useBuilderStore } from "@/store/builder-store";

export type EmojiCategory = "work" | "study" | "fitness";

export type EmojiTemplate = {
  id: string;
  category: EmojiCategory;
  emoji: string;
  title: string;
  subtitle: string;
  taskCount: number;
};

const TEMPLATES: EmojiTemplate[] = [
  // 🎓 WORK
  {
    id: "work-morning-boost",
    category: "work",
    emoji: "😎",
    title: "Productive Morning Start",
    subtitle: "Kick off your workday with focus",
    taskCount: 6,
  },
  {
    id: "work-starter-pack",
    category: "work",
    emoji: "💼",
    title: "Work Starter Pack",
    subtitle: "Emails, priorities, planning",
    taskCount: 5,
  },
  {
    id: "work-inbox-zero",
    category: "work",
    emoji: "📧",
    title: "Zero Inbox Checklist",
    subtitle: "Clear your email clutter",
    taskCount: 5,
  },

  // 🧠 STUDY
  {
    id: "study-warmup",
    category: "study",
    emoji: "📚",
    title: "Study Warm-Up",
    subtitle: "Prepare your brain for learning",
    taskCount: 5,
  },
  {
    id: "study-deep-focus",
    category: "study",
    emoji: "🧠",
    title: "Deep Focus Routine",
    subtitle: "Perfect for Pomodoro sessions",
    taskCount: 6,
  },
  {
    id: "study-revision",
    category: "study",
    emoji: "✍️",
    title: "Revision Checklist",
    subtitle: "Review key concepts with ease",
    taskCount: 8,
  },

  // 🏋️ FITNESS
  {
    id: "fitness-warmup",
    category: "fitness",
    emoji: "🏃",
    title: "Warm-Up Flow",
    subtitle: "Gentle start before workouts",
    taskCount: 4,
  },
  {
    id: "fitness-gym-power",
    category: "fitness",
    emoji: "💪",
    title: "Gym Power Set",
    subtitle: "Push harder, track progress",
    taskCount: 6,
  },
  {
    id: "fitness-stretch-calm",
    category: "fitness",
    emoji: "🧘",
    title: "Stretch & Calm",
    subtitle: "Cool down and relax the body",
    taskCount: 5,
  },
];

const CATEGORIES: { id: EmojiCategory; label: string; icon: string }[] = [
  { id: "work", label: "Work", icon: "🎓" },
  { id: "study", label: "Study", icon: "🧠" },
  { id: "fitness", label: "Fitness", icon: "🏋️" },
];

export function EmojiGallery() {
  const [activeCategory, setActiveCategory] = useState<EmojiCategory>("work");
  const [selectedTemplate, setSelectedTemplate] = useState<EmojiTemplate | null>(
    null
  );
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // 👉 from Builder store
  const addEmojiChecklistFromTemplate = useBuilderStore(
    (state) => state.addEmojiChecklistFromTemplate
  );

  const visibleTemplates = TEMPLATES.filter(
    (t) => t.category === activeCategory
  );

  const handlePreview = (template: EmojiTemplate) => {
    setSelectedTemplate(template);
    setIsPreviewOpen(true);
  };

  const handleClose = () => {
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
  };

  const handleImport = (payload: EmojiTemplateImportPayload) => {
    // Send to global Builder state
    addEmojiChecklistFromTemplate(payload);

    // Close dialog
    setIsPreviewOpen(false);
    setSelectedTemplate(null);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleClose();
    } else {
      setIsPreviewOpen(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Category tabs */}
      <div className="inline-flex flex-wrap gap-2 rounded-full bg-muted/60 p-1">
        {CATEGORIES.map((cat) => (
          <Button
            key={cat.id}
            type="button"
            variant={activeCategory === cat.id ? "default" : "ghost"}
            size="sm"
            className={cn(
              "rounded-full px-4 py-1.5 text-xs md:text-sm",
              activeCategory !== cat.id &&
                "bg-transparent hover:bg-muted/80"
            )}
            onClick={() => setActiveCategory(cat.id)}
          >
            <span className="mr-1.5">{cat.icon}</span>
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Template grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {visibleTemplates.map((template) => (
          <EmojiTemplateCard
            key={template.id}
            template={template}
            onPreview={handlePreview}
          />
        ))}
      </div>

      {/* Preview dialog */}
      {selectedTemplate && (
        <EmojiTemplatePreviewDialog
          open={isPreviewOpen}
          onOpenChange={handleOpenChange}
          template={selectedTemplate}
          onImport={handleImport}
        />
      )}
    </div>
  );
}
