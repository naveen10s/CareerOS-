"use client";

import React, { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrainCircuit, Filter, SlidersHorizontal, Network, Layers } from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { cn } from "@/lib/utils";
import { Card } from "@/components/cards/card";
import {
  SkillCard,
  SkillDetails,
  CategoryFilter,
  SkillSearchBar,
  ProgressCard,
} from "@/features/skills/skill-components";
import {
  SkillRadarChart,
  CategoryBarChart,
  LearningProgressChart,
} from "@/features/skills/skill-charts";

// Import raw JSON data
import rawSkills from "@/data/skills/example.json";

// --------------------------------------------------------
// Derived type from JSON
// --------------------------------------------------------
type Skill = (typeof rawSkills)[number];

const LEVEL_LABELS: Record<number, string> = {
  1: "Beginner",
  2: "Familiar",
  3: "Intermediate",
  4: "Advanced",
  5: "Expert",
};

// --------------------------------------------------------
// Page
// --------------------------------------------------------
export default function SkillsPage() {
  const skills = rawSkills as Skill[];

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showViz, setShowViz] = useState(true);

  // -------- Derived data --------
  const categoryCounts = useMemo(() => {
    return skills.reduce<Record<string, number>>((acc, s) => {
      acc[s.category] = (acc[s.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [skills]);

  const filteredSkills = useMemo(() => {
    return skills.filter((s) => {
      const q = searchQuery.toLowerCase();
      const matchSearch =
        q === "" ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.technologies.some((t) => t.toLowerCase().includes(q)) ||
        s.tools.some((t) => t.toLowerCase().includes(q));
      const matchCategory = activeCategory === "all" || s.category === activeCategory;
      const matchLevel = levelFilter === "all" || s.level === Number(levelFilter);
      const matchStatus = statusFilter === "all" || s.learningStatus === statusFilter;
      return matchSearch && matchCategory && matchLevel && matchStatus;
    });
  }, [skills, searchQuery, activeCategory, levelFilter, statusFilter]);

  // -------- Radar data --------
  const radarData = useMemo(() => {
    const grouped: Record<string, number[]> = {};
    skills.forEach((s) => {
      const cat = s.category.replace(/-/g, " ");
      grouped[cat] = grouped[cat] ?? [];
      grouped[cat].push(s.level);
    });
    return Object.entries(grouped).map(([category, levels]) => ({
      category: category.replace("management", "mgmt").toUpperCase().slice(0, 9),
      average: Math.round((levels.reduce((a, b) => a + b, 0) / levels.length) * 10) / 10,
    }));
  }, [skills]);

  // -------- Category bar data --------
  const categoryBarData = useMemo(() => {
    return Object.entries(categoryCounts).map(([category, count]) => ({
      category: category.replace(/-/g, " ").replace("management", "mgmt").toUpperCase().slice(0, 8),
      count,
    }));
  }, [categoryCounts]);

  // -------- Learning progress data --------
  const learningProgressData = useMemo(() => {
    const counts = skills.reduce<Record<string, number>>((acc, s) => {
      acc[s.learningStatus] = (acc[s.learningStatus] ?? 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [skills]);

  // -------- Dashboard stats --------
  const totalSkills = skills.length;
  const currentlyLearning = skills.filter((s) => s.learningStatus === "learning").length;
  const mastered = skills.filter((s) => s.learningStatus === "mastered").length;
  const totalProjects = [...new Set(skills.flatMap((s) => s.projects))].length;
  const avgLevel = Math.round((skills.reduce((a, s) => a + s.level, 0) / totalSkills) * 10) / 10;

  const handleSelectSkill = useCallback((s: Skill) => {
    setSelectedSkill((prev) => (prev?.id === s.id ? null : s));
  }, []);

  const handleCloseDetail = useCallback(() => setSelectedSkill(null), []);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-20">
        {/* ── Page Header ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 border-primary/20 flex h-8 w-8 items-center justify-center rounded-lg border">
              <BrainCircuit className="text-primary h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                  Intelligence Layer
                </span>
                <span className="bg-primary/20 h-px w-8" />
                <span className="text-muted-foreground font-mono text-[9px] uppercase">
                  {totalSkills} Capabilities
                </span>
              </div>
              <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
                Skills Intelligence Dashboard
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
            Every skill verified by evidence — linked to projects, business impact, and real-world
            outcomes. Not a skill list. A capability intelligence layer.
          </p>
        </motion.div>

        {/* ── Top Stats Cards ──────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5"
        >
          <ProgressCard
            label="Total Skills"
            value={totalSkills}
            sub="Verified capabilities"
            highlight
          />
          <ProgressCard
            label="Currently Learning"
            value={currentlyLearning}
            sub="Active skill tracks"
          />
          <ProgressCard label="Mastered" value={mastered} sub="Proven by evidence" />
          <ProgressCard label="Projects Mapped" value={totalProjects} sub="Linked case studies" />
          <ProgressCard
            label="Avg Proficiency"
            value={`${avgLevel}/5`}
            sub={LEVEL_LABELS[Math.round(avgLevel)] ?? "Expert"}
          />
        </motion.div>

        {/* ── Visualisation Panel ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.14 }}
        >
          {/* Toggle */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground font-mono text-[10px] uppercase">
                Intelligence Visualisations
              </span>
            </div>
            <button
              onClick={() => setShowViz((v) => !v)}
              className="text-primary flex items-center gap-1 font-mono text-[9px] hover:underline"
              aria-expanded={showViz}
              aria-controls="viz-panel"
            >
              {showViz ? "COLLAPSE ▲" : "EXPAND ▼"}
            </button>
          </div>

          <AnimatePresence>
            {showViz && (
              <motion.div
                id="viz-panel"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 gap-4 overflow-hidden md:grid-cols-3"
              >
                <SkillRadarChart data={radarData} />
                <CategoryBarChart data={categoryBarData} />
                <LearningProgressChart data={learningProgressData} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Toolbar ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-4"
        >
          <div className="bg-secondary/10 border-border/10 flex flex-col items-stretch gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
            <SkillSearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="flex shrink-0 gap-2">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="bg-background/50 border-border/20 focus:border-primary text-foreground rounded-lg border px-3 py-2 font-mono text-[9px] uppercase focus:outline-none"
                aria-label="Filter by proficiency level"
              >
                <option value="all">ALL LEVELS</option>
                {[5, 4, 3, 2, 1].map((l) => (
                  <option key={l} value={l}>
                    {LEVEL_LABELS[l].toUpperCase()} ({l}/5)
                  </option>
                ))}
              </select>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-background/50 border-border/20 focus:border-primary text-foreground rounded-lg border px-3 py-2 font-mono text-[9px] uppercase focus:outline-none"
                aria-label="Filter by learning status"
              >
                <option value="all">ALL STATUSES</option>
                <option value="mastered">MASTERED</option>
                <option value="learning">LEARNING</option>
                <option value="planned">PLANNED</option>
              </select>
            </div>
          </div>

          <CategoryFilter
            active={activeCategory}
            onChange={(v) => {
              setActiveCategory(v);
              setSelectedSkill(null);
            }}
            counts={categoryCounts}
          />

          {/* Result count */}
          <div className="flex items-center gap-2">
            <Layers className="text-muted-foreground h-3.5 w-3.5" />
            <span className="text-muted-foreground font-mono text-[9px]">
              {filteredSkills.length} SKILL{filteredSkills.length !== 1 ? "S" : ""} MATCHED
              {(activeCategory !== "all" ||
                searchQuery ||
                levelFilter !== "all" ||
                statusFilter !== "all") && (
                <button
                  onClick={() => {
                    setActiveCategory("all");
                    setSearchQuery("");
                    setLevelFilter("all");
                    setStatusFilter("all");
                    setSelectedSkill(null);
                  }}
                  className="text-primary ml-3 hover:underline"
                >
                  CLEAR FILTERS
                </button>
              )}
            </span>
          </div>
        </motion.div>

        {/* ── Main Content: Grid + Details ─────────────────────── */}
        <div
          className={cn(
            "grid gap-8 transition-all duration-300",
            selectedSkill ? "grid-cols-1 lg:grid-cols-[1fr_360px]" : "grid-cols-1",
          )}
        >
          {/* Skill Grid */}
          <div>
            <AnimatePresence mode="wait">
              {filteredSkills.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-muted-foreground border-border/10 rounded-xl border py-20 text-center font-mono text-xs"
                >
                  NO SKILLS MATCH YOUR CURRENT FILTERS.
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={cn(
                    "grid gap-4 transition-all",
                    selectedSkill
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
                  )}
                >
                  {filteredSkills.map((skill, i) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <SkillCard
                        skill={skill}
                        isSelected={selectedSkill?.id === skill.id}
                        onClick={() => handleSelectSkill(skill)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Skill Details Panel */}
          <AnimatePresence>
            {selectedSkill && (
              <motion.aside
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="lg:sticky lg:top-24 lg:self-start"
              >
                <Card variant="glass" className="p-6">
                  <SkillDetails skill={selectedSkill} onClose={handleCloseDetail} />
                </Card>
              </motion.aside>
            )}
          </AnimatePresence>
        </div>
      </div>
    </DashboardLayout>
  );
}
