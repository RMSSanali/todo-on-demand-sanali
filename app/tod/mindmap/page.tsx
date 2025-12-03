// TOD/tod/apps-web/app/tod/mindmap/page.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, PanInfo } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const NODE_BASE_SIZE = 140;
const STORAGE_KEY = "sherlock-mindmap-lite-v2";

type NodeShape = "circle" | "rounded" | "pill";

type MindNode = {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  shape: NodeShape;
};

type MindEdge = {
  id: string;
  fromId: string;
  toId: string;
};

type StoredData =
  | {
      nodes: MindNode[];
      edges: MindEdge[];
    }
  | MindNode[]; // backward compatibility (old version)

const COLOR_PALETTE: string[] = [
  "#4ADE80", // green
  "#60A5FA", // blue
  "#FACC15", // yellow
  "#FB923C", // orange
  "#F472B6", // pink
  "#A855F7", // purple
  "#F97373", // red
];

const SHAPES: { value: NodeShape; label: string }[] = [
  { value: "circle", label: "Circle" },
  { value: "rounded", label: "Rounded" },
  { value: "pill", label: "Pill" },
];

function createDefaultNodes(): MindNode[] {
  return [
    {
      id: "1",
      label: "Main Goal",
      x: 320,
      y: 160,
      color: "#60A5FA",
      shape: "circle",
    },
    {
      id: "2",
      label: "Task A",
      x: 120,
      y: 320,
      color: "#4ADE80",
      shape: "rounded",
    },
    {
      id: "3",
      label: "Task B",
      x: 520,
      y: 320,
      color: "#FACC15",
      shape: "pill",
    },
  ];
}

function createDefaultEdges(): MindEdge[] {
  return [
    { id: "e-1-2", fromId: "1", toId: "2" },
    { id: "e-1-3", fromId: "1", toId: "3" },
  ];
}

// 🌟 Sample 1: Study Week
function createSampleStudyMap(): { nodes: MindNode[]; edges: MindEdge[] } {
  const nodes: MindNode[] = [
    {
      id: "center",
      label: "Study Week",
      x: 320,
      y: 120,
      color: "#60A5FA",
      shape: "circle",
    },
    {
      id: "react",
      label: "React Basics",
      x: 120,
      y: 260,
      color: "#4ADE80",
      shape: "rounded",
    },
    {
      id: "ts",
      label: "TypeScript",
      x: 520,
      y: 260,
      color: "#FACC15",
      shape: "rounded",
    },
    {
      id: "backend",
      label: "Backend API",
      x: 120,
      y: 400,
      color: "#FB923C",
      shape: "pill",
    },
    {
      id: "demo",
      label: "Project Demo",
      x: 520,
      y: 400,
      color: "#F472B6",
      shape: "pill",
    },
    {
      id: "rest",
      label: "Rest & Rewards",
      x: 320,
      y: 460,
      color: "#A855F7",
      shape: "circle",
    },
  ];

  const edges: MindEdge[] = [
    { id: "e-center-react", fromId: "center", toId: "react" },
    { id: "e-center-ts", fromId: "center", toId: "ts" },
    { id: "e-center-backend", fromId: "center", toId: "backend" },
    { id: "e-center-demo", fromId: "center", toId: "demo" },
    { id: "e-center-rest", fromId: "center", toId: "rest" },
    { id: "e-react-demo", fromId: "react", toId: "demo" },
    { id: "e-ts-demo", fromId: "ts", toId: "demo" },
    { id: "e-backend-demo", fromId: "backend", toId: "demo" },
    { id: "e-demo-rest", fromId: "demo", toId: "rest" },
  ];

  return { nodes, edges };
}

