"use client";

import React, { memo, useMemo } from "react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/cards/card";

// --------------------------------------------------------
// Skill Radar Chart
// --------------------------------------------------------
interface RadarSkill {
  category: string;
  average: number;
}

export const SkillRadarChart = memo(function SkillRadarChart({ data }: { data: RadarSkill[] }) {
  return (
    <Card variant="solid">
      <CardHeader className="pb-2">
        <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
          Skill Radar Matrix
        </CardTitle>
        <CardDescription className="text-[9px]">Average proficiency by category</CardDescription>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
            <PolarGrid stroke="rgba(255,255,255,0.07)" />
            <PolarAngleAxis
              dataKey="category"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9, fontFamily: "monospace" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 5]}
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }}
              axisLine={false}
            />
            <Radar
              name="Proficiency"
              dataKey="average"
              stroke="hsl(var(--primary))"
              fill="hsl(var(--primary))"
              fillOpacity={0.18}
              strokeWidth={1.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

// --------------------------------------------------------
// Category Distribution Bar Chart
// --------------------------------------------------------
interface BarData {
  category: string;
  count: number;
}

const CATEGORY_COLORS = [
  "#6366f1",
  "#8b5cf6",
  "#06b6d4",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#ec4899",
  "#3b82f6",
];

export const CategoryBarChart = memo(function CategoryBarChart({ data }: { data: BarData[] }) {
  return (
    <Card variant="solid">
      <CardHeader className="pb-2">
        <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
          Category Distribution
        </CardTitle>
        <CardDescription className="text-[9px]">
          Skills mapped across capability domains
        </CardDescription>
      </CardHeader>
      <CardContent className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis
              dataKey="category"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 8, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                fontSize: 10,
                fontFamily: "monospace",
              }}
              labelStyle={{ color: "#888" }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]} name="Skills">
              {data.map((_, idx) => (
                <Cell key={idx} fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});

// --------------------------------------------------------
// Learning Progress Bar Chart
// --------------------------------------------------------
interface LearningBar {
  status: string;
  count: number;
}

export const LearningProgressChart = memo(function LearningProgressChart({
  data,
}: {
  data: LearningBar[];
}) {
  const statusColors: Record<string, string> = {
    mastered: "#10b981",
    learning: "#f59e0b",
    planned: "#6366f1",
  };

  return (
    <Card variant="solid">
      <CardHeader className="pb-2">
        <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
          Learning Progress
        </CardTitle>
        <CardDescription className="text-[9px]">Skills by acquisition stage</CardDescription>
      </CardHeader>
      <CardContent className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 20, bottom: 4, left: 10 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 8 }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <YAxis
              dataKey="status"
              type="category"
              tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 9, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              width={64}
            />
            <Tooltip
              contentStyle={{
                background: "rgba(0,0,0,0.85)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                fontSize: 10,
                fontFamily: "monospace",
              }}
            />
            <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Count">
              {data.map((entry, idx) => (
                <Cell key={idx} fill={statusColors[entry.status] ?? "#6366f1"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
});
