// apps-web/store/builder-store.ts
import { create } from "zustand";
import type {
  EmojiTemplateImportPayload,
} from "@/components/emoji-checklist/EmojiTemplatePreviewDialog";
import type { EmojiChecklistItem } from "@/components/emoji-checklist/EmojiChecklistList";

export type EmojiChecklist = {
  id: string; // unique id inside Builder
  templateId: string;
  title: string;
  emoji: string;
  items: EmojiChecklistItem[];
  createdAt: string;
};

type BuilderState = {
  emojiChecklists: EmojiChecklist[];

  addEmojiChecklistFromTemplate: (
    payload: EmojiTemplateImportPayload
  ) => void;

  clearEmojiChecklists: () => void;
  removeEmojiChecklist: (id: string) => void;
  addEmojiItemToChecklist: (checklistId: string, label: string) => void;
};

export const useBuilderStore = create<BuilderState>((set) => ({
  emojiChecklists: [],

  addEmojiChecklistFromTemplate: (payload) =>
    set((state) => {
      const { template, items } = payload;

      const newChecklist: EmojiChecklist = {
        id: `${template.id}-${Date.now()}`,
        templateId: template.id,
        title: template.title,
        emoji: template.emoji,
        items,
        createdAt: new Date().toISOString(),
      };

      return {
        emojiChecklists: [...state.emojiChecklists, newChecklist],
      };
    }),

  clearEmojiChecklists: () => set({ emojiChecklists: [] }),

  removeEmojiChecklist: (id) =>
    set((state) => ({
      emojiChecklists: state.emojiChecklists.filter(
        (checklist) => checklist.id !== id
      ),
    })),

  addEmojiItemToChecklist: (checklistId, label) =>
    set((state) => ({
      emojiChecklists: state.emojiChecklists.map((checklist) => {
        if (checklist.id !== checklistId) return checklist;

        const newItem: EmojiChecklistItem = {
          id: `custom-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)}`,
          emoji: checklist.emoji,
          label,
        };

        return {
          ...checklist,
          items: [...checklist.items, newItem],
        };
      }),
    })),
}));