// 🕵️ Sample 2: Sherlock Case Map
function createSampleSherlockMap(): { nodes: MindNode[]; edges: MindEdge[] } {
  const nodes: MindNode[] = [
    {
      id: "case",
      label: "Mysterious Case",
      x: 320,
      y: 90,
      color: "#0EA5E9",
      shape: "circle",
    },
    {
      id: "victim",
      label: "Victim",
      x: 100,
      y: 200,
      color: "#F97373",
      shape: "rounded",
    },
    {
      id: "crimeScene",
      label: "Crime Scene",
      x: 540,
      y: 200,
      color: "#FACC15",
      shape: "rounded",
    },
    {
      id: "suspectA",
      label: "Suspect A",
      x: 80,
      y: 340,
      color: "#A855F7",
      shape: "pill",
    },
    {
      id: "suspectB",
      label: "Suspect B",
      x: 560,
      y: 340,
      color: "#4ADE80",
      shape: "pill",
    },
    {
      id: "alibi",
      label: "Alibis",
      x: 320,
      y: 280,
      color: "#60A5FA",
      shape: "rounded",
    },
    {
      id: "evidence",
      label: "Key Evidence",
      x: 320,
      y: 420,
      color: "#FB923C",
      shape: "circle",
    },
    {
      id: "timeline",
      label: "Timeline",
      x: 320,
      y: 420,
      color: "#F472B6",
      shape: "pill",
    },
  ];

  const edges: MindEdge[] = [
    { id: "e-case-victim", fromId: "case", toId: "victim" },
    { id: "e-case-scene", fromId: "case", toId: "crimeScene" },
    { id: "e-case-alibi", fromId: "case", toId: "alibi" },
    { id: "e-case-evidence", fromId: "case", toId: "evidence" },
    { id: "e-victim-alibi", fromId: "victim", toId: "alibi" },
    { id: "e-scene-evidence", fromId: "crimeScene", toId: "evidence" },
    { id: "e-suspectA-alibi", fromId: "suspectA", toId: "alibi" },
    { id: "e-suspectB-alibi", fromId: "suspectB", toId: "alibi" },
    { id: "e-evidence-timeline", fromId: "evidence", toId: "timeline" },
    { id: "e-alibi-timeline", fromId: "alibi", toId: "timeline" },
  ];

  return { nodes, edges };
}

