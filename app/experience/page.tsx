"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  CheckCircle,
  Code2,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";
import experienceData from "@/data/experience.json";

type Experience = (typeof experienceData.example)[number];

const FILTERS = ["All", "Current", "Previous"];

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) => {
    if (d === "Present") return "Present";
    const [y, m] = d.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[parseInt(m) - 1]} ${y}`;
  };
  return `${fmt(start)} → ${fmt(end)}`;
}

function calcDuration(start: string, end: string): string {
  const s = new Date(start + "-01");
  const e = end === "Present" ? new Date() : new Date(end + "-01");
  const months = (e.getFullYear() - s.getFullYear()) * 12 + (e.getMonth() - s.getMonth());
  const y = Math.floor(months / 12);
  const m = months % 12;
  return [y > 0 ? `${y}y` : null, m > 0 ? `${m}mo` : null].filter(Boolean).join(" ");
}

export default function ExperiencePage() {
  const experiences = experienceData.example as Experience[];
  const [activeFilter, setActiveFilter] = useState("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "exp-1": true });

  const filtered = useMemo(() => {
    return experiences.filter((e) => {
      if (activeFilter === "Current") return e.isCurrent;
      if (activeFilter === "Previous") return !e.isCurrent;
      return true;
    });
  }, [experiences, activeFilter]);

  const toggle = (id: string) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-3"
        >
          <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
            <Briefcase className="text-primary h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                Professional History
              </span>
              <span className="bg-primary/20 h-px w-8" />
              <span className="text-muted-foreground font-mono text-[9px]">
                {experiences.length} Roles
              </span>
            </div>
            <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
              Work Experience
            </h1>
            <p className="text-muted-foreground mt-1 max-w-2xl text-xs leading-relaxed">
              4+ years across business analysis, data engineering, and product ownership. Each role
              builds on the last — converging toward product management.
            </p>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {[
            {
              label: "Roles",
              value: experiences.length,
              icon: <Briefcase className="text-primary h-4 w-4" />,
            },
            {
              label: "Years Active",
              value: "4+",
              icon: <Calendar className="text-success h-4 w-4" />,
            },
            {
              label: "Companies",
              value: new Set(experiences.map((e) => e.company)).size,
              icon: <TrendingUp className="text-warning h-4 w-4" />,
            },
            {
              label: "Impact Points",
              value: experiences.flatMap((e) => e.impactMetrics).length,
              icon: <CheckCircle className="text-info h-4 w-4" />,
            },
          ].map((s) => (
            <Card key={s.label} variant="solid" className="flex items-center gap-3 p-4">
              <div className="bg-secondary/40 border-border/15 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
                {s.icon}
              </div>
              <div>
                <div className="text-foreground font-mono text-xl font-extrabold">{s.value}</div>
                <div className="text-muted-foreground font-mono text-[9px] uppercase">
                  {s.label}
                </div>
              </div>
            </Card>
          ))}
        </motion.div>

        {/* Filter pills */}
        <div className="flex gap-2" role="group" aria-label="Filter by employment status">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "rounded-lg border px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-all",
                activeFilter === f
                  ? "bg-primary text-primary-foreground border-primary"
                  : "text-muted-foreground border-border/20 hover:border-border/50 hover:text-foreground bg-transparent",
              )}
              aria-pressed={activeFilter === f}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Experience timeline */}
        <div className="relative space-y-6">
          {/* Vertical track */}
          <div
            className="bg-border/20 absolute top-3 bottom-3 left-4 hidden w-px md:block"
            aria-hidden
          />

          {filtered.map((exp, i) => {
            const isOpen = expanded[exp.id] ?? false;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.07 }}
                className="relative md:pl-12"
              >
                {/* Timeline dot */}
                <span
                  className={cn(
                    "border-background absolute top-5 left-1.5 hidden h-5 w-5 items-center justify-center rounded-full border-2 md:flex",
                    exp.isCurrent ? "bg-success" : "bg-primary/40",
                  )}
                  aria-hidden
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      exp.isCurrent ? "bg-white" : "bg-primary",
                    )}
                  />
                </span>

                <Card variant="solid" className="overflow-hidden">
                  {/* Header row — always visible */}
                  <button
                    onClick={() => toggle(exp.id)}
                    className="w-full text-left"
                    aria-expanded={isOpen}
                    aria-controls={`exp-body-${exp.id}`}
                  >
                    <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-start">
                      <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-2">
                          {exp.isCurrent && (
                            <Badge variant="growth" className="text-[8px]">
                              Current
                            </Badge>
                          )}
                          <span className="text-muted-foreground font-mono text-[9px] uppercase">
                            {formatDateRange(exp.startDate, exp.endDate)}
                          </span>
                          <span className="text-muted-foreground font-mono text-[9px]">
                            · {calcDuration(exp.startDate, exp.endDate)}
                          </span>
                        </div>
                        <h2 className="text-foreground text-sm font-bold">{exp.role}</h2>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-2 font-mono text-[9px]">
                          <span className="flex items-center gap-1">
                            <Briefcase className="h-3 w-3" />
                            {exp.company}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {exp.location}
                          </span>
                        </div>
                        {exp.summary && (
                          <p className="text-muted-foreground max-w-xl pt-1 text-xs leading-relaxed">
                            {exp.summary}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        <div className="flex max-w-[200px] flex-wrap justify-end gap-1">
                          {exp.pmKeywords.slice(0, 2).map((k) => (
                            <Badge key={k} variant="default" className="text-[7px]">
                              {k}
                            </Badge>
                          ))}
                        </div>
                        {isOpen ? (
                          <ChevronUp className="text-muted-foreground h-4 w-4 shrink-0" />
                        ) : (
                          <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Expanded body */}
                  <motion.div
                    id={`exp-body-${exp.id}`}
                    initial={false}
                    animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="border-border/10 space-y-6 border-t px-5 pt-5 pb-6">
                      {/* Responsibilities */}
                      <div className="space-y-2">
                        <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
                          Key Responsibilities
                        </span>
                        <ul className="space-y-1.5">
                          {exp.responsibilities.map((r, ri) => (
                            <li
                              key={ri}
                              className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed"
                            >
                              <ChevronDown className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0 -rotate-90" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* PM + BA keywords */}
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <span className="text-foreground mb-2 block font-mono text-[9px] font-bold uppercase">
                            PM Skills Applied
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.pmKeywords.map((k) => (
                              <Badge key={k} variant="default" className="text-[8px]">
                                {k}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-foreground mb-2 block font-mono text-[9px] font-bold uppercase">
                            BA Tools & Methods
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.baKeywords.map((k) => (
                              <Badge key={k} variant="secondary" className="text-[8px]">
                                {k}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Impact metrics */}
                      <div>
                        <span className="text-foreground mb-2 block font-mono text-[9px] font-bold uppercase">
                          Measurable Impact
                        </span>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                          {exp.impactMetrics.map((m, mi) => (
                            <div
                              key={mi}
                              className="bg-success/5 border-success/15 flex items-start gap-2 rounded-lg border p-3"
                            >
                              <TrendingUp className="text-success mt-0.5 h-3.5 w-3.5 shrink-0" />
                              <span className="text-foreground text-xs leading-snug">{m}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tech stack */}
                      {exp.techStack && exp.techStack.length > 0 && (
                        <div>
                          <span className="text-foreground mb-2 block flex items-center gap-1.5 font-mono text-[9px] font-bold uppercase">
                            <Code2 className="h-3.5 w-3.5" /> Tech Stack
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {exp.techStack.map((t) => (
                              <Badge key={t} variant="glass" className="font-mono text-[8px]">
                                {t}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
