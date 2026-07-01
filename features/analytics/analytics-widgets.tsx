"use client";

/**
 * analytics-widgets.tsx
 * Reusable non-chart UI widgets for the Analytics Dashboard.
 */

import React, { memo, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Award,
  Rocket,
  Star,
  BookOpen,
  FileText,
  Briefcase,
  CheckCircle,
  Clock,
  Minus,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";

// ─── Animated Number Counter ───────────────────────────────────────────────────
function useCountUp(target: number, duration = 1400, inView = true) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, inView]);
  return count;
}

// ─── KPI Card ──────────────────────────────────────────────────────────────────
export interface KPICardProps {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  description?: string;
  icon: React.ReactNode;
  highlight?: boolean;
  delay?: number;
}

export const KPICard = memo(function KPICard({
  label,
  value,
  suffix = "",
  prefix = "",
  description,
  icon,
  highlight = false,
  delay = 0,
}: KPICardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const animated = useCountUp(value, 1200, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card variant={highlight ? "glow" : "solid"} animateHover className="group h-full">
        <CardContent className="flex h-full flex-col justify-between gap-3 p-5">
          <div className="flex items-start justify-between">
            <span className="text-muted-foreground font-mono text-[9px] leading-tight tracking-widest uppercase">
              {label}
            </span>
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                highlight
                  ? "bg-primary/15 border-primary/25 border"
                  : "bg-secondary/40 border-border/15 border",
              )}
            >
              {icon}
            </div>
          </div>

          <div>
            <div className="text-foreground font-mono text-3xl font-extrabold tabular-nums">
              {prefix}
              {animated}
              {suffix}
            </div>
            {description && (
              <p className="text-muted-foreground mt-1 text-[10px] leading-snug">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// ─── Impact Metric Card ────────────────────────────────────────────────────────
export interface ImpactMetric {
  id: string;
  label: string;
  value: string;
  direction: "up" | "down" | "neutral";
  description: string;
  category: string;
}

const categoryColor: Record<string, string> = {
  performance: "text-success border-success/20 bg-success/5",
  efficiency: "text-primary border-primary/20 bg-primary/5",
  leadership: "text-warning border-warning/20 bg-warning/5",
};

export const ImpactCard = memo(function ImpactCard({
  metric,
  delay = 0,
}: {
  metric: ImpactMetric;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  const DirectionIcon =
    metric.direction === "up" ? TrendingUp : metric.direction === "down" ? TrendingDown : Minus;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.35, delay }}
    >
      <Card variant="solid" animateHover className="h-full">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-2">
            <Badge
              variant="outline"
              className={cn("font-mono text-[8px] uppercase", categoryColor[metric.category] ?? "")}
            >
              {metric.category}
            </Badge>
            <DirectionIcon
              className={cn(
                "h-4 w-4 shrink-0",
                metric.direction === "up"
                  ? "text-success"
                  : metric.direction === "down"
                    ? "text-success"
                    : "text-muted-foreground",
              )}
            />
          </div>

          <div>
            <div className="text-foreground font-mono text-2xl font-extrabold">{metric.value}</div>
            <div className="text-foreground/80 mt-0.5 text-[10px] font-semibold">
              {metric.label}
            </div>
          </div>

          <p className="text-muted-foreground text-[10px] leading-relaxed">{metric.description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
});

// ─── Learning Progress Bar ─────────────────────────────────────────────────────
export interface LearningItem {
  name: string;
  type: string;
  progress: number;
  status: string;
}

const statusConfig: Record<string, { label: string; color: string; bar: string }> = {
  completed: { label: "Completed", color: "text-success", bar: "bg-success" },
  "in-progress": { label: "In Progress", color: "text-warning", bar: "bg-warning" },
  planned: { label: "Planned", color: "text-muted-foreground", bar: "bg-secondary/40" },
};

export const LearningProgressItem = memo(function LearningProgressItem({
  item,
  delay = 0,
}: {
  item: LearningItem;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const cfg = statusConfig[item.status] ?? statusConfig.planned;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.3, delay }}
      className="space-y-1.5"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-foreground max-w-[70%] truncate text-[10px] font-medium">
          {item.name}
        </span>
        <div className="flex shrink-0 items-center gap-2">
          <span className={cn("font-mono text-[9px]", cfg.color)}>{cfg.label}</span>
          <span className="text-muted-foreground font-mono text-[9px]">{item.progress}%</span>
        </div>
      </div>
      <div className="bg-secondary/30 h-1.5 w-full overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${item.progress}%` } : {}}
          transition={{ duration: 0.7, delay: delay + 0.1, ease: "easeOut" }}
          className={cn("h-full rounded-full", cfg.bar)}
        />
      </div>
    </motion.div>
  );
});

// ─── Achievement Timeline ──────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  date: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  award: <Award className="h-3.5 w-3.5" />,
  rocket: <Rocket className="h-3.5 w-3.5" />,
  star: <Star className="h-3.5 w-3.5" />,
  "trending-up": <TrendingUp className="h-3.5 w-3.5" />,
  "book-open": <BookOpen className="h-3.5 w-3.5" />,
  "file-text": <FileText className="h-3.5 w-3.5" />,
  briefcase: <Briefcase className="h-3.5 w-3.5" />,
};

