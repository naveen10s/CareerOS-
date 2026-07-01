"use client";

import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  BarChart2,
  Layers,
  BrainCircuit,
  Clock,
  Users,
  Package,
  Briefcase,
  Code2,
  TrendingUp,
  BookOpen,
  Trophy,
  Activity,
  Zap,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";

// ── Widgets (no dynamic needed — no Recharts inside) ──────────────────────────
import {
  KPICard,
  ImpactCard,
  LearningProgressItem,
  AchievementTimeline,
  ActivityFeed,
  type ImpactMetric,
} from "@/features/analytics/analytics-widgets";

// ── Charts — dynamically imported to avoid SSR ────────────────────────────────
const CareerGrowthChart = dynamic(
  () => import("@/features/analytics/analytics-charts").then((m) => m.CareerGrowthChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const MonthlyLearningChart = dynamic(
  () => import("@/features/analytics/analytics-charts").then((m) => m.MonthlyLearningChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const TechnologyBarChart = dynamic(
  () => import("@/features/analytics/analytics-charts").then((m) => m.TechnologyBarChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const SkillsRadarChart = dynamic(
  () => import("@/features/analytics/analytics-charts").then((m) => m.SkillsRadarChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);
const DomainDonutChart = dynamic(
  () => import("@/features/analytics/analytics-charts").then((m) => m.DomainDonutChart),
  { ssr: false, loading: () => <ChartSkeleton /> },
);

// ── Data ───────────────────────────────────────────────────────────────────────
import analyticsData from "@/data/analytics.json";

// ── Helper ─────────────────────────────────────────────────────────────────────
function ChartSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="border-primary/30 border-t-primary h-8 w-8 animate-spin rounded-full border-2" />
    </div>
  );
}

function SectionHeader({
  icon,
  label,
  title,
  description,
}: {
  icon: React.ReactNode;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="bg-primary/10 border-primary/20 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <div>
        <span className="text-primary font-mono text-[9px] tracking-widest uppercase">{label}</span>
        <h2 className="text-foreground text-base font-extrabold">{title}</h2>
        {description && <p className="text-muted-foreground mt-0.5 text-[10px]">{description}</p>}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const data = analyticsData;

  const totalLearningHours = useMemo(
    () => data.monthlyLearning.reduce((sum, m) => sum + m.hours, 0),
    [data.monthlyLearning],
  );

  const kpis = [
    {
      label: "Projects Completed",
      value: data.kpis.projectsCompleted,
      description: "End-to-end product & BA initiatives",
      icon: <Package className="text-primary h-4 w-4" />,
      highlight: true,
    },
    {
      label: "Years Experience",
      value: data.kpis.yearsExperience,
      suffix: "+",
      description: "Enterprise BA & PM delivery",
      icon: <Briefcase className="text-muted-foreground h-4 w-4" />,
    },
    {
      label: "Technologies Used",
      value: data.kpis.technologiesUsed,
      description: "Across stacks and toolchains",
      icon: <Code2 className="text-muted-foreground h-4 w-4" />,
    },
    {
      label: "Domains Worked",
      value: data.kpis.domainsWorked,
      description: "Analytics, Product, Leadership & more",
      icon: <Layers className="text-muted-foreground h-4 w-4" />,
    },
    {
      label: "Learning Hours",
      value: totalLearningHours,
      description: "Courses, certs, self-study",
      icon: <BookOpen className="text-muted-foreground h-4 w-4" />,
    },
    {
      label: "Stakeholders Supported",
      value: data.kpis.stakeholdersSupported,
      suffix: "+",
      description: "Cross-functional alignment",
      icon: <Users className="text-muted-foreground h-4 w-4" />,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-12 pb-24">
        {/* ── 0. Page Header ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 border-primary/20 flex h-9 w-9 items-center justify-center rounded-xl border">
              <BarChart2 className="text-primary h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                  Impact Intelligence
                </span>
                <span className="bg-primary/20 h-px w-8" />
                <span className="text-muted-foreground font-mono text-[9px] uppercase">
                  Executive View
                </span>
              </div>
              <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
                Career Impact Analytics
              </h1>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
            A living intelligence layer visualising career growth, technical depth, learning
            velocity, and measurable business impact — driven entirely by structured data.
          </p>
        </motion.div>

        {/* ── 1. KPI Cards ─────────────────────────────────────────────────── */}
        <section aria-label="Key Performance Indicators">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {kpis.map((kpi, i) => (
              <KPICard
                key={kpi.label}
                label={kpi.label}
                value={kpi.value}
                suffix={kpi.suffix}
                description={kpi.description}
                icon={kpi.icon}
                highlight={kpi.highlight}
                delay={i * 0.06}
              />
            ))}
          </div>
        </section>

        {/* ── 2. Career Growth + Monthly Learning ───────────────────────────── */}
        <section aria-label="Career Growth Timeline">
          <SectionHeader
            icon={<TrendingUp className="text-primary h-4 w-4" />}
            label="Section 02"
            title="Career Growth Trajectory"
            description="Role progression and seniority level over the professional journey"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Area chart — Career growth */}
            <Card variant="solid" className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
                  Seniority Level Over Time
                </CardTitle>
                <CardDescription className="text-[9px]">
                  Year-over-year professional seniority progression
                </CardDescription>
              </CardHeader>
              <CardContent className="h-56">
                <CareerGrowthChart data={data.careerGrowth} />
              </CardContent>
            </Card>

            {/* Milestone cards */}
            <Card variant="glass" className="p-5">
              <span className="text-primary mb-4 block font-mono text-[9px] font-bold uppercase">
                Growth Milestones
              </span>
              <ol className="relative space-y-4 pl-5">
                <div className="bg-border/20 absolute top-0 bottom-0 left-2 w-px" aria-hidden />
                {data.careerGrowth.map((pt, i) => (
                  <li key={i} className="relative">
                    <span
                      className="bg-primary border-background absolute top-1 -left-[18px] h-2.5 w-2.5 rounded-full border-2"
                      aria-hidden
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground font-mono text-[9px]">
                          {pt.year}
                        </span>
                        <Badge
                          variant="outline"
                          className="bg-primary/5 text-primary border-primary/20 font-mono text-[7px]"
                        >
                          L{pt.level}
                        </Badge>
                      </div>
                      <p className="text-foreground text-[10px] font-medium">{pt.role}</p>
                      <p className="text-muted-foreground text-[9px] leading-snug">
                        {pt.milestone}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>
        </section>

        {/* ── 3. Learning Velocity + Domain Donut ───────────────────────────── */}
        <section aria-label="Learning Metrics">
          <SectionHeader
            icon={<BookOpen className="text-primary h-4 w-4" />}
            label="Section 03"
            title="Learning Velocity"
            description="Monthly learning hours and skill domain distribution"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Line chart */}
            <Card variant="solid" className="lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
                  Monthly Learning Hours
                </CardTitle>
                <CardDescription className="text-[9px]">
                  Hours invested across courses, certifications, and self-study
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48">
                <MonthlyLearningChart data={data.monthlyLearning} />
              </CardContent>
            </Card>

            {/* Donut chart */}
            <Card variant="solid">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
                  Domain Distribution
                </CardTitle>
                <CardDescription className="text-[9px]">
                  Skills mapped across capability domains
                </CardDescription>
              </CardHeader>
              <CardContent className="h-48">
                <DomainDonutChart data={data.domainDistribution} />
              </CardContent>
              {/* Legend */}
              <div className="flex flex-wrap gap-2 px-6 pb-5">
                {data.domainDistribution.map((d) => (
                  <div key={d.domain} className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: d.color }}
                    />
                    <span className="text-muted-foreground font-mono text-[8px]">{d.domain}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        {/* ── 4. Technology + Skills Radar ──────────────────────────────────── */}
        <section aria-label="Technology and Skills">
          <SectionHeader
            icon={<Code2 className="text-primary h-4 w-4" />}
            label="Section 04"
            title="Technology & Skills Intelligence"
            description="Tool usage frequency and multi-dimensional skill proficiency"
          />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Tech bar */}
            <Card variant="solid">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
                  Technology Usage
                </CardTitle>
                <CardDescription className="text-[9px]">
                  Tools and technologies by project coverage
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <TechnologyBarChart data={data.technologyUsage} />
              </CardContent>
            </Card>

            {/* Skill radar */}
            <Card variant="solid">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground font-mono text-[10px] font-bold uppercase">
                  Skill Capability Radar
                </CardTitle>
                <CardDescription className="text-[9px]">
                  Multi-dimensional proficiency across 8 capability domains
                </CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <SkillsRadarChart data={data.skillRadar} />
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── 5. Business Impact Cards ──────────────────────────────────────── */}
        <section aria-label="Business Impact">
          <SectionHeader
            icon={<Zap className="text-primary h-4 w-4" />}
            label="Section 05"
            title="Business Impact Metrics"
            description="Quantified outcomes delivered across projects and initiatives"
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(data.impactMetrics as ImpactMetric[]).map((metric, i) => (
              <ImpactCard key={metric.id} metric={metric} delay={i * 0.07} />
            ))}
          </div>
        </section>

        {/* ── 6. Learning Progress ──────────────────────────────────────────── */}
        <section aria-label="Learning Progress">
          <SectionHeader
            icon={<BrainCircuit className="text-primary h-4 w-4" />}
            label="Section 06"
            title="Learning Progress"
            description="Certifications, courses, and self-study completion status"
          />
          <Card variant="solid">
            <CardContent className="space-y-5 p-6">
              {data.learningProgress.map((item, i) => (
                <LearningProgressItem key={i} item={item} delay={i * 0.06} />
              ))}
            </CardContent>
          </Card>
        </section>

        {/* ── 7. Achievement Timeline + Activity Feed ───────────────────────── */}
        <section aria-label="Achievements and Activity">
          <SectionHeader
            icon={<Trophy className="text-primary h-4 w-4" />}
            label="Section 07"
            title="Achievements & Activity"
            description="Career milestones, recognitions, and recent activity"
          />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Achievement Timeline */}
            <Card variant="solid">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase">
                  <Trophy className="text-warning h-3.5 w-3.5" /> Achievement Timeline
                </CardTitle>
                <CardDescription className="text-[9px]">
                  Chronological career milestones and recognitions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <AchievementTimeline items={data.achievements} />
              </CardContent>
            </Card>

            {/* Activity Feed */}
            <Card variant="solid">
              <CardHeader className="pb-2">
                <CardTitle className="text-foreground flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase">
                  <Activity className="text-success h-3.5 w-3.5" /> Recent Activity
                </CardTitle>
                <CardDescription className="text-[9px]">
                  Latest updates across projects, certifications, and career events
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ActivityFeed items={data.activityFeed} />
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
