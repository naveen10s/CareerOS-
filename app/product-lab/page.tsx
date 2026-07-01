"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  FlaskConical,
  Search,
  Calendar,
  Users,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Workflow,
  ShieldAlert,
  Star,
  X,
  Filter,
} from "lucide-react";
import dynamic from "next/dynamic";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";
import projectsData from "@/data/projects/example.json";

// Lazy-load Recharts chart for impact metrics visualisation
const BarChart = dynamic(() => import("recharts").then((m) => m.BarChart), { ssr: false });
const Bar = dynamic(() => import("recharts").then((m) => m.Bar), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((m) => m.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((m) => m.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((m) => m.CartesianGrid), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((m) => m.Tooltip), { ssr: false });
const ResponsiveContainer = dynamic(() => import("recharts").then((m) => m.ResponsiveContainer), {
  ssr: false,
});

type Project = (typeof projectsData)[number];

const CATEGORIES = [
  "All",
  "Product Infrastructure",
  "User Experience Optimisation",
  "Process Automation",
];
const STATUS_COLORS: Record<string, string> = {
  Completed: "text-success border-success/20 bg-success/5",
  "In Progress": "text-warning border-warning/20 bg-warning/5",
  Planning: "text-info border-info/20 bg-info/5",
};

// ── Case study section nav ─────────────────────────────────────────────────────
const SECTIONS = [
  { id: "summary", label: "1. Summary" },
  { id: "context", label: "2. Context & Problem" },
  { id: "research", label: "3. Research" },
  { id: "requirements", label: "4. Requirements" },
  { id: "roadmap", label: "5. Roadmap" },
  { id: "solution", label: "6. Solution & Decisions" },
  { id: "impact", label: "7. Impact & Metrics" },
  { id: "lessons", label: "8. Lessons & Future" },
];

export default function ProductLabPage() {
  const projects = projectsData as Project[];

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll progress for the case study reading bar
  const { scrollYProgress } = useScroll({ target: scrollRef });
  const readingProgress = useSpring(scrollYProgress, { stiffness: 180, damping: 30 });

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return projects.filter((p) => {
      const matchSearch =
        q === "" ||
        p.title.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        p.problem.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q));
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [projects, searchQuery, activeCategory]);

  const handleSelect = useCallback((p: Project) => {
    setSelectedProject(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleBack = useCallback(() => setSelectedProject(null), []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  // Fake chart data from project metrics count
  const impactChartData = selectedProject
    ? selectedProject.metrics.map((m, i) => ({
        label: `Impact ${i + 1}`,
        value: Math.floor(Math.random() * 80 + 20),
        text: m.slice(0, 30),
      }))
    : [];

  return (
    <DashboardLayout>
      <div className="pb-24">
        <AnimatePresence mode="wait">
          {/* ── VIEW A: PROJECT GRID ──────────────────────────────────────── */}
          {!selectedProject && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="space-y-8"
            >
              {/* Header */}
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 border-primary/20 mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
                  <FlaskConical className="text-primary h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                      Product Intelligence
                    </span>
                    <span className="bg-primary/20 h-px w-8" />
                    <span className="text-muted-foreground font-mono text-[9px]">
                      {projects.length} Case Studies
                    </span>
                  </div>
                  <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
                    Product Lab
                  </h1>
                  <p className="text-muted-foreground mt-1 max-w-2xl text-xs leading-relaxed">
                    Each project is a full case study — problem, research, decisions, metrics, and
                    lessons. Not a portfolio. A product thinking showcase.
                  </p>
                </div>
              </div>

              {/* Toolbar */}
              <div className="bg-secondary/10 border-border/10 flex flex-col items-stretch gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
                <div className="relative flex-1">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                  <input
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title, problem, tech stack..."
                    className="bg-background/50 border-border/20 focus:ring-primary focus:border-primary text-foreground w-full rounded-lg border py-2 pr-4 pl-9 text-xs focus:ring-1 focus:outline-none"
                    aria-label="Search projects"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={cn(
                        "rounded-lg border px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-all",
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground border-primary"
                          : "text-muted-foreground border-border/20 hover:border-border/50 hover:text-foreground bg-transparent",
                      )}
                      aria-pressed={activeCategory === cat}
                    >
                      {cat === "All" ? `All (${projects.length})` : cat.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  {
                    label: "Case Studies",
                    value: projects.length,
                    icon: <FlaskConical className="text-primary h-4 w-4" />,
                  },
                  {
                    label: "Completed",
                    value: projects.filter((p) => p.status === "Completed").length,
                    icon: <CheckCircle className="text-success h-4 w-4" />,
                  },
                  {
                    label: "Avg Team Size",
                    value: Math.round(
                      projects.reduce((a, p) => a + p.teamSize, 0) / projects.length,
                    ),
                    icon: <Users className="text-warning h-4 w-4" />,
                  },
                  {
                    label: "Categories",
                    value: CATEGORIES.length - 1,
                    icon: <Filter className="text-info h-4 w-4" />,
                  },
                ].map((stat) => (
                  <Card key={stat.label} variant="solid" className="flex items-center gap-3 p-4">
                    <div className="bg-secondary/40 border-border/15 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
                      {stat.icon}
                    </div>
                    <div>
                      <div className="text-foreground font-mono text-xl font-extrabold">
                        {stat.value}
                      </div>
                      <div className="text-muted-foreground font-mono text-[9px] uppercase">
                        {stat.label}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Results count */}
              <div className="text-muted-foreground font-mono text-[9px]">
                {filtered.length} CASE STUD{filtered.length !== 1 ? "IES" : "Y"} MATCHED
                {filtered.length !== projects.length && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setActiveCategory("All");
                    }}
                    className="text-primary ml-3 inline-flex items-center gap-1 hover:underline"
                  >
                    <X className="h-3 w-3" /> CLEAR
                  </button>
                )}
              </div>

              {/* Project grid */}
              {filtered.length === 0 ? (
                <div className="text-muted-foreground border-border/10 rounded-xl border py-20 text-center font-mono text-xs">
                  NO CASE STUDIES MATCH CURRENT FILTERS.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.map((project, i) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: i * 0.06 }}
                    >
                      <Card
                        variant="solid"
                        animateHover
                        className="group flex h-full cursor-pointer flex-col"
                        onClick={() => handleSelect(project)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && handleSelect(project)}
                        aria-label={`Open case study: ${project.title}`}
                      >
                        {/* Card header */}
                        <CardHeader className="pb-2">
                          <div className="mb-2 flex items-start justify-between gap-2">
                            <span className="text-muted-foreground flex items-center gap-1 font-mono text-[8px] uppercase">
                              <Calendar className="h-3 w-3" /> {project.duration}
                            </span>
                            <Badge
                              variant="outline"
                              className={cn(
                                "shrink-0 font-mono text-[8px] uppercase",
                                STATUS_COLORS[project.status] ?? "",
                              )}
                            >
                              {project.status}
                            </Badge>
                          </div>
                          <CardTitle className="text-foreground group-hover:text-primary text-sm leading-snug font-bold transition-colors">
                            {project.title}
                          </CardTitle>
                          <div className="mt-1 flex flex-wrap items-center gap-1.5">
                            <span className="text-muted-foreground font-mono text-[9px]">
                              {project.role}
                            </span>
                            <span className="text-muted-foreground/30">·</span>
                            <span className="text-muted-foreground font-mono text-[9px]">
                              {project.client}
                            </span>
                          </div>
                        </CardHeader>

                        {/* Problem summary */}
                        <CardContent className="flex-1 pb-3">
                          <p className="text-muted-foreground line-clamp-3 text-[11px] leading-relaxed">
                            {project.problem}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-1">
                            {project.techStack.slice(0, 4).map((t) => (
                              <Badge key={t} variant="secondary" className="font-mono text-[8px]">
                                {t}
                              </Badge>
                            ))}
                            {project.techStack.length > 4 && (
                              <Badge variant="secondary" className="font-mono text-[8px]">
                                +{project.techStack.length - 4}
                              </Badge>
                            )}
                          </div>
                        </CardContent>

                        {/* Key metric preview */}
                        <div className="border-border/10 flex items-center justify-between border-t px-6 pt-3 pb-4">
                          <span className="text-success flex items-center gap-1 font-mono text-[9px]">
                            <TrendingUp className="h-3 w-3" /> {project.metrics[0]?.slice(0, 32)}…
                          </span>
                          <ArrowRight className="text-muted-foreground group-hover:text-primary h-3.5 w-3.5 transition-colors" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ── VIEW B: CASE STUDY DETAIL ─────────────────────────────────── */}
          {selectedProject && (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              className="flex flex-col items-start gap-8 lg:flex-row"
              ref={scrollRef}
            >
              {/* Reading progress bar */}
              <motion.div
                className="bg-primary fixed top-0 right-0 left-0 z-50 h-0.5 origin-left"
                style={{ scaleX: readingProgress }}
              />

              {/* Sticky sidebar nav */}
              <aside className="w-full shrink-0 space-y-3 lg:sticky lg:top-24 lg:w-60">
                <button
                  onClick={handleBack}
                  className="border-border/20 text-muted-foreground hover:text-foreground hover:border-border/50 flex w-full items-center gap-2 rounded-lg border px-3 py-2 font-mono text-[9px] transition-all"
                  aria-label="Back to Product Lab"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> BACK TO LAB
                </button>
                <Card variant="glass" className="p-3">
                  <span className="text-primary mb-2 block pl-1 font-mono text-[8px] font-bold uppercase">
                    CASE STUDY INDEX
                  </span>
                  <nav className="space-y-1">
                    {SECTIONS.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => scrollTo(sec.id)}
                        className="text-muted-foreground hover:bg-secondary/40 hover:text-foreground block w-full truncate rounded px-2 py-1.5 text-left font-mono text-[9px] uppercase transition-all"
                      >
                        {sec.label}
                      </button>
                    ))}
                  </nav>
                </Card>

                {/* Project meta */}
                <Card variant="solid" className="space-y-3 p-4">
                  <div className="space-y-1.5 font-mono text-[9px]">
                    {[
                      { label: "Duration", value: selectedProject.duration },
                      { label: "Team Size", value: `${selectedProject.teamSize} people` },
                      { label: "Role", value: selectedProject.role },
                      { label: "Client", value: selectedProject.client },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between gap-2">
                        <span className="text-muted-foreground uppercase">{item.label}</span>
                        <span className="text-foreground text-right">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              </aside>

              {/* Main case study body */}
              <article className="min-w-0 flex-1 space-y-10">
                {/* Title block */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-mono text-[8px] uppercase",
                        STATUS_COLORS[selectedProject.status] ?? "",
                      )}
                    >
                      {selectedProject.status}
                    </Badge>
                    <Badge variant="secondary" className="font-mono text-[8px] uppercase">
                      {selectedProject.category}
                    </Badge>
                  </div>
                  <h1 className="text-foreground text-2xl leading-tight font-extrabold">
                    {selectedProject.title}
                  </h1>
                  <p className="text-muted-foreground text-xs">
                    {selectedProject.role} · {selectedProject.client} · {selectedProject.duration}
                  </p>
                </div>

                {/* 1. Executive Summary */}
                <section id="sec-summary" className="scroll-mt-24 space-y-4">
                  <CaseHeader label="01" title="Executive Summary" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card variant="solid" className="p-5">
                      <span className="text-muted-foreground mb-2 block font-mono text-[8px] uppercase">
                        The Problem
                      </span>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {selectedProject.problem}
                      </p>
                    </Card>
                    <Card variant="glow" className="p-5">
                      <span className="text-success mb-2 block font-mono text-[8px] uppercase">
                        Top Impact
                      </span>
                      <p className="text-foreground text-xs leading-relaxed font-medium">
                        {selectedProject.metrics[0]}
                      </p>
                    </Card>
                  </div>
                </section>

                {/* 2. Context */}
                <section id="sec-context" className="scroll-mt-24 space-y-4">
                  <CaseHeader label="02" title="Business Context & Customer Problem" />
                  <div className="bg-secondary/10 border-border/10 space-y-4 rounded-xl border p-5">
                    <div>
                      <span className="text-warning mb-2 flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase">
                        <ShieldAlert className="h-3.5 w-3.5" /> Business Context
                      </span>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {selectedProject.businessContext}
                      </p>
                    </div>
                    <div className="border-border/10 border-t pt-3">
                      <span className="text-primary mb-2 flex items-center gap-1.5 font-mono text-[8px] font-bold uppercase">
                        <Users className="h-3.5 w-3.5" /> Target Users
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.users.map((u) => (
                          <Badge key={u} variant="secondary" className="font-mono text-[8px]">
                            {u}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Research */}
                <section id="sec-research" className="scroll-mt-24 space-y-4">
                  <CaseHeader label="03" title="User Research & Pain Points" />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card variant="solid">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-foreground font-mono text-[9px] uppercase">
                          Research Methods
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedProject.research.map((r, i) => (
                          <div
                            key={i}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <ChevronRight className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0" />
                            {r}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card variant="solid">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-foreground font-mono text-[9px] uppercase">
                          Customer Pain Points
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedProject.painPoints.map((p, i) => (
                          <div
                            key={i}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <span className="bg-warning mt-1.5 h-2 w-2 shrink-0 rounded-full" />
                            {p}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 4. Requirements */}
                <section id="sec-requirements" className="scroll-mt-24 space-y-4">
                  <CaseHeader label="04" title="Requirements & User Stories" />
                  <Card variant="glass" className="mb-4 flex items-start gap-3 p-4">
                    <Workflow className="text-primary mt-0.5 h-5 w-5 shrink-0" />
                    <div className="text-muted-foreground text-xs">
                      <span className="text-foreground mb-1 block font-mono text-[8px] font-bold uppercase">
                        Prioritisation Framework
                      </span>
                      {selectedProject.prioritization}
                    </div>
                  </Card>
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div className="bg-secondary/10 border-border/10 space-y-2 rounded-xl border p-4">
                      <span className="text-foreground mb-3 block font-mono text-[9px] font-bold uppercase">
                        Functional Requirements
                      </span>
                      {selectedProject.requirements.map((r, i) => (
                        <div
                          key={i}
                          className="text-muted-foreground flex items-start gap-2 text-xs"
                        >
                          <CheckCircle className="text-success mt-0.5 h-3.5 w-3.5 shrink-0" /> {r}
                        </div>
                      ))}
                    </div>
                    <div className="bg-secondary/10 border-border/10 space-y-3 rounded-xl border p-4">
                      <span className="text-foreground mb-3 block font-mono text-[9px] font-bold uppercase">
                        User Stories
                      </span>
                      {selectedProject.userStories.map((s, i) => (
                        <p
                          key={i}
                          className="text-muted-foreground border-primary/30 border-l-2 pl-3 text-xs leading-relaxed italic"
                        >
                          "{s}"
                        </p>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 5. Roadmap */}
                <section id="sec-roadmap" className="scroll-mt-24 space-y-4">
                  <CaseHeader label="05" title="Product Roadmap" />
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {selectedProject.roadmap.map((phase, i) => (
                      <Card key={i} variant="solid" className="p-5">
                        <span className="text-primary mb-1 block font-mono text-[8px] uppercase">
                          Phase {i + 1}
                        </span>
                        <h4 className="text-foreground mb-3 text-[10px] leading-snug font-bold">
                          {phase.phase}
                        </h4>
                        <ul className="space-y-1.5">
                          {phase.deliverables.map((d, di) => (
                            <li
                              key={di}
                              className="text-muted-foreground flex items-start gap-1.5 text-[10px]"
                            >
                              <span className="bg-border mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                              {d}
                            </li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </section>

                {/* 6. Solution & Decisions */}
                <section id="sec-solution" className="scroll-mt-24 space-y-4">
                  <CaseHeader label="06" title="Solution & Technical Decisions" />
                  <div className="space-y-4">
                    <div className="bg-secondary/10 border-border/10 rounded-xl border p-5">
                      <span className="text-foreground mb-2 block font-mono text-[8px] font-bold uppercase">
                        Solution
                      </span>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {selectedProject.solution}
                      </p>
                      <div className="border-border/10 mt-3 border-t pt-3">
                        <span className="text-foreground mb-2 block font-mono text-[8px] font-bold uppercase">
                          Implementation
                        </span>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {selectedProject.implementation}
                        </p>
                      </div>
                    </div>
                    {selectedProject.decisions.map((d, i) => (
                      <Card key={i} variant="solid" className="p-5">
                        <div className="flex items-start gap-3">
                          <Star className="text-warning mt-0.5 h-4 w-4 shrink-0" />
                          <div>
                            <span className="text-foreground mb-1 block font-mono text-[9px] font-bold uppercase">
                              {d.title}
                            </span>
                            <p className="text-muted-foreground text-xs leading-relaxed">
                              {d.description}
                            </p>
                            <p className="text-muted-foreground border-warning/40 mt-2 border-l-2 pl-2 text-xs italic">
                              Trade-off: {d.tradeoff}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                    <div className="bg-secondary/10 border-border/10 rounded-xl border p-4">
                      <span className="text-foreground mb-2 block font-mono text-[8px] font-bold uppercase">
                        Scope Sacrifice
                      </span>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {selectedProject.tradeoffs}
                      </p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="text-muted-foreground self-center font-mono text-[9px] uppercase">
                        Stack:
                      </span>
                      {selectedProject.techStack.map((t) => (
                        <Badge key={t} variant="glass" className="font-mono text-[8px]">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 7. Impact */}
                <section id="sec-impact" className="scroll-mt-24 space-y-4">
                  <CaseHeader label="07" title="Business Impact & Metrics" />
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {selectedProject.metrics.map((m, i) => (
                        <Card key={i} variant="solid" className="flex items-start gap-3 p-4">
                          <TrendingUp className="text-success mt-0.5 h-4 w-4 shrink-0" />
                          <div>
                            <span className="text-success mb-0.5 block font-mono text-[8px] uppercase">
                              Metric {i + 1}
                            </span>
                            <p className="text-foreground text-xs leading-snug">{m}</p>
                          </div>
                        </Card>
                      ))}
                    </div>
                    <Card variant="solid">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-foreground font-mono text-[9px] uppercase">
                          Challenges Overcome
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedProject.challenges.map((c, i) => (
                          <div
                            key={i}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <span className="bg-border mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                            {c}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* 8. Lessons & Future */}
                <section id="sec-lessons" className="scroll-mt-24 space-y-4 pb-10">
                  <CaseHeader label="08" title="Lessons Learned & Future Improvements" />
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <Card variant="solid">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-foreground font-mono text-[9px] uppercase">
                          Retrospective
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedProject.lessonsLearned.map((l, i) => (
                          <div
                            key={i}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <span className="bg-border mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                            {l}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                    <Card variant="solid">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-foreground font-mono text-[9px] uppercase">
                          Future Roadmap
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {selectedProject.futureImprovements.map((f, i) => (
                          <div
                            key={i}
                            className="text-muted-foreground flex items-start gap-2 text-xs"
                          >
                            <Sparkles className="text-primary mt-0.5 h-3 w-3 shrink-0" />
                            {f}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </article>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
}

function CaseHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="border-border/20 mb-4 border-b pb-3">
      <span className="text-primary font-mono text-[9px] font-bold tracking-widest uppercase">
        {label}.
      </span>
      <h2 className="text-foreground mt-0.5 text-base font-extrabold">{title}</h2>
    </div>
  );
}
