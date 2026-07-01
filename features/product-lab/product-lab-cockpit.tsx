"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Sparkles,
  ArrowLeft,
  Search,
  Layers,
  Calendar,
  Users,
  Briefcase,
  ExternalLink,
  CheckCircle,
  FileText,
  Clock,
  ChevronRight,
  TrendingUp,
  Settings,
  Code2,
  Workflow,
  HelpCircle,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/buttons/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";

// Dynamic Recharts import to prevent SSR hydration errors
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

// Import raw JSON array directly
import projectsData from "@/data/projects.json";

export default function ProductLabCockpit() {
  const projects = projectsData.example as any[];

  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeStatus, setActiveStatus] = useState("all");

  const detailNavRef = useRef<HTMLDivElement>(null);

  // Categories & Statuses
  const categories = useMemo(() => {
    const cats = projects.map((p) => p.category);
    return Array.from(new Set(cats));
  }, [projects]);

  const statuses = useMemo(() => {
    const stats = projects.map((p) => p.status);
    return Array.from(new Set(stats));
  }, [projects]);

  // Filtering projects
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.problem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.techStack.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === "all" || p.category === activeCategory;
      const matchesStatus = activeStatus === "all" || p.status === activeStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [projects, searchQuery, activeCategory, activeStatus]);

  // Mock telemetry data for Recharts metric dashboard
  const chartData = [
    { name: "Month 1", queryTime: 120, userUsage: 20 },
    { name: "Month 2", queryTime: 95, userUsage: 45 },
    { name: "Month 3", queryTime: 70, userUsage: 60 },
    { name: "Month 4", queryTime: 35, userUsage: 80 },
    { name: "Month 5", queryTime: 12, userUsage: 95 },
    { name: "Month 6", queryTime: 2, userUsage: 100 },
  ];

  // Case study sections list (SectionNavigation)
  const caseStudySections = [
    { id: "summary", label: "1. Executive Summary" },
    { id: "context", label: "2. Business & Customer Context" },
    { id: "research", label: "3. User Research & Painpoints" },
    { id: "requirements", label: "4. Requirements & Stories" },
    { id: "roadmap", label: "5. Product Roadmap" },
    { id: "architecture", label: "6. Technical Solutions & Tradeoffs" },
    { id: "impact", label: "7. Business Impact & KPIs" },
    { id: "lessons", label: "8. Lessons & Improvements" },
  ];

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(`sec-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full flex-1">
      <AnimatePresence mode="wait">
        {!selectedProject ? (
          // ----------------------------------------------------
          // VIEW A: PRODUCT GRID & LOOKUPS
          // ----------------------------------------------------
          <motion.div
            key="grid-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            {/* Lookup bar */}
            <div className="bg-secondary/15 border-border/10 flex flex-col items-stretch justify-between gap-4 rounded-xl border p-4 md:flex-row md:items-center">
              <div className="relative flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search case studies by name, keywords, capabilities, or stack..."
                  className="bg-background/50 border-border/20 focus:border-primary text-foreground w-full rounded-lg border py-2 pr-4 pl-9 text-xs focus:outline-none"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <select
                  value={activeCategory}
                  onChange={(e) => setActiveCategory(e.target.value)}
                  className="bg-background/50 border-border/20 focus:border-primary text-foreground rounded-lg border px-3 py-2 font-mono text-[10px] focus:outline-none"
                >
                  <option value="all">ALL CATEGORIES</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c.toUpperCase()}
                    </option>
                  ))}
                </select>
                <select
                  value={activeStatus}
                  onChange={(e) => setActiveStatus(e.target.value)}
                  className="bg-background/50 border-border/20 focus:border-primary text-foreground rounded-lg border px-3 py-2 font-mono text-[10px] focus:outline-none"
                >
                  <option value="all">ALL STATUSES</option>
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Grid display */}
            {filteredProjects.length === 0 ? (
              <div className="text-muted-foreground py-20 text-center font-mono text-xs">
                NO CASE STUDIES MATCHING QUERY CRITERIA.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {filteredProjects.map((p) => (
                  <Card
                    key={p.id}
                    variant="solid"
                    className="group hover:border-primary/20 flex flex-col justify-between transition-all"
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-muted-foreground flex items-center gap-1 font-mono text-[9px] uppercase">
                          <Calendar className="h-3 w-3" /> {p.duration}
                        </span>
                        <Badge
                          variant="glass"
                          className="bg-primary/5 text-primary border-primary/10 font-mono text-[9px] uppercase"
                        >
                          {p.status}
                        </Badge>
                      </div>
                      <CardTitle className="text-foreground group-hover:text-primary mt-2 text-sm font-bold transition-colors">
                        {p.title}
                      </CardTitle>
                      <span className="text-muted-foreground block pt-0.5 font-mono text-[10px] font-semibold">
                        Role: {p.role} · Client: {p.client}
                      </span>
                    </CardHeader>

                    <CardContent className="pt-1 pb-4">
                      <p className="text-muted-foreground line-clamp-3 text-xs leading-relaxed">
                        {p.problem}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-1">
                        {p.techStack.map((tech: string) => (
                          <Badge key={tech} variant="secondary" className="font-mono text-[8px]">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>

                    <div className="border-border/10 flex items-center justify-between gap-2 border-t p-4">
                      <Button
                        variant="glass"
                        size="xs"
                        onClick={() => alert("Quick stats: query metrics Sync at under 2 hours.")}
                        className="font-mono text-[9px]"
                      >
                        Telemetry Specs
                      </Button>
                      <Button
                        variant="default"
                        size="xs"
                        onClick={() => setSelectedProject(p)}
                        className="font-mono text-[9px]"
                        rightIcon={<ArrowRight className="h-3 w-3" />}
                      >
                        Open Case Study
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </motion.div>
        ) : (
          // ----------------------------------------------------
          // VIEW B: PREMIUM CASE STUDY COMPONENT
          // ----------------------------------------------------
          <motion.div
            key="case-study-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="flex flex-col items-start gap-8 md:flex-row"
          >
            {/* Sticky Sidebar Outline (SectionNavigation) */}
            <aside className="w-full shrink-0 space-y-4 md:sticky md:top-24 md:w-64">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedProject(null)}
                leftIcon={<ArrowLeft className="h-4 w-4" />}
                className="flex w-full items-center justify-center font-mono text-[10px]"
              >
                BACK TO PROJECT LAB
              </Button>

              <Card variant="glass" className="p-3">
                <span className="text-primary mb-3 block pl-2 font-mono text-[9px] font-bold uppercase">
                  CASE STUDY INDEX:
                </span>
                <nav className="text-muted-foreground space-y-1.5 font-mono text-[10px] uppercase">
                  {caseStudySections.map((sec) => (
                    <button
                      key={sec.id}
                      onClick={() => handleScrollToSection(sec.id)}
                      className="hover:bg-secondary/40 hover:text-foreground block w-full truncate rounded px-2 py-1.5 text-left transition-all"
                    >
                      {sec.label}
                    </button>
                  ))}
                </nav>
              </Card>
            </aside>

            {/* Main scrollable case study page body */}
            <div className="min-w-0 flex-1 space-y-10">
              {/* Executive Summary */}
              <section id="sec-summary" className="scroll-mt-24 space-y-4">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    1. EXECUTIVE SPEC
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">Executive Summary</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card variant="solid">
                    <CardHeader className="pb-2">
                      <span className="text-muted-foreground font-mono text-[8px] uppercase">
                        Product Case
                      </span>
                      <CardTitle className="text-foreground mt-1 text-xs font-bold">
                        Project Spec
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-xs leading-relaxed">
                      {selectedProject.title} (Role: {selectedProject.role}).
                    </CardContent>
                  </Card>
                  <Card variant="solid">
                    <CardHeader className="pb-2">
                      <span className="text-success font-mono text-[8px] uppercase">
                        Launch KPIs
                      </span>
                      <CardTitle className="text-foreground mt-1 text-xs font-bold">
                        Success Metric
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-muted-foreground text-xs leading-relaxed">
                      {selectedProject.metrics[0]}.
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Context & Problems */}
              <section id="sec-context" className="scroll-mt-24 space-y-4">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    2. CONTEXT & FUNNELS
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">
                    Business & Customer Problems
                  </h2>
                </div>
                <div className="bg-secondary/15 border-border/10 space-y-4 rounded-xl border p-5">
                  <div className="text-muted-foreground space-y-1.5 text-xs">
                    <span className="text-foreground flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase">
                      <ShieldAlert className="text-warning h-4 w-4 shrink-0" />
                      The Business Bottleneck:
                    </span>
                    <p>{selectedProject.businessContext}</p>
                  </div>
                  <div className="text-muted-foreground border-border/10 space-y-1.5 border-t pt-3 text-xs">
                    <span className="text-primary flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase">
                      <Users className="text-primary h-4 w-4 shrink-0" />
                      Customer Friction Areas:
                    </span>
                    <p>{selectedProject.problem}</p>
                  </div>
                </div>
              </section>

              {/* User Research & Painpoints */}
              <section id="sec-research" className="scroll-mt-24 space-y-4">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    3. USER RESEARCH & INSIGHTS
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">
                    User Research & Customer Painpoints
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Research array */}
                  <Card variant="solid">
                    <CardHeader>
                      <CardTitle className="text-foreground font-mono text-xs font-bold uppercase">
                        Methodology:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedProject.research.map((res: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <ChevronRight className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                            <span>{res}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Painpoints array */}
                  <Card variant="solid">
                    <CardHeader>
                      <CardTitle className="text-foreground font-mono text-xs font-bold uppercase">
                        Customer Painpoints:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedProject.painPoints.map((pain: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <span className="bg-warning mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                            <span>{pain}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Requirements & Stories */}
              <section id="sec-requirements" className="scroll-mt-24 space-y-4">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    4. PRD DETAILS
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">
                    Requirements & User Stories
                  </h2>
                </div>
                <div className="space-y-4">
                  {/* Prioritization description */}
                  <Card variant="glass" className="flex items-center gap-3 p-4">
                    <Workflow className="text-primary h-5 w-5 shrink-0" />
                    <div className="text-muted-foreground text-xs">
                      <span className="text-foreground mb-0.5 block font-mono text-[9px] font-bold uppercase">
                        Prioritization framework:
                      </span>
                      {selectedProject.prioritization}
                    </div>
                  </Card>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Requirements checklist */}
                    <div className="space-y-2">
                      <span className="text-foreground block font-mono text-[10px] font-bold uppercase">
                        FUNCTIONAL REQUIREMENTS:
                      </span>
                      <ul className="bg-secondary/10 border-border/10 space-y-2 rounded-xl border p-4">
                        {selectedProject.requirements.map((req: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <CheckCircle className="text-success mt-0.5 h-4 w-4 shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* User stories */}
                    <div className="space-y-2">
                      <span className="text-foreground block font-mono text-[10px] font-bold uppercase">
                        PM USER STORIES:
                      </span>
                      <ul className="bg-secondary/10 border-border/10 space-y-3 rounded-xl border p-4">
                        {selectedProject.userStories.map((story: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-muted-foreground text-xs leading-relaxed italic"
                          >
                            "{story}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Product Roadmap */}
              <section id="sec-roadmap" className="scroll-mt-24 space-y-4">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    5. ROADMAP SPEC
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">Product Roadmap</h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {selectedProject.roadmap.map((road: any, idx: number) => (
                    <Card key={idx} variant="solid" className="flex flex-col justify-between">
                      <CardHeader className="pb-2">
                        <span className="text-primary font-mono text-[9px] font-bold uppercase">
                          Phase {idx + 1}
                        </span>
                        <CardTitle className="text-foreground mt-0.5 text-xs font-bold">
                          {road.phase}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1.5">
                          {road.deliverables.map((del: string, dIdx: number) => (
                            <li
                              key={dIdx}
                              className="text-muted-foreground flex items-start gap-1 text-[10px]"
                            >
                              <span className="bg-border mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>

              {/* Technical Architecture & Decisions */}
              <section id="sec-architecture" className="scroll-mt-24 space-y-4">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    6. TECH ARCHITECTURE & DECISIVE LOGS
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">
                    Technical Architecture & Tradeoffs
                  </h2>
                </div>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Tech chips */}
                    <Card variant="solid">
                      <CardHeader>
                        <CardTitle className="text-foreground font-mono text-xs font-bold uppercase">
                          Tech Stack Chipset:
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-1.5">
                        {selectedProject.techStack.map((tech: string) => (
                          <Badge key={tech} variant="glass" className="font-mono text-[9px]">
                            {tech}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>

                    {/* Tools */}
                    <Card variant="solid">
                      <CardHeader>
                        <CardTitle className="text-foreground font-mono text-xs font-bold uppercase">
                          PM Tools Synced:
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-wrap gap-1.5">
                        {selectedProject.tools.map((tool: string) => (
                          <Badge key={tool} variant="secondary" className="font-mono text-[9px]">
                            {tool}
                          </Badge>
                        ))}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Decisions & Tradeoffs timeline */}
                  <div className="space-y-3 pt-2">
                    <span className="text-foreground block font-mono text-[10px] font-bold uppercase">
                      PRODUCT TRADE-OFFS & ROADMAP DECISIONS:
                    </span>
                    <div className="bg-secondary/15 border-border/10 space-y-4 rounded-xl border p-5">
                      <div className="text-muted-foreground text-xs">
                        <strong className="text-foreground mb-1 block font-mono text-[9px] uppercase">
                          Architecture Decisions:
                        </strong>
                        <p>
                          {selectedProject.decisions[0].title} -{" "}
                          {selectedProject.decisions[0].description}
                        </p>
                        <p className="mt-2 italic">
                          Tradeoff validation: {selectedProject.decisions[0].tradeoff}
                        </p>
                      </div>
                      <div className="text-muted-foreground border-border/10 border-t pt-3 text-xs">
                        <strong className="text-foreground mb-1 block font-mono text-[9px] uppercase">
                          Scope sacrifice:
                        </strong>
                        <p>{selectedProject.tradeoffs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Business Impact & Telemetry Dashboard */}
              <section id="sec-impact" className="scroll-mt-24 space-y-4">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    7. DATA TELEMETRY & BUSINESS IMPACT
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">
                    Metrics & Business Impact
                  </h2>
                </div>
                <div className="space-y-6">
                  {/* Dashboard stats cards */}
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {selectedProject.metrics.map((met: string, idx: number) => (
                      <Card key={idx} variant="glass" className="flex items-start gap-3 p-4">
                        <TrendingUp className="text-success mt-0.5 h-5 w-5 shrink-0" />
                        <div className="text-muted-foreground text-xs">
                          <span className="text-foreground mb-0.5 block font-mono text-[9px] font-bold uppercase">
                            Impact Metric {idx + 1}:
                          </span>
                          {met}
                        </div>
                      </Card>
                    ))}
                  </div>

                  {/* Recharts dynamic telemetry panel */}
                  <Card variant="solid">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-foreground font-mono text-xs font-bold uppercase">
                        Product Telemetry Optimization Sync
                      </CardTitle>
                      <CardDescription className="text-[10px]">
                        Dynamic telemetry metrics illustrating reporting latencies (bars) vs user
                        active usage (line).
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-64 w-full pt-4">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                          <XAxis
                            dataKey="name"
                            stroke="rgba(255,255,255,0.4)"
                            fontSize={10}
                            tickLine={false}
                          />
                          <YAxis stroke="rgba(255,255,255,0.4)" fontSize={10} tickLine={false} />
                          <Tooltip
                            contentStyle={{
                              background: "rgba(0,0,0,0.8)",
                              border: "1px solid rgba(255,255,255,0.1)",
                              borderRadius: "8px",
                              fontSize: 11,
                            }}
                            labelStyle={{ color: "#888" }}
                          />
                          <Bar
                            dataKey="queryTime"
                            fill="var(--color-primary, #6366f1)"
                            radius={[4, 4, 0, 0]}
                            name="Latency (min)"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* Lessons Learned & Future Improvements */}
              <section id="sec-lessons" className="scroll-mt-24 space-y-4 pb-20">
                <div className="border-border/20 border-b pb-4">
                  <span className="text-primary font-mono text-xs font-bold uppercase">
                    8. RETROSPECTIVE SPEC
                  </span>
                  <h2 className="text-foreground mt-1 text-xl font-extrabold">
                    Lessons Learned & Future Goals
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {/* Lessons */}
                  <Card variant="solid">
                    <CardHeader>
                      <CardTitle className="text-foreground font-mono text-xs font-bold uppercase">
                        Project Retrospective Lessons:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedProject.lessonsLearned.map((less: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <span className="bg-border mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                            <span>{less}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  {/* Future */}
                  <Card variant="solid">
                    <CardHeader>
                      <CardTitle className="text-foreground font-mono text-xs font-bold uppercase">
                        Future Roadmap Optimizations:
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {selectedProject.futureImprovements.map((fut: string, idx: number) => (
                          <li
                            key={idx}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <span className="bg-primary mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                            <span>{fut}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
