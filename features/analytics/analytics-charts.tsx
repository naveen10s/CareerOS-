"use client";

/**
 * analytics-charts.tsx
 * All Recharts chart components for the Impact Analytics Dashboard.
 * Every component is memoized and client-only (no SSR hydration issues).
 */

import React, { memo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// ─── Shared Tooltip Style ──────────────────────────────────────────────────────
const TOOLTIP_STYLE = {
  contentStyle: {
    background: "rgba(10,10,20,0.92)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "10px",
    fontSize: 11,
    fontFamily: "var(--font-mono, monospace)",
    color: "#e2e8f0",
    padding: "8px 12px",
  },
  labelStyle: { color: "#94a3b8", marginBottom: 4 },
  itemStyle: { color: "#e2e8f0" },
};

const AXIS_TICK = { fill: "rgba(148,163,184,0.55)", fontSize: 9, fontFamily: "monospace" };

// ─── Career Growth Area Chart ──────────────────────────────────────────────────
export interface GrowthPoint {
  year: string;
  role: string;
  level: number;
  milestone: string;
}

export const CareerGrowthChart = memo(function CareerGrowthChart({
  data,
}: {
  data: GrowthPoint[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.02} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="year" tick={AXIS_TICK} tickLine={false} axisLine={false} />
        <YAxis domain={[0, 6]} tick={AXIS_TICK} tickLine={false} axisLine={false} />
        <Tooltip
          {...TOOLTIP_STYLE}
          formatter={(val: any) => [`Level ${val}`, "Seniority"]}
          labelFormatter={(label) => `Year: ${label}`}
        />
        <Area
          type="monotone"
          dataKey="level"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          fill="url(#growthGrad)"
          dot={{
            fill: "hsl(var(--primary))",
            strokeWidth: 2,
            r: 4,
            stroke: "hsl(var(--background))",
          }}
          activeDot={{
            r: 6,
            stroke: "hsl(var(--primary))",
            strokeWidth: 2,
            fill: "hsl(var(--background))",
          }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
});

// ─── Monthly Learning Line Chart ───────────────────────────────────────────────
export interface MonthlyHours {
  month: string;
  hours: number;
}

export const MonthlyLearningChart = memo(function MonthlyLearningChart({
  data,
}: {
  data: MonthlyHours[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="learningGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.04)" />
        <XAxis dataKey="month" tick={AXIS_TICK} tickLine={false} axisLine={false} />
        <YAxis tick={AXIS_TICK} tickLine={false} axisLine={false} />
        <Tooltip {...TOOLTIP_STYLE} formatter={(v: any) => [`${v}h`, "Learning"]} />
        <Line
          type="monotone"
          dataKey="hours"
          stroke="url(#learningGrad)"
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5, fill: "#8b5cf6", stroke: "hsl(var(--background))", strokeWidth: 2 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
});

// ─── Technology Usage Bar Chart ────────────────────────────────────────────────
export interface TechUsage {
  name: string;
  projects: number;
  category: string;
}

const TECH_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#3b82f6",
  "#14b8a6",
  "#a78bfa",
];

export const TechnologyBarChart = memo(function TechnologyBarChart({
  data,
}: {
  data: TechUsage[];
}) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ top: 4, right: 20, bottom: 4, left: 10 }}>
        <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.04)" horizontal={false} />
        <XAxis
          type="number"
          tick={AXIS_TICK}
          tickLine={false}
          axisLine={false}
          allowDecimals={false}
          label={{
            value: "Projects",
            position: "insideBottomRight",
            offset: -4,
            style: { fill: "rgba(148,163,184,0.4)", fontSize: 9 },
          }}
        />
        <YAxis
          dataKey="name"
          type="category"
          width={120}
          tick={{ ...AXIS_TICK, fontSize: 9 }}
          tickLine={false}
          axisLine={false}
        />
        <Tooltip
          {...TOOLTIP_STYLE}
          formatter={(v: any) => [`${v} project${v !== 1 ? "s" : ""}`, "Used in"]}
        />
        <Bar dataKey="projects" radius={[0, 4, 4, 0]} name="Projects" maxBarSize={14}>
          {data.map((_, idx) => (
            <Cell key={idx} fill={TECH_COLORS[idx % TECH_COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
});

// ─── Skill Radar Chart ─────────────────────────────────────────────────────────
export interface RadarSkill {
  category: string;
  level: number;
}

export const SkillsRadarChart = memo(function SkillsRadarChart({ data }: { data: RadarSkill[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data} margin={{ top: 12, right: 20, bottom: 12, left: 20 }}>
        <PolarGrid stroke="rgba(255,255,255,0.07)" />
        <PolarAngleAxis
          dataKey="category"
          tick={{ fill: "rgba(148,163,184,0.65)", fontSize: 9, fontFamily: "monospace" }}
        />
        <PolarRadiusAxis
          angle={30}
          domain={[0, 5]}
          tick={{ fill: "rgba(148,163,184,0.4)", fontSize: 8 }}
          axisLine={false}
          tickCount={4}
        />
        <Radar
          name="Proficiency"
          dataKey="level"
          stroke="#8b5cf6"
          fill="#8b5cf6"
          fillOpacity={0.18}
          strokeWidth={1.5}
          dot={{ fill: "#8b5cf6", r: 3, stroke: "hsl(var(--background))", strokeWidth: 1.5 }}
        />
        <Tooltip {...TOOLTIP_STYLE} formatter={(v: any) => [`${v}/5`, "Level"]} />
      </RadarChart>
    </ResponsiveContainer>
  );
});

// ─── Domain Donut Chart ────────────────────────────────────────────────────────
export interface DomainData {
  domain: string;
  count: number;
  color: string;
}

const RADIAN = Math.PI / 180;
const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, name, percent }: any) => {
  if (percent < 0.08) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={8}
      fontFamily="monospace"
      fontWeight="bold"
    >
      {name.split(" ")[0]}
    </text>
  );
};

export const DomainDonutChart = memo(function DomainDonutChart({ data }: { data: DomainData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="count"
          nameKey="domain"
          cx="50%"
          cy="50%"
          innerRadius="52%"
          outerRadius="80%"
          paddingAngle={3}
          labelLine={false}
          label={renderCustomLabel}
        >
          {data.map((entry, idx) => (
            <Cell key={idx} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip {...TOOLTIP_STYLE} formatter={(v: any, name: any) => [`${v} skills`, name]} />
      </PieChart>
    </ResponsiveContainer>
  );
});
