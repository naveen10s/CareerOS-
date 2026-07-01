"use client";

import React, { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, CheckCircle, Sparkles, BookOpen, Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";

// --------------------------------------------------------
// Types
// --------------------------------------------------------
interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  level: number;
  years: number;
  projects: string[];
  experience: string[];
  technologies: string[];
  tools: string[];
  evidence: string[];
  learningStatus: string;
  certifications: string[];
  relatedSkills: string[];
  color: string;
}

// --------------------------------------------------------
// SkillLevelBar — animated horizontal progress bar
// --------------------------------------------------------
export const SkillLevelBar = memo(function SkillLevelBar({
  level,
  max = 5,
  color = "primary",
}: {
  level: number;
  max?: number;
  color?: string;
}) {
  const pct = Math.round((level / max) * 100);

  const colorMap: Record<string, string> = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    info: "bg-info",
  };
  const barColor = colorMap[color] ?? "bg-primary";

  return (
    <div
      className="bg-secondary/40 h-1.5 w-full overflow-hidden rounded-full"
      role="progressbar"
      aria-valuenow={level}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={cn("h-full rounded-full", barColor)}
      />
    </div>
  );
});

// --------------------------------------------------------
// SkillCard — compact card shown in the grid
// --------------------------------------------------------
export const SkillCard = memo(function SkillCard({
  skill,
  isSelected,
  onClick,
}: {
  skill: Skill;
  isSelected: boolean;
  onClick: () => void;
}) {
  const statusConfig: Record<string, { label: string; icon: React.ReactNode; cls: string }> = {
    mastered: {
      label: "Mastered",
      icon: <Star className="h-3 w-3" />,
      cls: "text-success border-success/20 bg-success/5",
    },
    learning: {
      label: "Learning",
      icon: <BookOpen className="h-3 w-3" />,
      cls: "text-warning border-warning/20 bg-warning/5",
    },
    planned: {
      label: "Planned",
      icon: <Clock className="h-3 w-3" />,
      cls: "text-muted-foreground border-border/20 bg-secondary/5",
    },
  };
  const status = statusConfig[skill.learningStatus] ?? statusConfig.mastered;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "bg-card focus-visible:ring-primary group w-full rounded-xl border p-5 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:outline-none",
        isSelected
          ? "border-primary/40 shadow-premium-sm"
          : "border-border/20 hover:border-border/40",
      )}
      aria-pressed={isSelected}
      aria-label={`View details for ${skill.name}`}
    >
      <div className="space-y-3">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <span className="text-muted-foreground font-mono text-[9px] tracking-wider uppercase">
            {skill.category.replace("-", " ")}
          </span>
          <Badge
            variant="outline"
            className={cn("flex shrink-0 items-center gap-1 font-mono text-[8px]", status.cls)}
          >
            {status.icon}
            {status.label}
          </Badge>
        </div>

        {/* Name */}
        <h3
          className={cn(
            "text-foreground group-hover:text-primary text-xs font-bold transition-colors",
            isSelected && "text-primary",
          )}
        >
          {skill.name}
        </h3>

        {/* Level bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between font-mono text-[9px]">
            <span className="text-muted-foreground">Proficiency</span>
            <span className="text-foreground font-bold">{skill.level}/5</span>
          </div>
          <SkillLevelBar level={skill.level} color={skill.color} />
        </div>

        {/* Quick metadata */}
        <div className="text-muted-foreground flex items-center justify-between font-mono text-[9px]">
          <span>{skill.years}y exp</span>
          <span>
            {skill.projects.length} project{skill.projects.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Tech chips — top 3 */}
        <div className="flex flex-wrap gap-1">
          {skill.technologies.slice(0, 3).map((t) => (
            <Badge key={t} variant="secondary" className="font-mono text-[8px]">
              {t}
            </Badge>
          ))}
          {skill.technologies.length > 3 && (
            <Badge variant="secondary" className="font-mono text-[8px]">
              +{skill.technologies.length - 3}
            </Badge>
          )}
        </div>
      </div>
    </motion.button>
  );
});

