"use client";

import React, { useState } from "react";
import {
  Briefcase,
  BookOpen,
  Award,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
  Search,
  Compass,
  CheckCircle,
  Flag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Button from "@/components/buttons/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";

// ----------------------------------------------------
// TIMELINE FILTER COMPONENT
// ----------------------------------------------------
interface TimelineFilterProps {
  activeFilter: string;
  onChange: (filter: string) => void;
  categories: string[];
}

export function TimelineFilter({ activeFilter, onChange, categories }: TimelineFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-muted-foreground mr-2 font-mono text-[10px] uppercase">
        Filter Matrix:
      </span>
      <Button
        variant={activeFilter === "all" ? "default" : "glass"}
        size="sm"
        onClick={() => onChange("all")}
        className="font-mono text-[10px]"
      >
        ALL RESOLUTIONS
      </Button>
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={activeFilter === cat ? "default" : "glass"}
          size="sm"
          onClick={() => onChange(cat)}
          className="font-mono text-[10px] uppercase"
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}

// ----------------------------------------------------
// TIMELINE LEGEND COMPONENT
// ----------------------------------------------------
export function TimelineLegend() {
  return (
    <div className="text-muted-foreground border-border/10 flex flex-wrap items-center gap-4 border-t pt-4 font-mono text-[9px] uppercase">
      <span className="text-foreground font-bold">Legend:</span>
      <div className="flex items-center gap-1.5">
        <span className="bg-success ring-success/15 h-2 w-2 rounded-full ring-4" />
        <span>Current Anchor</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="bg-primary h-2 w-2 rounded-full" />
        <span>Completed Path</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="bg-warning ring-warning/15 h-2 w-2 rounded-full ring-4" />
        <span>Future Target</span>
      </div>
      <div className="flex items-center gap-1.5">
        <Sparkles className="text-primary h-3 w-3" />
        <span>Core Milestone</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// TIMELINE TOOLBAR COMPONENT
// ----------------------------------------------------
interface TimelineToolbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isAllExpanded: boolean;
  onToggleExpandAll: () => void;
}

export function TimelineToolbar({
  searchQuery,
  onSearchChange,
  isAllExpanded,
  onToggleExpandAll,
}: TimelineToolbarProps) {
  return (
    <div className="bg-secondary/10 border-border/10 flex flex-col items-stretch justify-between gap-4 rounded-xl border p-4 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Query timeline capabilities, skills, or tech..."
          className="bg-background/50 border-border/20 focus:border-primary text-foreground w-full rounded-lg border py-2 pr-4 pl-9 text-xs transition-colors focus:outline-none"
        />
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onToggleExpandAll}
        className="shrink-0 font-mono text-[10px]"
      >
        {isAllExpanded ? "COLLAPSE ALL NODES" : "EXPAND ALL NODES"}
      </Button>
    </div>
  );
}

// ----------------------------------------------------
// TIMELINE CARD COMPONENT (EXPANDABLE)
// ----------------------------------------------------
interface TimelineCardProps {
  item: any;
  isExpanded: boolean;
  onToggle: () => void;
}

export function TimelineCard({ item, isExpanded, onToggle }: TimelineCardProps) {
  // Category-based coloring overrides
  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "experience":
        return "text-primary border-primary/20 bg-primary/5";
      case "certification":
        return "text-success border-success/20 bg-success/5";
      case "learning":
        return "text-warning border-warning/20 bg-warning/5";
      default:
        return "text-muted-foreground border-border/20 bg-secondary/5";
    }
  };

  const getStatusColor = (status: string) => {
    if (status === "current") return "border-success/30 text-success";
    if (status === "future") return "border-warning/30 text-warning";
    return "border-border/20 text-muted-foreground";
  };

  return (
    <Card
      variant={item.status === "current" ? "glow" : "solid"}
      className={cn(
        "duration-normal group w-full transition-all",
        item.status === "current" && "border-success/20",
      )}
    >
      <CardHeader className="cursor-pointer pb-3 select-none" onClick={onToggle}>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground font-mono text-[9px] tracking-wider uppercase">
                {item.startDate}{" "}
                {item.endDate !== "Present" && item.endDate !== "Future" ? `➔ ${item.endDate}` : ""}
              </span>
              <Badge
                variant="glass"
                className={cn("font-mono text-[9px]", getCategoryColor(item.category))}
              >
                {item.category}
              </Badge>
              {item.status !== "past" && (
                <Badge
                  variant="outline"
                  className={cn("font-mono text-[8px] uppercase", getStatusColor(item.status))}
                >
                  {item.status}
                </Badge>
              )}
            </div>

            <CardTitle className="text-foreground group-hover:text-primary mt-1 flex items-center gap-1.5 text-sm font-bold transition-colors">
              {item.title}
              {item.milestone && <Sparkles className="text-primary h-3.5 w-3.5 shrink-0" />}
            </CardTitle>

            <p className="text-text-primary text-xs font-semibold">
              {item.company} {item.subtitle ? `· ${item.subtitle}` : ""}
            </p>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground h-7 w-7 shrink-0 self-start"
          >
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div className="text-muted-foreground flex items-center gap-3 pt-1.5 font-mono text-[9px]">
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3" /> {item.location}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        <p className="text-muted-foreground text-xs leading-relaxed">{item.description}</p>

        {/* Expandable details segment */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="border-border/10 space-y-4 overflow-hidden border-t pt-2"
            >
              {/* Achievements Checklist */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-foreground block font-mono text-[9px] font-bold uppercase">
                    Core Business Impact:
                  </span>
                  <ul className="space-y-1.5">
                    {item.achievements.map((ach: string, idx: number) => (
                      <li
                        key={idx}
                        className="text-muted-foreground flex items-start gap-2 text-xs leading-relaxed"
                      >
                        <CheckCircle className="text-success mt-0.5 h-4 w-4 shrink-0" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Skills and Tech Grid */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {item.skills && item.skills.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-primary block font-mono text-[9px] font-bold uppercase">
                      Capabilities Applied:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.skills.map((skill: string) => (
                        <Badge key={skill} variant="glass" className="text-[9px]">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {item.technologies && item.technologies.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-success block font-mono text-[9px] font-bold uppercase">
                      Tooling Stack:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.technologies.map((tech: string) => (
                        <Badge key={tech} variant="secondary" className="text-[9px]">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Links CTA array */}
              {item.links && item.links.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.links.map((link: any, idx: number) => (
                    <a
                      key={idx}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary inline-flex items-center gap-1.5 font-mono text-[9px] hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> {link.label}
                    </a>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------
// TIMELINE NODE BULLET
// ----------------------------------------------------
interface TimelineNodeProps {
  status: string;
  milestone: boolean;
}

export function TimelineNode({ status, milestone }: TimelineNodeProps) {
  return (
    <div className="relative z-20 flex h-8 w-8 items-center justify-center">
      {status === "current" ? (
        <span className="absolute flex h-5 w-5">
          <span className="bg-success/40 absolute inline-flex h-full w-full animate-ping rounded-full opacity-75" />
          <span className="bg-success border-background relative inline-flex h-5 w-5 rounded-full border-2" />
        </span>
      ) : status === "future" ? (
        <span className="bg-warning border-background ring-warning/35 h-4 w-4 rounded-full border-2 ring-2" />
      ) : milestone ? (
        <span className="bg-primary border-background ring-primary/35 flex h-4 w-4 items-center justify-center rounded-full border-2 ring-2">
          <Sparkles className="h-2 w-2 text-white" />
        </span>
      ) : (
        <span className="bg-muted border-background h-3 w-3 rounded-full border-2" />
      )}
    </div>
  );
}
