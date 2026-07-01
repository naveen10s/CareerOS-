"use client";

import React from "react";
import { TrendingUp, TrendingDown, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/cards/card";

// ----------------------------------------------------
// 1. METRIC WIDGET
// ----------------------------------------------------
interface MetricWidgetProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  subtext?: string;
  sparklineData?: number[]; // Percentage values (0-100) for vertical bars
  className?: string;
}

export function MetricWidget({
  title,
  value,
  change,
  trend,
  subtext,
  sparklineData = [],
  className,
}: MetricWidgetProps) {
  const isUp = trend === "up";
  const isDown = trend === "down";

  return (
    <Card variant="solid" className={cn("relative overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-muted-foreground font-mono text-xs font-bold tracking-wider uppercase">
          {title}
        </CardTitle>
        <span
          className={cn(
            "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px] font-bold",
            isUp && "bg-growth/10 text-growth",
            isDown && "bg-destructive/10 text-destructive",
            trend === "neutral" && "bg-secondary text-secondary-foreground",
          )}
        >
          {isUp && <TrendingUp className="h-3 w-3" />}
          {isDown && <TrendingDown className="h-3 w-3" />}
          {change}
        </span>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <div>
          <div className="text-foreground text-2xl font-bold tracking-tight">{value}</div>
          {subtext && (
            <p className="text-muted-foreground mt-1 text-[10px] leading-snug">{subtext}</p>
          )}
        </div>

        {/* Sparkline Indicator */}
        {sparklineData.length > 0 && (
          <div className="mt-5 flex h-8 items-end gap-1.5">
            {sparklineData.map((val, idx) => (
              <div
                key={idx}
                className={cn(
                  "duration-deliberate w-full rounded-t-sm transition-all",
                  isUp
                    ? "bg-primary/20 hover:bg-primary"
                    : "bg-muted-foreground/15 hover:bg-primary/60",
                )}
                style={{ height: `${val}%` }}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------
// 2. ACTIVITY LOG WIDGET
// ----------------------------------------------------
interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isMilestone?: boolean;
}

interface ActivityWidgetProps {
  title: string;
  activities: ActivityItem[];
  className?: string;
}

export function ActivityWidget({ title, activities, className }: ActivityWidgetProps) {
  return (
    <Card variant="solid" className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border-border/25 relative ml-2 space-y-5 border-l py-1 pl-4">
          {activities.map((act) => (
            <div key={act.id} className="group relative">
              {/* Vertical timeline node indicator */}
              <span className="bg-background border-border group-hover:border-primary absolute top-1 -left-[21px] flex h-2.5 w-2.5 items-center justify-center rounded-full border transition-colors">
                {act.isMilestone ? (
                  <span className="bg-primary h-1.5 w-1.5 rounded-full" />
                ) : (
                  <span className="bg-muted-foreground/45 h-1 w-1 rounded-full" />
                )}
              </span>

              <div className="flex flex-col space-y-0.5">
                <span className="text-foreground group-hover:text-primary text-xs font-semibold transition-colors">
                  {act.title}
                </span>
                <p className="text-muted-foreground text-[10px] leading-normal">
                  {act.description}
                </p>
                <span className="text-muted-foreground/60 pt-1 font-mono text-[9px]">
                  {act.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------
// 3. GOAL PROGRESS WIDGET
// ----------------------------------------------------
interface ProgressWidgetProps {
  title: string;
  goalName: string;
  current: number;
  target: number;
  unit?: string;
  className?: string;
}

export function ProgressWidget({
  title,
  goalName,
  current,
  target,
  unit = "",
  className,
}: ProgressWidgetProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((current / target) * 100)));

  return (
    <Card variant="solid" className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground truncate text-[10px] leading-snug">
          {goalName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {/* Metric progression header */}
        <div className="flex items-baseline justify-between font-mono text-xs">
          <span className="text-foreground font-bold">
            {current} {unit}
          </span>
          <span className="text-muted-foreground">
            {target} {unit}
          </span>
        </div>

        {/* Linear progress track */}
        <div className="bg-secondary/80 border-border/10 relative h-2 w-full overflow-hidden rounded-full border">
          <div
            className="from-primary to-growth duration-slow ease-premium h-full rounded-full bg-gradient-to-r transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Completion status info */}
        <div className="flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">Progress Completion</span>
          <span className="text-foreground font-mono font-bold">{percentage}%</span>
        </div>
      </CardContent>
    </Card>
  );
}