// --------------------------------------------------------
// SkillDetails — full evidence panel (right sidebar / modal)
// --------------------------------------------------------
export const SkillDetails = memo(function SkillDetails({
  skill,
  onClose,
}: {
  skill: Skill;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.25 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="space-y-2">
          <button
            onClick={onClose}
            className="text-primary flex items-center gap-1 font-mono text-[9px] hover:underline"
            aria-label="Close skill details"
          >
            ← BACK TO GRID
          </button>
          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-muted-foreground font-mono text-[9px] tracking-wider uppercase">
                {skill.category.replace(/-/g, " ")}
              </span>
              <h2 className="text-foreground mt-0.5 text-lg font-extrabold">{skill.name}</h2>
            </div>
            <span className="text-foreground font-mono text-2xl font-extrabold">
              {skill.level}/5
            </span>
          </div>
          <SkillLevelBar level={skill.level} color={skill.color} />
          <p className="text-muted-foreground pt-1 text-xs leading-relaxed">{skill.description}</p>
        </div>

        {/* Evidence blocks */}
        {skill.evidence.length > 0 && (
          <Card variant="solid">
            <CardHeader className="pb-2">
              <CardTitle className="text-foreground flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase">
                <Sparkles className="text-primary h-3.5 w-3.5" /> Proof of Impact
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {skill.evidence.map((ev, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed"
                  >
                    <CheckCircle className="text-success mt-0.5 h-4 w-4 shrink-0" />
                    {ev}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Experience */}
        {skill.experience.length > 0 && (
          <div className="space-y-2">
            <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
              Where Applied:
            </span>
            <div className="space-y-1.5">
              {skill.experience.map((exp, i) => (
                <div key={i} className="text-muted-foreground flex items-center gap-2 text-xs">
                  <ChevronRight className="text-primary h-3.5 w-3.5 shrink-0" />
                  {exp}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies + Tools side by side */}
        <div className="grid grid-cols-2 gap-4">
          {skill.technologies.length > 0 && (
            <div className="space-y-2">
              <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
                Technologies:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skill.technologies.map((t) => (
                  <Badge key={t} variant="glass" className="font-mono text-[8px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          {skill.tools.length > 0 && (
            <div className="space-y-2">
              <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
                Tools Used:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {skill.tools.map((t) => (
                  <Badge key={t} variant="secondary" className="font-mono text-[8px]">
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Certifications */}
        {skill.certifications.length > 0 && (
          <div className="space-y-2">
            <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
              Certifications:
            </span>
            <ul className="space-y-1">
              {skill.certifications.map((c, i) => (
                <li key={i} className="text-muted-foreground flex items-center gap-2 text-xs">
                  <Star className="text-warning h-3.5 w-3.5 shrink-0" /> {c}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
});

// --------------------------------------------------------
// CategoryFilter
// --------------------------------------------------------
const ALL_CATEGORIES = [
  { value: "all", label: "ALL" },
  { value: "product-management", label: "PRODUCT" },
  { value: "business-analysis", label: "ANALYSIS" },
  { value: "technical", label: "TECHNICAL" },
  { value: "analytics", label: "ANALYTICS" },
  { value: "databases", label: "DATABASES" },
  { value: "programming", label: "CODING" },
  { value: "leadership", label: "LEADERSHIP" },
  { value: "soft-skills", label: "SOFT SKILLS" },
  { value: "ai", label: "AI" },
  { value: "cloud", label: "CLOUD" },
];

export const CategoryFilter = memo(function CategoryFilter({
  active,
  onChange,
  counts,
}: {
  active: string;
  onChange: (v: string) => void;
  counts: Record<string, number>;
}) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="group"
      aria-label="Filter skills by category"
    >
      {ALL_CATEGORIES.map(({ value, label }) => {
        const count =
          value === "all" ? Object.values(counts).reduce((a, b) => a + b, 0) : (counts[value] ?? 0);
        if (value !== "all" && count === 0) return null;
        return (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-all",
              active === value
                ? "bg-primary text-primary-foreground border-primary"
                : "text-muted-foreground border-border/20 hover:border-border/50 hover:text-foreground bg-transparent",
            )}
            aria-pressed={active === value}
          >
            {label}
            <span
              className={cn(
                "rounded px-1 py-0 text-[8px]",
                active === value ? "bg-white/20" : "bg-secondary/50",
              )}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
});

// --------------------------------------------------------
// SkillSearchBar
// --------------------------------------------------------
export const SkillSearchBar = memo(function SkillSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="relative w-full max-w-sm">
      <svg
        className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
        />
      </svg>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search skills, technologies, tools..."
        className="bg-background/50 border-border/20 focus:ring-primary focus:border-primary text-foreground w-full rounded-lg border py-2 pr-4 pl-9 text-xs transition-colors focus:ring-1 focus:outline-none"
        aria-label="Search skills"
      />
    </div>
  );
});

// --------------------------------------------------------
// ProgressCard — top-level dashboard stat widget
// --------------------------------------------------------
export const ProgressCard = memo(function ProgressCard({
  label,
  value,
  sub,
  highlight = false,
}: {
  label: string;
  value: string | number;
  sub?: string;
  highlight?: boolean;
}) {
  return (
    <Card variant={highlight ? "glow" : "solid"} className="flex flex-col justify-between p-5">
      <span className="text-muted-foreground font-mono text-[9px] tracking-wider uppercase">
        {label}
      </span>
      <div className="mt-2">
        <span className="text-foreground font-mono text-2xl font-extrabold">{value}</span>
        {sub && (
          <span className="text-muted-foreground mt-0.5 block font-mono text-[9px]">{sub}</span>
        )}
      </div>
    </Card>
  );
});