export default function SherlockMindMapPage() {
  const [nodes, setNodes] = useState<MindNode[]>([]);
  const [edges, setEdges] = useState<MindEdge[]>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editLabel, setEditLabel] = useState("");
  const [connectTargetId, setConnectTargetId] = useState<string>("");
  const [glowMode, setGlowMode] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // LOAD FROM LOCALSTORAGE
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed: StoredData = JSON.parse(stored);

        // Old version: Array only
        if (Array.isArray(parsed)) {
          setNodes(
            parsed.map((n: any) => ({
              id: n.id,
              label: n.label,
              x: n.x,
              y: n.y,
              color: n.color ?? "#60A5FA",
              shape: (n.shape as NodeShape) ?? "circle",
            }))
          );
          setEdges([]);
          return;
        }

        // New version with full structure
        setNodes(
          parsed.nodes.map((n) => ({
            ...n,
            color: n.color ?? "#60A5FA",
            shape: (n.shape as NodeShape) ?? "circle",
          }))
        );

        setEdges(parsed.edges ?? []);
        return;
      } catch {
        console.warn("Invalid mindmap storage");
      }
    }

    // Default setup
    setNodes(createDefaultNodes());
    setEdges(createDefaultEdges());
  }, []);

  // SAVE
  useEffect(() => {
    if (typeof window === "undefined") return;

    const data: StoredData = { nodes, edges };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [nodes, edges]);

  // DRAG LOGIC
  const handleDrag = (
    id: string,
    _ev: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const base = NODE_BASE_SIZE;

    const x = info.point.x - rect.left - base / 2;
    const y = info.point.y - rect.top - base / 2;

    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? {
              ...n,
              x: Math.max(0, Math.min(rect.width - base, x)),
              y: Math.max(0, Math.min(rect.height - base, y)),
            }
          : n
      )
    );
  };

  // ACTIONS
  const handleAddNode = () => {
    const randomColor =
      COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)];

    setNodes((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        label: `Node ${prev.length + 1}`,
        x: 200 + prev.length * 15,
        y: 200 + prev.length * 15,
        color: randomColor,
        shape: "circle",
      },
    ]);
  };

  const handleReset = () => {
    setNodes(createDefaultNodes());
    setEdges(createDefaultEdges());
    setSelectedNodeId(null);
    setIsDialogOpen(false);
  };

  const handleLoadSampleStudy = () => {
    const sample = createSampleStudyMap();
    setNodes(sample.nodes);
    setEdges(sample.edges);
    setSelectedNodeId(null);
    setIsDialogOpen(false);
  };

  const handleLoadSampleSherlock = () => {
    const sample = createSampleSherlockMap();
    setNodes(sample.nodes);
    setEdges(sample.edges);
    setSelectedNodeId(null);
    setIsDialogOpen(false);
  };

  const openDialog = (node: MindNode) => {
    setSelectedNodeId(node.id);
    setEditLabel(node.label);
    setConnectTargetId("");
    setIsDialogOpen(true);
  };

  const handleSaveLabel = () => {
    if (!selectedNodeId) return;
    setNodes((prev) =>
      prev.map((n) =>
        n.id === selectedNodeId ? { ...n, label: editLabel } : n
      )
    );
    setIsDialogOpen(false);
  };

  const handleDeleteNode = () => {
    if (!selectedNodeId) return;

    setNodes((prev) => prev.filter((n) => n.id !== selectedNodeId));
    setEdges((prev) =>
      prev.filter(
        (e) => e.fromId !== selectedNodeId && e.toId !== selectedNodeId
      )
    );

    setIsDialogOpen(false);
  };

  const handleChangeColor = (color: string) => {
    if (!selectedNodeId) return;

    setNodes((prev) =>
      prev.map((n) => (n.id === selectedNodeId ? { ...n, color } : n))
    );
  };

  const handleChangeShape = (shape: NodeShape) => {
    if (!selectedNodeId) return;

    setNodes((prev) =>
      prev.map((n) => (n.id === selectedNodeId ? { ...n, shape } : n))
    );
  };

  const handleAddConnection = () => {
    if (!selectedNodeId || !connectTargetId) return;
    if (selectedNodeId === connectTargetId) return;

    // avoid duplicate edges (in either direction)
    const exists = edges.some(
      (e) =>
        (e.fromId === selectedNodeId && e.toId === connectTargetId) ||
        (e.fromId === connectTargetId && e.toId === selectedNodeId)
    );
    if (exists) return;

    const newEdge: MindEdge = {
      id: crypto.randomUUID(),
      fromId: selectedNodeId,
      toId: connectTargetId,
    };

    setEdges((prev) => [...prev, newEdge]);
    setConnectTargetId("");
  };

  const handleRemoveEdge = (id: string) => {
    setEdges((prev) => prev.filter((e) => e.id !== id));
  };

  // RENDER HELPERS
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  const connectedEdgesForSelected = selectedNode
    ? edges.filter(
        (e) => e.fromId === selectedNode.id || e.toId === selectedNode.id
      )
    : [];

  return (
    <div className="flex flex-col gap-4 p-4 lg:p-6 max-w-6xl mx-auto">
      <Card className="border-primary/30">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle>Sherlock Mind Map (Lite+)</CardTitle>
            <p className="text-sm text-muted-foreground">
              Load a Study map or a Sherlock case, then customize nodes, colors, shapes & arrows.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              variant={glowMode ? "default" : "outline"}
              size="sm"
              onClick={() => setGlowMode((prev) => !prev)}
            >
              {glowMode ? "✨ Glow ON" : "Glow mode"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleLoadSampleStudy}>
              Sample 1: Study
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLoadSampleSherlock}
            >
              Sample 2: Sherlock
            </Button>
            <Button variant="outline" size="sm" onClick={handleAddNode}>
              + Add node
            </Button>
            <Button size="sm" variant="ghost" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Arrows show direction: from the current node to the connected one.
          </p>
        </CardContent>
      </Card>

      <div
        ref={containerRef}
        className="relative min-h-[520px] border rounded-xl bg-background overflow-hidden"
      >
        {/* Render lines with arrowheads */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <defs>
            <marker
              id="arrowhead"
              markerWidth="6"
              markerHeight="6"
              refX="5"
              refY="3"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
            </marker>
          </defs>

          {edges.map((edge) => {
            const from = getNodeById(edge.fromId);
            const to = getNodeById(edge.toId);
            if (!from || !to) return null;

            const fromWidth =
              from.shape === "pill" ? NODE_BASE_SIZE * 1.5 : NODE_BASE_SIZE;
            const toWidth =
              to.shape === "pill" ? NODE_BASE_SIZE * 1.5 : NODE_BASE_SIZE;

            const x1 = from.x + fromWidth / 2;
            const y1 = from.y + NODE_BASE_SIZE / 2;
            const x2 = to.x + toWidth / 2;
            const y2 = to.y + NODE_BASE_SIZE / 2;

            return (
              <line
                key={edge.id}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth={1.5}
                markerEnd="url(#arrowhead)"
                className="text-muted-foreground/50"
              />
            );
          })}
        </svg>

        {/* Render nodes */}
        {nodes.map((node) => {
          const width =
            node.shape === "pill" ? NODE_BASE_SIZE * 1.5 : NODE_BASE_SIZE;
          const radius =
            node.shape === "circle"
              ? "rounded-full"
              : node.shape === "rounded"
              ? "rounded-2xl"
              : "rounded-full";

          const isSelected = node.id === selectedNodeId;
          const isConnectedToSelected =
            !!selectedNode &&
            edges.some(
              (e) =>
                (e.fromId === selectedNode.id && e.toId === node.id) ||
                (e.toId === selectedNode.id && e.fromId === node.id)
            );
          const hasAnyEdge = edges.some(
            (e) => e.fromId === node.id || e.toId === node.id
          );

          let boxShadow: string | undefined;

          if (glowMode) {
            if (isSelected) {
              boxShadow = "0 0 24px rgba(59,130,246,0.75)";
            } else if (isConnectedToSelected) {
              boxShadow = "0 0 18px rgba(59,130,246,0.55)";
            } else if (hasAnyEdge) {
              boxShadow = "0 0 14px rgba(148,163,184,0.55)";
            }
          }

          const extraClasses =
            glowMode && (isSelected || isConnectedToSelected || hasAnyEdge)
              ? "ring-2 ring-primary/80 ring-offset-2 ring-offset-background"
              : "";

          return (
            <motion.div
              key={node.id}
              drag
              dragMomentum={false}
              dragConstraints={containerRef}
              onDrag={(e, info) => handleDrag(node.id, e, info)}
              className={`absolute flex items-center justify-center border shadow ${radius} cursor-grab active:cursor-grabbing ${extraClasses}`}
              style={{
                width,
                height: NODE_BASE_SIZE,
                left: node.x,
                top: node.y,
                backgroundColor: node.color,
                boxShadow,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openDialog(node)}
            >
              <span className="font-semibold text-black/80 px-2 select-none text-center text-sm">
                {node.label}
              </span>
            </motion.div>
          );
        })}

        {nodes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
            No nodes yet. Click{" "}
            <span className="mx-1 font-semibold">“Sample 1”</span>,{" "}
            <span className="mx-1 font-semibold">“Sample 2”</span> or{" "}
            <span className="mx-1 font-semibold">“Add node”</span> to start.
          </div>
        )}
      </div>

            {/* NODE EDIT POPUP */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit node</DialogTitle>
          </DialogHeader>

          {selectedNode && (
            <div className="space-y-4">
              {/* Label */}
              <div>
                <label className="text-sm font-medium">Label</label>
                <Input
                  value={editLabel}
                  onChange={(e) => setEditLabel(e.target.value)}
                  className="mt-1"
                  placeholder="Task name"
                />
              </div>

              {/* Color */}
              <div>
                <p className="text-sm font-medium mb-1">Color</p>
                <div className="flex flex-wrap gap-2">
                  {COLOR_PALETTE.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleChangeColor(color)}
                      className={`h-7 w-7 rounded-full border ${
                        selectedNode.color === color
                          ? "ring-2 ring-primary ring-offset-1"
                          : ""
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div>
                <p className="text-sm font-medium mb-1">Shape</p>
                <div className="flex gap-2 flex-wrap">
                  {SHAPES.map((s) => (
                    <Button
                      key={s.value}
                      size="sm"
                      type="button"
                      variant={
                        selectedNode.shape === s.value ? "default" : "outline"
                      }
                      onClick={() => handleChangeShape(s.value)}
                    >
                      {s.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Connections */}
              <div>
                <p className="text-sm font-medium mb-1">Connect to</p>
                <div className="flex gap-2">
                  <select
                    value={connectTargetId}
                    onChange={(e) => setConnectTargetId(e.target.value)}
                    className="flex-1 h-9 border rounded px-2 text-sm bg-background"
                  >
                    <option value="">Select node…</option>
                    {nodes
                      .filter((n) => n.id !== selectedNode.id)
                      .map((n) => (
                        <option key={n.id} value={n.id}>
                          {n.label}
                        </option>
                      ))}
                  </select>
                  <Button
                    size="sm"
                    type="button"
                    variant="outline"
                    onClick={handleAddConnection}
                    disabled={!connectTargetId}
                  >
                    Add
                  </Button>
                </div>

                {/* Existing connections */}
                {connectedEdgesForSelected.length > 0 && (
                  <ul className="mt-2 text-sm space-y-1">
                    {connectedEdgesForSelected.map((edge) => {
                      const other =
                        edge.fromId === selectedNode.id
                          ? getNodeById(edge.toId)
                          : getNodeById(edge.fromId);
                      if (!other) return null;
                      return (
                        <li
                          key={edge.id}
                          className="flex items-center justify-between"
                        >
                          <span>
                            {edge.fromId === selectedNode.id ? "→" : "←"}{" "}
                            {other.label}
                          </span>
                          <button
                            type="button"
                            className="text-red-500 text-xs hover:underline"
                            onClick={() => handleRemoveEdge(edge.id)}
                          >
                            Remove
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          )}

          <DialogFooter className="flex justify-between">
            <Button
              size="sm"
              variant="destructive"
              type="button"
              onClick={handleDeleteNode}
              disabled={!selectedNode}
            >
              Delete
            </Button>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                type="button"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button size="sm" type="button" onClick={handleSaveLabel}>
                Save
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
