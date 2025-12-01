// apps-web/components/emoji-checklist/EmojiTemplatePreviewDialog.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { EmojiTemplate } from "./EmojiGallery";
import {
  EmojiChecklistList,
  type EmojiChecklistItem,
} from "./EmojiChecklistList";

export type EmojiTemplateImportPayload = {
  template: EmojiTemplate;
  items: EmojiChecklistItem[];
};


type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: EmojiTemplate;
  onImport: (payload: EmojiTemplateImportPayload) => void;
};

// simple example tasks per template
const TEMPLATE_ITEMS: Record<string, EmojiChecklistItem[]> = {
  "work-morning-boost": [
    { id: "drink", emoji: "☕", label: "Make a drink and clear your desk" },
    {
      id: "review-priorities",
      emoji: "📅",
      label: "Review today’s top priorities",
    },
    { id: "emails", emoji: "📧", label: "Scan only urgent emails" },
    { id: "top3", emoji: "✅", label: "Pick your top 3 tasks" },
    { id: "music", emoji: "🎧", label: "Put on focus music" },
    {
      id: "distractions",
      emoji: "🚫",
      label: "Close distracting tabs & apps",
    },
  ],

  "work-starter-pack": [
    { id: "inbox", emoji: "📥", label: "Clear inbox to 0–10 emails" },
    { id: "calendar", emoji: "🧾", label: "Check calendar & meetings" },
    { id: "deep-work", emoji: "🧠", label: "Block time for deep work" },
    {
      id: "messages",
      emoji: "💬",
      label: "Reply to important messages",
    },
    { id: "board", emoji: "📌", label: "Update your task board" },
  ],

  "work-inbox-zero": [
    {
      id: "newsletters",
      emoji: "🧹",
      label: "Archive old newsletters",
    },
    { id: "flag", emoji: "⚠️", label: "Flag emails that need action" },
    { id: "tasks", emoji: "📝", label: "Turn emails into tasks" },
    {
      id: "unsubscribe",
      emoji: "📦",
      label: "Unsubscribe from low-value lists",
    },
    { id: "zero", emoji: "✅", label: "Reach inbox zero" },
  ],

  "study-warmup": [
    { id: "open-notes", emoji: "📖", label: "Open textbook or notes" },
    { id: "topic", emoji: "📌", label: "Choose today’s topic" },
    { id: "timer", emoji: "⏱️", label: "Set a 25-minute timer" },
    { id: "questions", emoji: "✍️", label: "Write 3 key questions" },
    { id: "phone", emoji: "📵", label: "Put your phone away" },
  ],

  "study-deep-focus": [
    { id: "playlist", emoji: "🎧", label: "Put on focus playlist" },
    { id: "goal", emoji: "🎯", label: "Define one clear study goal" },
    { id: "focus1", emoji: "⏱️", label: "Do a 25-minute focus sprint" },
    { id: "break", emoji: "☕", label: "Take a 5-minute break" },
    { id: "repeat", emoji: "🔁", label: "Repeat 2–3 focus cycles" },
    { id: "summary", emoji: "📝", label: "Write a quick summary" },
  ],

  "study-revision": [
    { id: "review", emoji: "📚", label: "Review previous notes" },
    {
      id: "self-test",
      emoji: "❓",
      label: "Test yourself with questions",
    },
    {
      id: "explain",
      emoji: "🧠",
      label: "Explain topic in your own words",
    },
    {
      id: "mini-summary",
      emoji: "✍️",
      label: "Write a mini summary",
    },
    { id: "weak", emoji: "🔁", label: "Repeat weak areas" },
    {
      id: "plan",
      emoji: "📅",
      label: "Plan next revision session",
    },
    { id: "done", emoji: "✅", label: "Mark topic as reviewed" },
    {
      id: "break2",
      emoji: "😌",
      label: "Take a short mindful break",
    },
  ],

  "fitness-warmup": [
    {
      id: "walk",
      emoji: "🚶",
      label: "5 minutes of light walking",
    },
    {
      id: "leg-swings",
      emoji: "🦵",
      label: "Do gentle leg swings",
    },
    { id: "arm-circles", emoji: "🌀", label: "Do arm circles" },
    { id: "stretch", emoji: "🧘", label: "Light stretching" },
  ],

  "fitness-gym-power": [
    { id: "warmup", emoji: "🏋️", label: "5-minute gym warm-up" },
    {
      id: "main1",
      emoji: "🏋️‍♀️",
      label: "Main lift – first set",
    },
    {
      id: "main2",
      emoji: "🏋️‍♂️",
      label: "Main lift – second set",
    },
    {
      id: "accessory",
      emoji: "💪",
      label: "One accessory exercise",
    },
    { id: "water", emoji: "💧", label: "Drink water" },
    {
      id: "log",
      emoji: "📓",
      label: "Log your workout result",
    },
  ],

  "fitness-stretch-calm": [
    {
      id: "neck",
      emoji: "🧘",
      label: "Neck and shoulder stretch",
    },
    {
      id: "hamstring",
      emoji: "🦵",
      label: "Hamstring stretch",
    },
    { id: "calf", emoji: "🦶", label: "Calf stretch" },
    {
      id: "breathing",
      emoji: "🧘",
      label: "2 minutes of deep breathing",
    },
    {
      id: "relax",
      emoji: "😌",
      label: "Relax and reflect on your day",
    },
  ],
};

export function EmojiTemplatePreviewDialog({
  open,
  onOpenChange,
  template,
  onImport,
}: Props) {
  const items = TEMPLATE_ITEMS[template.id] ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md md:max-w-lg rounded-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg md:text-xl">
            <span className="text-3xl">{template.emoji}</span>
            <span>{template.title}</span>
          </DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            {template.subtitle}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-64 rounded-xl border bg-muted/40 p-3 md:p-4">
          <EmojiChecklistList items={items} />
        </ScrollArea>

        <DialogFooter className="flex w-full flex-col gap-2 md:flex-row md:justify-between">
          <Button
            type="button"
            variant="outline"
            className="w-full md:w-auto"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button
            type="button"
            className="w-full md:w-auto"
            onClick={() =>
              onImport({
                template,
                items,
              })
            }
          >
            Import this checklist
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

