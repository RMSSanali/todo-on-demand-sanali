// apps-web/data/checklistTemplates.ts

export type ChecklistCategory = "daily" | "weekly" | "study" | "work" | "health";

export type ChecklistTemplate = {
  id: string;
  name: string;
  category: ChecklistCategory;
  description?: string;
  items: string[];
};

export const CHECKLIST_TEMPLATES: ChecklistTemplate[] = [
  {
    id: "morning-routine",
    name: "Morning Routine",
    category: "daily",
    description: "Start your day with focus and energy.",
    items: [
      "Wake up and make the bed",
      "Drink a glass of water",
      "5–10 minutes stretching",
      "Plan today’s top 3 tasks",
      "Check calendar & meetings",
      "Healthy breakfast",
    ],
  },
  {
    id: "study-checklist",
    name: "Study Checklist",
    category: "study",
    description: "Perfect for focused study sessions.",
    items: [
      "Set a clear study goal",
      "Prepare notes and material",
      "Turn off distractions (phone, notifications)",
      "25–50 minutes deep focus",
      "5–10 minutes break",
      "Quick review of what you learned",
    ],
  },
  {
    id: "gym-plan",
    name: "Gym Plan",
    category: "health",
    description: "Simple gym structure for the day.",
    items: [
      "5–10 minutes warm-up",
      "Lower body exercises",
      "Upper body exercises",
      "Core exercises",
      "Cool down & stretching",
      "Log your workout",
    ],
  },
  {
    id: "project-planning",
    name: "Project Planning Checklist",
    category: "work",
    description: "For planning a new project or task.",
    items: [
      "Define project goal",
      "List main tasks / milestones",
      "Estimate time for each task",
      "Assign priorities",
      "Set deadlines",
      "Review and adjust plan",
    ],
  },
];