const achColor: Record<string, string> = {
  certification: "bg-primary/15 border-primary/30 text-primary",
  project: "bg-success/15 border-success/30 text-success",
  award: "bg-warning/15 border-warning/30 text-warning",
  career: "bg-info/15 border-info/30 text-info",
  milestone: "bg-secondary/40 border-border/30 text-foreground",
};

export const AchievementTimeline = memo(function AchievementTimeline({
  items,
}: {
  items: Achievement[];
}) {
  return (
    <ol className="relative space-y-6 pl-6" aria-label="Achievement timeline">
      {/* Vertical line */}
      <div className="bg-border/20 absolute top-2 bottom-2 left-2.5 w-px" aria-hidden />

      {items.map((item, i) => {
        const iconColorCls = achColor[item.category] ?? achColor.milestone;
        return (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.06 }}
            className="relative"
          >
            {/* Dot */}
            <span
              className={cn(
                "absolute top-0.5 -left-[22px] flex h-6 w-6 shrink-0 items-center justify-center rounded-full border",
                iconColorCls,
              )}
              aria-hidden
            >
              {iconMap[item.icon] ?? <CheckCircle className="h-3.5 w-3.5" />}
            </span>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-muted-foreground font-mono text-[9px]">{item.date}</span>
                <Badge
                  variant="outline"
                  className={cn("border font-mono text-[8px] uppercase", iconColorCls)}
                >
                  {item.category}
                </Badge>
              </div>
              <h4 className="text-foreground text-xs font-bold">{item.title}</h4>
              <p className="text-muted-foreground text-[10px] leading-relaxed">
                {item.description}
              </p>
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
});

// ─── Activity Feed ─────────────────────────────────────────────────────────────
export interface ActivityItem {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
}

const feedDot: Record<string, string> = {
  project: "bg-success",
  certification: "bg-primary",
  milestone: "bg-warning",
  award: "bg-warning",
  career: "bg-info",
};

export const ActivityFeed = memo(function ActivityFeed({ items }: { items: ActivityItem[] }) {
  return (
    <ol className="space-y-4" aria-label="Activity feed">
      {items.map((item, i) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: i * 0.05 }}
          className="flex items-start gap-3"
        >
          {/* Dot */}
          <span
            className={cn(
              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
              feedDot[item.type] ?? "bg-border",
            )}
            aria-hidden
          />
          <div className="min-w-0 space-y-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-foreground text-[10px] font-semibold">{item.title}</span>
              <span className="text-muted-foreground flex items-center gap-1 font-mono text-[9px]">
                <Clock className="h-3 w-3" />
                {item.date}
              </span>
            </div>
            <p className="text-muted-foreground text-[10px] leading-relaxed">{item.description}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
});
