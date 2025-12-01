"use client";

import { useMemo, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type ProjectCategory = "Work" | "Personal" | "School";

type Project = {
  id: number;
  name: string;
  category: ProjectCategory;
  tasksDone: number;
  tasksTotal: number;
  due?: string;
};

type DayTask = {
  id: number;
  time: string;
  label: string;
  category: ProjectCategory;
};

const initialProjects: Project[] = [
  {
    id: 1,
    name: "Lawline Internship – Checklist App",
    category: "Work",
    tasksDone: 6,
    tasksTotal: 10,
    due: "Mon",
  },
  {
    id: 2,
    name: "AZ-104 Study Plan",
    category: "School",
    tasksDone: 3,
    tasksTotal: 8,
    due: "Thu",
  },
  {
    id: 3,
    name: "Did You Know Daily – Content",
    category: "Personal",
    tasksDone: 4,
    tasksTotal: 12,
    due: "Sun",
  },
  {
    id: 4,
    name: "TomatoPizza – Order Feature",
    category: "School",
    tasksDone: 2,
    tasksTotal: 6,
    due: "Next week",
  },
  {
    id: 5,
    name: "Etsy – Digital Tracker Launch",
    category: "Personal",
    tasksDone: 1,
    tasksTotal: 5,
    due: "This month",
  },
];

const initialTodayTasks: DayTask[] = [
  {
    id: 1,
    time: "10:00",
    label: "Team standup – Internship",
    category: "Work",
  },
  {
    id: 2,
    time: "12:00",
    label: "Code session – Project templates",
    category: "Work",
  },
  {
    id: 3,
    time: "14:00",
    label: "Study block – AZ-104",
    category: "School",
  },
  {
    id: 4,
    time: "19:00",
    label: "Content ideas – Did You Know Daily",
    category: "Personal",
  },
];

// Demo data for the area chart
const weeklyProgressData = [
  { day: "Mon", done: 5 },
  { day: "Tue", done: 7 },
  { day: "Wed", done: 4 },
  { day: "Thu", done: 9 },
  { day: "Fri", done: 6 },
  { day: "Sat", done: 3 },
  { day: "Sun", done: 4 },
];

function getCategoryBadgeStyle(category: ProjectCategory) {
  switch (category) {
    case "Work":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "Personal":
      return "bg-pink-100 text-pink-700 border-pink-200";
    case "School":
      return "bg-emerald-100 text-emerald-700 border-emerald-200";
    default:
      return "";
  }
}

export default function ProjectsDashboardPage() {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  // Project modal state (create + edit)
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<ProjectCategory>("Work");
  const [newTasksTotal, setNewTasksTotal] = useState(5);
  const [newDue, setNewDue] = useState("");

  // Today's tasks + modal state (create + edit)
  const [todayTasks, setTodayTasks] = useState<DayTask[]>(initialTodayTasks);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<DayTask | null>(null);
  const [newTaskTime, setNewTaskTime] = useState("");
  const [newTaskLabel, setNewTaskLabel] = useState("");
  const [newTaskCategory, setNewTaskCategory] =
    useState<ProjectCategory>("Work");

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter, projects]);

  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.tasksDone < p.tasksTotal)
    .length;
  const completedProjects = projects.filter(
    (p) => p.tasksDone >= p.tasksTotal
  ).length;

  const totalTasksDone = projects.reduce((sum, p) => sum + p.tasksDone, 0);
  const totalTasks = projects.reduce((sum, p) => sum + p.tasksTotal, 0);
  const overallProgress =
    totalTasks === 0 ? 0 : Math.round((totalTasksDone / totalTasks) * 100);

  // ---------- PROJECT HANDLERS ----------

  const openCreateProjectModal = () => {
    setEditingProject(null);
    setNewName("");
    setNewCategory("Work");
    setNewTasksTotal(5);
    setNewDue("");
    setProjectModalOpen(true);
  };

  const openEditProjectModal = (project: Project) => {
    setEditingProject(project);
    setNewName(project.name);
    setNewCategory(project.category);
    setNewTasksTotal(project.tasksTotal);
    setNewDue(project.due ?? "");
    setProjectModalOpen(true);
  };

  const handleCreateOrUpdateProject = () => {
    if (!newName.trim()) return;

    const safeTasksTotal =
      Number.isFinite(newTasksTotal) && newTasksTotal > 0
        ? newTasksTotal
        : 1;

    if (editingProject) {
      // UPDATE
      setProjects((prev) =>
        prev.map((p) =>
          p.id === editingProject.id
            ? {
                ...p,
                name: newName.trim(),
                category: newCategory,
                tasksTotal: safeTasksTotal,
                due: newDue.trim() || undefined,
              }
            : p
        )
      );
    } else {
      // CREATE
      const newProject: Project = {
        id: projects.length ? Math.max(...projects.map((p) => p.id)) + 1 : 1,
        name: newName.trim(),
        category: newCategory,
        tasksDone: 0,
        tasksTotal: safeTasksTotal,
        due: newDue.trim() || undefined,
      };

      setProjects((prev) => [newProject, ...prev]);
    }

    // Reset + close
    setEditingProject(null);
    setNewName("");
    setNewCategory("Work");
    setNewTasksTotal(5);
    setNewDue("");
    setProjectModalOpen(false);
  };

  const handleDeleteProject = (id: number) => {
    const ok =
      typeof window !== "undefined"
        ? window.confirm("Delete this project?")
        : true;

    if (!ok) return;

    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  // ---------- TASK HANDLERS ----------

  const openCreateTaskModal = () => {
    setEditingTask(null);
    setNewTaskTime("");
    setNewTaskLabel("");
    setNewTaskCategory("Work");
    setTaskModalOpen(true);
  };

  const openEditTaskModal = (task: DayTask) => {
    setEditingTask(task);
    setNewTaskTime(task.time === "—" ? "" : task.time);
    setNewTaskLabel(task.label);
    setNewTaskCategory(task.category);
    setTaskModalOpen(true);
  };

  const handleCreateOrUpdateTask = () => {
    if (!newTaskLabel.trim()) return;

    const time = newTaskTime.trim() || "—";

    if (editingTask) {
      // UPDATE
      setTodayTasks((prev) =>
        prev.map((t) =>
          t.id === editingTask.id
            ? {
                ...t,
                time,
                label: newTaskLabel.trim(),
                category: newTaskCategory,
              }
            : t
        )
      );
    } else {
      // CREATE
      const newTask: DayTask = {
        id: todayTasks.length
          ? Math.max(...todayTasks.map((t) => t.id)) + 1
          : 1,
        time,
        label: newTaskLabel.trim(),
        category: newTaskCategory,
      };

      setTodayTasks((prev) => [...prev, newTask]);
    }

    // Reset + close
    setEditingTask(null);
    setNewTaskTime("");
    setNewTaskLabel("");
    setNewTaskCategory("Work");
    setTaskModalOpen(false);
  };

  const handleDeleteTask = (id: number) => {
    const ok =
      typeof window !== "undefined"
        ? window.confirm("Delete this task?")
        : true;

    if (!ok) return;

    setTodayTasks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Dashboard · Projects & Categories
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">
            Projects overview
          </h1>
          <p className="text-sm text-muted-foreground">
            See all your Work, Personal, and School projects in one clean view.
          </p>
        </div>
        <div className="flex gap-2">
          {/* Add / Edit Project Modal */}
          <Dialog
            open={projectModalOpen}
            onOpenChange={(open) => {
              setProjectModalOpen(open);
              if (!open) {
                setEditingProject(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                onClick={openCreateProjectModal}
              >
                Add project
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit project" : "Add a new project"}
                </DialogTitle>
              </DialogHeader>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateOrUpdateProject();
                }}
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Project name
                  </label>
                  <Input
                    placeholder="Example: Lawline LIA – Checklist demo"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Category
                  </label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newCategory}
                    onChange={(e) =>
                      setNewCategory(e.target.value as ProjectCategory)
                    }
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="School">School</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Number of tasks (estimate)
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={newTasksTotal}
                    onChange={(e) =>
                      setNewTasksTotal(parseInt(e.target.value || "1", 10))
                    }
                  />
                  <p className="text-[11px] text-muted-foreground">
                    This is just for the progress bar. You can adjust later.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Due (optional)
                  </label>
                  <Input
                    placeholder="Mon, This week, 31 Dec..."
                    value={newDue}
                    onChange={(e) => setNewDue(e.target.value)}
                  />
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setProjectModalOpen(false);
                      setEditingProject(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    {editingProject ? "Save changes" : "Create project"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Add / Edit Today’s Task Modal */}
          <Dialog
            open={taskModalOpen}
            onOpenChange={(open) => {
              setTaskModalOpen(open);
              if (!open) {
                setEditingTask(null);
              }
            }}
          >
            <DialogTrigger asChild>
              <Button size="sm" onClick={openCreateTaskModal}>
                Add today&apos;s task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingTask ? "Edit task" : "Add a task for today"}
                </DialogTitle>
              </DialogHeader>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreateOrUpdateTask();
                }}
              >
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Time (optional)
                  </label>
                  <Input
                    placeholder="10:00, 14:30..."
                    value={newTaskTime}
                    onChange={(e) => setNewTaskTime(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Task
                  </label>
                  <Input
                    placeholder="Example: Fix Project dashboard UI"
                    value={newTaskLabel}
                    onChange={(e) => setNewTaskLabel(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Category
                  </label>
                  <select
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newTaskCategory}
                    onChange={(e) =>
                      setNewTaskCategory(e.target.value as ProjectCategory)
                    }
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="School">School</option>
                  </select>
                </div>

                <DialogFooter className="pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setTaskModalOpen(false);
                      setEditingTask(null);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    {editingTask ? "Save changes" : "Add task"}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Top stats */}
      <section className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Total projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{totalProjects}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Active projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">{activeProjects}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Working projects (not finished yet)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              Overall progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm font-medium">{overallProgress}% done</p>
            <Progress value={overallProgress} className="h-2" />
            <p className="text-[11px] text-muted-foreground">
              {totalTasksDone} / {totalTasks} tasks completed
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Weekly progress chart */}
      <section>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Tasks completed this week
            </CardTitle>
          </CardHeader>
          <CardContent className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyProgressData}
                margin={{ left: -20, right: 0, top: 10, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  width={30}
                />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{ fontSize: 12 }}
                />
                <Area
                  type="monotone"
                  dataKey="done"
                  stroke="currentColor"
                  fill="currentColor"
                  className="text-primary/60"
                />
              </AreaChart>
            </ResponsiveContainer>
            <p className="mt-2 text-[11px] text-muted-foreground">
              Demo data for now – shows how your weekly task completion could look.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Main layout: projects + today tasks */}
      <section className="grid gap-6 lg:grid-cols-[2fr,1.2fr]">
        {/* Left: Projects list */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <Tabs
              defaultValue="all"
              className="w-full md:w-auto"
              onValueChange={(value) =>
                setFilter(value as "all" | ProjectCategory)
              }
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="Work">Work</TabsTrigger>
                <TabsTrigger value="Personal">Personal</TabsTrigger>
                <TabsTrigger value="School">School</TabsTrigger>
              </TabsList>
            </Tabs>
            <p className="hidden text-xs text-muted-foreground md:block">
              Showing {filteredProjects.length} project
              {filteredProjects.length === 1 ? "" : "s"}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {filteredProjects.map((project) => {
              const progress =
                project.tasksTotal === 0
                  ? 0
                  : Math.round(
                      (project.tasksDone / project.tasksTotal) * 100
                    );

              return (
                <Card
                  key={project.id}
                  className="flex flex-col justify-between border border-border/60 hover:border-primary/60 transition-colors"
                >
                  <CardHeader className="space-y-2 pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <CardTitle className="text-sm font-semibold leading-snug">
                        {project.name}
                      </CardTitle>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-[11px]"
                          onClick={() => openEditProjectModal(project)}
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-[11px]"
                          onClick={() => handleDeleteProject(project.id)}
                        >
                          🗑
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getCategoryBadgeStyle(
                          project.category
                        )}`}
                      >
                        {project.category}
                      </Badge>
                      {project.due && (
                        <span className="text-[11px] text-muted-foreground">
                          Due: {project.due}
                        </span>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>
                        {project.tasksDone}/{project.tasksTotal} tasks done
                      </span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Right: Today's tasks timeline */}
        <Card className="h-full">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-sm">
              <span>Today&apos;s tasks</span>
              <span className="text-[11px] font-normal text-muted-foreground">
                {todayTasks.length} scheduled
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {todayTasks.map((task) => {
              const badgeStyle = getCategoryBadgeStyle(task.category);

              return (
                <div
                  key={task.id}
                  className="flex items-start gap-3 rounded-xl border border-border/60 p-2.5 text-xs"
                >
                  <div className="mt-0.5 w-12 text-[11px] font-medium text-muted-foreground">
                    {task.time}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium leading-snug">
                        {task.label}
                      </p>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-[10px]"
                          onClick={() => openEditTaskModal(task)}
                        >
                          ✏️
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-[10px]"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          🗑
                        </Button>
                      </div>
                    </div>
                    <Badge
                      variant="outline"
                      className={`text-[10px] px-2 py-0.5 rounded-full border ${badgeStyle}`}
                    >
                      {task.category}
                    </Badge>
                  </div>
                </div>
              );
            })}
            <p className="text-[11px] text-muted-foreground pt-1">
              Colored tags show which project category the task belongs to.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
