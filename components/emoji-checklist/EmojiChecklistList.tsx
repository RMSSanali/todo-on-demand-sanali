// apps-web/components/emoji-checklist/EmojiChecklistList.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type EmojiChecklistItem = {
  id: string;
  emoji: string;
  label: string;
};

type Props = {
  items: EmojiChecklistItem[];
  onChangeCheckedIds?: (ids: string[]) => void;
};

export function EmojiChecklistList({ items, onChangeCheckedIds }: Props) {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCheckedIds((prev) => {
      const isChecked = prev.includes(id);
      const next = isChecked ? prev.filter((x) => x !== id) : [...prev, id];
      onChangeCheckedIds?.(next);
      return next;
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item) => {
        const isChecked = checkedIds.includes(item.id);

        return (
          <motion.button
            key={item.id}
            type="button"
            layout
            onClick={() => toggleItem(item.id)}
            whileTap={{ scale: 0.97 }}
            animate={{
              scale: isChecked ? 1.02 : 1,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
              "flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left text-xs md:text-sm shadow-sm",
              "bg-background/90 hover:bg-muted/70",
              isChecked &&
                "border-primary/70 bg-primary/5 shadow-[0_0_0_1px_rgba(129,140,248,0.25)]"
            )}
          >
            {/* Emoji with subtle bounce / tilt */}
            <motion.span
              className="flex h-8 w-8 items-center justify-center rounded-2xl text-xl md:text-2xl"
              animate={{
                y: isChecked ? -2 : 0,
                rotate: isChecked ? 2 : 0,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              {item.emoji}
            </motion.span>

            <span
              className={cn(
                "flex-1",
                isChecked && "line-through text-muted-foreground"
              )}
            >
              {item.label}
            </span>

            {/* Check pill with pop animation */}
            <motion.span
              className={cn(
                "inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px]",
                isChecked
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/40 text-muted-foreground/70"
              )}
              animate={{ scale: isChecked ? 1.1 : 1 }}
            >
              {isChecked ? "✓" : ""}
            </motion.span>
          </motion.button>
        );
      })}
    </div>
  );
}
