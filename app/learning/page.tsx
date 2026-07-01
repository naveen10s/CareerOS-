"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Award,
  CheckCircle,
  Clock,
  PlayCircle,
  ExternalLink,
  Filter,
  TrendingUp,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";
import learningData from "@/data/learning.json";
import certificationsData from "@/data/certifications.json";

type LearningItem = (typeof learningData.example)[number];
type Cert = (typeof certificationsData.example)[number];

const STATUS_CONFIG: Record<
  string,
  { label: string; icon: React.ReactNode; bar: string; badge: string }
> = {
  completed: {
    label: "Completed",
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    bar: "bg-success",
    badge: "text-success border-success/20 bg-success/5",
  },
  "in-progress": {
    label: "In Progress",
    icon: <PlayCircle className="h-3.5 w-3.5" />,
    bar: "bg-warning",
    badge: "text-warning border-warning/20 bg-warning/5",
  },
  planned: {
    label: "Planned",
    icon: <Clock className="h-3.5 w-3.5" />,
    bar: "bg-secondary/40",
    badge: "text-muted-foreground border-border/20 bg-secondary/5",
  },
};

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  certification: <Award className="text-warning h-4 w-4" />,
  course: <BookOpen className="text-primary h-4 w-4" />,
};

const FILTERS = ["All", "Completed", "In Progress", "Planned"];

