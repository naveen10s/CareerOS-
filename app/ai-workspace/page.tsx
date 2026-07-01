"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  Copy,
  Check,
  Star,
  Cpu,
  Play,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Database,
  TrendingUp,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Button } from "@/components/buttons/button";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";
import aiData from "@/data/ai-workspace.json";

export default function AiWorkspacePage() {
  const data = aiData.example;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<string[]>(
    data.prompts.filter((p) => p.favorite).map((p) => p.id),
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [workflowStatus, setWorkflowStatus] = useState<
    Record<string, "idle" | "running" | "completed">
  >({});

  const categories = useMemo(() => {
    const list = new Set(data.prompts.map((p) => p.category));
    return ["All", ...Array.from(list)];
  }, [data.prompts]);

  const filteredPrompts = useMemo(() => {
    return data.prompts.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.template.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [data.prompts, searchTerm, activeCategory]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const runWorkflow = (id: string) => {
    setWorkflowStatus((prev) => ({ ...prev, [id]: "running" }));
    setTimeout(() => {
      setWorkflowStatus((prev) => ({ ...prev, [id]: "completed" }));
      setTimeout(() => {
        setWorkflowStatus((prev) => ({ ...prev, [id]: "idle" }));
      }, 3000);
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full space-y-8 p-6 pb-24 md:p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-3"
        >
          <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
            <Cpu className="text-primary h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                Operations Workspace
              </span>
              <span className="bg-primary/20 h-px w-8" />
              <span className="text-muted-foreground font-mono text-[9px]">
                AI Intelligence Layer
              </span>
            </div>
            <h1 className="text-foreground text-2xl font-extrabold tracking-tight">AI Workspace</h1>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Automated telemetry engineering, star stories generation, and prompt utility systems.
            </p>
          </div>
        </motion.div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Left: Library & Workflows */}
          <div className="space-y-8 lg:col-span-2">
            {/* Prompts Section */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                  Prompt Library
                </h2>
                <Badge variant="outline" className="font-mono text-[9px]">
                  {filteredPrompts.length} Prompts
                </Badge>
              </div>

              {/* Search & Tabs */}
              <div className="bg-secondary/15 border-border/10 flex flex-col gap-4 rounded-xl border p-4">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-2.5 left-3 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search prompt templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-background/40 border-border/30 text-foreground placeholder:text-muted-foreground focus:border-primary/50 w-full rounded-lg border py-2 pr-4 pl-9 text-xs outline-none"
                  />
                </div>

                <div className="flex flex-wrap gap-1.5" role="tablist">
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => setActiveCategory(c)}
                      className={cn(
                        "rounded-lg border px-2.5 py-1.5 font-mono text-[9px] uppercase transition-all",
                        activeCategory === c
                          ? "bg-primary text-primary-foreground border-primary"
                          : "text-muted-foreground border-border/20 hover:border-border/50 hover:text-foreground bg-transparent",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Cards Grid */}
              <div className="grid grid-cols-1 gap-4">
                <AnimatePresence mode="popLayout">
                  {filteredPrompts.map((p, idx) => {
                    const isFav = favorites.includes(p.id);
                    const isCopied = copiedId === p.id;

                    return (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                      >
                        <Card variant="solid" className="relative p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge
                                  variant="secondary"
                                  className="font-mono text-[8px] uppercase"
                                >
                                  {p.category}
                                </Badge>
                                <span className="text-muted-foreground font-mono text-[8px]">
                                  {p.usageCount} Runs
                                </span>
                              </div>
                              <h3 className="text-foreground text-sm font-bold">{p.title}</h3>
                              <p className="text-muted-foreground max-w-xl text-[11px] leading-relaxed">
                                {p.description}
                              </p>
                            </div>

                            <div className="flex gap-1.5">
                              <button
                                onClick={() => toggleFavorite(p.id)}
                                className={cn(
                                  "hover:bg-secondary border-border/10 flex h-7 w-7 items-center justify-center rounded-lg border transition-colors",
                                  isFav ? "text-warning" : "text-muted-foreground",
                                )}
                                aria-label="Favorite Prompt"
                              >
                                <Star className={cn("h-3.5 w-3.5", isFav && "fill-current")} />
                              </button>
                              <button
                                onClick={() => copyToClipboard(p.template, p.id)}
                                className="bg-secondary/50 hover:bg-secondary border-border/10 text-foreground flex h-7 w-7 items-center justify-center rounded-lg border transition-colors"
                                aria-label="Copy Prompt Template"
                              >
                                {isCopied ? (
                                  <Check className="text-success h-3.5 w-3.5" />
                                ) : (
                                  <Copy className="h-3.5 w-3.5" />
                                )}
                              </button>
                            </div>
                          </div>

                          {/* Template block */}
                          <div className="bg-background/60 border-border/15 text-foreground/90 mt-3 rounded-lg border p-3 font-mono text-[10px] select-all">
                            {p.template}
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </section>

            {/* Workflows */}
            <section className="space-y-4">
              <h2 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Automated Workflows
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {data.workflows.map((wf) => {
                  const status = workflowStatus[wf.id] || "idle";

                  return (
                    <Card key={wf.id} variant="solid" className="p-5">
                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="bg-success/10 text-success border-success/20 rounded border px-1.5 py-0.5 font-mono text-[8px] font-bold uppercase">
                              {wf.status}
                            </span>
                            <span className="text-muted-foreground font-mono text-[9px]">
                              Trigger: {wf.trigger}
                            </span>
                          </div>
                          <h3 className="text-foreground mt-1 text-sm font-bold">{wf.name}</h3>
                          <p className="text-muted-foreground text-[10px]">
                            Consists of {wf.stepsCount} sequential pipeline tasks.
                          </p>
                        </div>

                        <Button
                          variant={status === "completed" ? "growth" : "secondary"}
                          size="sm"
                          isLoading={status === "running"}
                          onClick={() => runWorkflow(wf.id)}
                          leftIcon={
                            status === "completed" ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Play className="h-3 w-3" />
                            )
                          }
                        >
                          {status === "idle" && "Trigger Sync"}
                          {status === "running" && "Executing..."}
                          {status === "completed" && "Success"}
                        </Button>
                      </div>

                      {/* Timeline flow */}
                      <div className="border-border/40 mt-5 space-y-4 border-l-2 pl-4">
                        {wf.steps.map((step) => (
                          <div key={step.stepNumber} className="relative">
                            <span className="bg-primary text-primary-foreground absolute top-0.5 -left-[23px] flex h-4.5 w-4.5 items-center justify-center rounded-full font-mono text-[9px] font-bold">
                              {step.stepNumber}
                            </span>
                            <h4 className="text-foreground text-[11px] font-bold">{step.name}</h4>
                            <p className="text-muted-foreground text-[10px]">{step.description}</p>
                          </div>
                        ))}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>

          {/* Right Panel */}
          <div className="space-y-8">
            {/* Overview / Utilities */}
            <section className="space-y-4">
              <h2 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                AI Agent Tools
              </h2>
              <div className="space-y-4">
                {data.tools.map((t) => (
                  <Card key={t.id} variant="solid" className="space-y-2 p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-foreground text-xs font-bold">{t.name}</h3>
                      <Badge variant="outline" className="font-mono text-[8px] uppercase">
                        {t.type}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-[10px] leading-relaxed">
                      {t.description}
                    </p>
                    <div className="bg-success/5 border-success/10 text-success flex items-center gap-1.5 rounded-lg border px-2 py-1 font-mono text-[9px]">
                      <Sparkles className="h-3 w-3 shrink-0" />
                      <span>{t.efficiencyGain}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Automation Dashboard widget */}
            <section className="space-y-4">
              <h2 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Automation Engine
              </h2>
              <Card variant="solid" className="space-y-4 p-4">
                <div className="border-border/10 flex items-center justify-between border-b pb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-success/20 h-2 w-2 animate-pulse rounded-full" />
                    <span className="text-foreground font-mono text-[10px] font-bold">
                      SYSTEM DAEMONS RUNNING
                    </span>
                  </div>
                  <Database className="text-muted-foreground h-4 w-4" />
                </div>

                <div className="space-y-3 font-mono text-[10px]">
                  {data.automation.map((a) => (
                    <div
                      key={a.id}
                      className="border-border/5 flex justify-between border-b pb-2 last:border-b-0 last:pb-0"
                    >
                      <div>
                        <div className="text-foreground font-bold">{a.name}</div>
                        <div className="text-muted-foreground text-[8px]">
                          Success: {a.lastSuccess}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-success font-bold">{a.status}</span>
                        <div className="text-muted-foreground/80 text-[8px]">Next: {a.nextRun}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            {/* AI Timeline */}
            <section className="space-y-4">
              <h2 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Workspace Log
              </h2>
              <div className="space-y-4">
                {data.learningTimeline.map((item) => (
                  <div key={item.id} className="border-primary/30 space-y-1 border-l-2 pl-3">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground font-mono text-[9px]">
                        {item.date}
                      </span>
                      <Badge variant="outline" className="font-mono text-[8px] uppercase">
                        {item.category}
                      </Badge>
                    </div>
                    <h4 className="text-foreground text-xs font-bold">{item.event}</h4>
                    <p className="text-muted-foreground text-[10px] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
