// apps-web/components/emoji-checklist/EmojiTemplateCard.tsx
"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { EmojiTemplate } from "./EmojiGallery";

type Props = {
  template: EmojiTemplate;
  onPreview: (template: EmojiTemplate) => void;
};

export function EmojiTemplateCard({ template, onPreview }: Props) {
  const handlePreview = () => {
    onPreview(template);
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
    >
      <Card
        className="h-full cursor-pointer rounded-2xl border border-border/60 bg-gradient-to-br from-muted/70 to-background/90 p-4 shadow-sm hover:shadow-md transition-shadow"
        onClick={handlePreview}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-3">
            <div className="text-3xl md:text-4xl leading-none">
              {template.emoji}
            </div>
            <span className="text-[11px] md:text-xs text-muted-foreground">
              {template.taskCount} tasks
            </span>
          </div>

          <div className="space-y-1 mb-4">
            <h3 className="text-sm md:text-base font-medium leading-tight">
              {template.title}
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
              {template.subtitle}
            </p>
          </div>

          <div className="mt-auto pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full rounded-full text-xs md:text-sm"
              onClick={(e) => {
                e.stopPropagation();
                handlePreview();
              }}
            >
              Preview &amp; import
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