export default function LearningPage() {
  const items = learningData.example as LearningItem[];
  const certs = certificationsData.example as Cert[];
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchStatus =
        activeFilter === "All" ||
        (activeFilter === "Completed" && item.status === "completed") ||
        (activeFilter === "In Progress" && item.status === "in-progress") ||
        (activeFilter === "Planned" && item.status === "planned");
      const matchCat = activeCategory === "All" || item.category === activeCategory;
      return matchStatus && matchCat;
    });
  }, [items, activeFilter, activeCategory]);

  const completed = items.filter((i) => i.status === "completed").length;
  const inProgress = items.filter((i) => i.status === "in-progress").length;
  const totalHours = 320; // from analytics
  const completionPct = Math.round((completed / items.length) * 100);

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
            <BookOpen className="text-primary h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                Knowledge Layer
              </span>
              <span className="bg-primary/20 h-px w-8" />
              <span className="text-muted-foreground font-mono text-[9px]">
                {items.length} Learning Tracks
              </span>
            </div>
            <h1 className="text-foreground text-2xl font-extrabold tracking-tight">Learning Hub</h1>
            <p className="text-muted-foreground mt-1 max-w-2xl text-xs leading-relaxed">
              Continuous learning fuels the BA→PM transition. Every course and certification is
              mapped to specific PM skills and career outcomes.
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
              label: "Completed",
              value: completed,
              icon: <CheckCircle className="text-success h-4 w-4" />,
              highlight: false,
            },
            {
              label: "In Progress",
              value: inProgress,
              icon: <PlayCircle className="text-warning h-4 w-4" />,
              highlight: false,
            },
            {
              label: "Learning Hours",
              value: `${totalHours}+`,
              icon: <Clock className="text-primary h-4 w-4" />,
              highlight: true,
            },
            {
              label: "Completion",
              value: `${completionPct}%`,
              icon: <TrendingUp className="text-info h-4 w-4" />,
              highlight: false,
            },
          ].map((s) => (
            <Card
              key={s.label}
              variant={s.highlight ? "glow" : "solid"}
              className="flex items-center gap-3 p-4"
            >
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

        {/* Filters */}
        <div className="bg-secondary/10 border-border/10 flex flex-col gap-4 rounded-xl border p-4 sm:flex-row">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by status">
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
          <div
            className="flex flex-wrap gap-2 sm:ml-auto"
            role="group"
            aria-label="Filter by category"
          >
            {["All", "certification", "course"].map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn(
                  "rounded-lg border px-3 py-1.5 font-mono text-[9px] tracking-wider uppercase transition-all",
                  activeCategory === c
                    ? "bg-secondary text-foreground border-border/50"
                    : "text-muted-foreground border-border/20 hover:border-border/50 hover:text-foreground bg-transparent",
                )}
              >
                {c === "All" ? "All Types" : c}
              </button>
            ))}
          </div>
        </div>

        {/* Progress tracks */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground font-mono text-[10px] uppercase">
              {filtered.length} Track{filtered.length !== 1 ? "s" : ""} Matched
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filtered.map((item, i) => {
              const cfg = STATUS_CONFIG[item.status] ?? STATUS_CONFIG.planned;
              const catIcon = CATEGORY_ICONS[item.category] ?? (
                <BookOpen className="text-primary h-4 w-4" />
              );

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Card variant="solid" className="p-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      {/* Left: metadata */}
                      <div className="flex min-w-0 flex-1 items-start gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                            item.category === "certification"
                              ? "bg-warning/10 border-warning/20"
                              : "bg-primary/10 border-primary/20",
                          )}
                        >
                          {catIcon}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className={cn(
                                "flex items-center gap-1 font-mono text-[8px]",
                                cfg.badge,
                              )}
                            >
                              {cfg.icon} {cfg.label}
                            </Badge>
                            <Badge variant="secondary" className="font-mono text-[8px] uppercase">
                              {item.category}
                            </Badge>
                          </div>
                          <h3 className="text-foreground text-xs leading-snug font-bold">
                            {item.topic}
                          </h3>
                          <p className="text-muted-foreground font-mono text-[9px]">
                            {item.platform}
                          </p>
                          <p className="text-muted-foreground max-w-lg pt-1 text-[10px] leading-relaxed">
                            {item.relevance}
                          </p>
                        </div>
                      </div>

                      {/* Right: progress + dates */}
                      <div className="shrink-0 space-y-2 sm:text-right">
                        <div className="text-foreground font-mono text-2xl font-extrabold">
                          {item.progress}%
                        </div>
                        {item.completedDate && (
                          <div className="text-muted-foreground font-mono text-[9px]">
                            Completed {item.completedDate}
                          </div>
                        )}
                        {!item.completedDate && item.targetDate && (
                          <div className="text-muted-foreground font-mono text-[9px]">
                            Target: {item.targetDate}
                          </div>
                        )}
                        {item.certificate && (
                          <div className="text-warning flex items-center justify-end gap-1 font-mono text-[9px] sm:justify-end">
                            <Award className="h-3 w-3" /> Certificate
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress bar */}
                    <div className="mt-4 space-y-1">
                      <div className="bg-secondary/30 h-1.5 w-full overflow-hidden rounded-full">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.progress}%` }}
                          transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
                          className={cn("h-full rounded-full", cfg.bar)}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Certifications earned & Certificate Gallery section */}
        {certs.length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Award className="text-warning h-4 w-4" />
              <span className="text-foreground font-mono text-[10px] font-bold uppercase">
                Certifications Gallery & Verification
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {certs.map((cert, i) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  whileHover={{ y: -2 }}
                  className="group"
                >
                  <Card
                    variant="solid"
                    className="hover:border-warning/30 flex items-start gap-4 p-5 transition-all"
                  >
                    <div className="bg-warning/10 border-warning/20 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-transform group-hover:scale-105">
                      <Award className="text-warning h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <h4 className="text-foreground text-xs leading-snug font-bold">
                        {cert.name}
                      </h4>
                      <p className="text-muted-foreground font-mono text-[9px]">
                        {cert.issuer} · Issued {cert.date}
                      </p>
                      {cert.credentialId && (
                        <code className="bg-secondary/40 text-muted-foreground/90 border-border/10 rounded border px-1.5 py-0.5 font-mono text-[8px]">
                          ID: {cert.credentialId}
                        </code>
                      )}

                      {/* Visual Mock Certificate Frame */}
                      <div className="bg-background/40 border-border/10 mt-3 origin-top-left scale-95 overflow-hidden rounded-lg border p-2 pt-3 text-center transition-transform group-hover:scale-100">
                        <div className="border-warning/25 rounded border p-1">
                          <span className="text-warning block font-mono text-[7px] font-bold tracking-widest uppercase">
                            Official Accreditation
                          </span>
                          <span className="text-foreground mt-1 block font-serif text-[8px] italic">
                            Alex Mercer
                          </span>
                          <span className="text-muted-foreground/80 mt-0.5 block text-[6px]">
                            validated credentials & verified metadata
                          </span>
                        </div>
                      </div>
                    </div>
                    {cert.credentialUrl && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 pt-1 transition-colors"
                        aria-label={`Verify ${cert.name} online`}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Books & Reading Hub Section */}
        {((learningData as any).books || []).length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="text-primary h-4 w-4" />
              <span className="text-foreground font-mono text-[10px] font-bold uppercase">
                Product & Tech Reading Stack
              </span>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {(learningData as any).books.map((book: any, i: number) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <Card
                    variant="solid"
                    className="flex h-full flex-col justify-between space-y-3 p-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="font-mono text-[7px] uppercase">
                          {book.category}
                        </Badge>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "font-mono text-[7px] uppercase",
                            book.status === "completed" &&
                              "text-success bg-success/5 border-success/15",
                            book.status === "reading" &&
                              "text-warning bg-warning/5 border-warning/15",
                            book.status === "planned" &&
                              "text-muted-foreground bg-secondary/5 border-border/15",
                          )}
                        >
                          {book.status === "reading" ? "Reading Now" : book.status}
                        </Badge>
                      </div>
                      <h4 className="text-foreground text-xs leading-snug font-bold">
                        {book.title}
                      </h4>
                      <p className="text-muted-foreground font-mono text-[9px]">by {book.author}</p>
                      <p className="text-muted-foreground pt-1 text-[10px] leading-relaxed">
                        {book.relevance}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Roadmap Checklist Section */}
        {((learningData as any).roadmap || []).length > 0 && (
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-success h-4 w-4" />
              <span className="text-foreground font-mono text-[10px] font-bold uppercase">
                Target Transition Learning Roadmap
              </span>
            </div>
            <Card variant="solid" className="p-5">
              <div className="border-border/40 relative space-y-6 border-l-2 pl-4">
                {(learningData as any).roadmap.map((road: any, i: number) => (
                  <div key={road.id} className="relative">
                    {/* Circle Node indicator */}
                    <span className="bg-background border-border/50 absolute top-1 -left-[23px] flex h-4.5 w-4.5 items-center justify-center rounded-full border">
                      <span className="bg-primary/60 h-2 w-2 rounded-full" />
                    </span>
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <div>
                        <h4 className="text-foreground text-xs font-bold">{road.title}</h4>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {road.skills.map((skill: string) => (
                            <Badge key={skill} variant="outline" className="font-mono text-[8px]">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="shrink-0">
                        <span className="bg-secondary text-foreground border-border/10 rounded border px-2 py-0.5 font-mono text-[9px]">
                          {road.quarter}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}
      </div>
    </DashboardLayout>
  );
}
