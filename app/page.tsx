"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Code2,
  BookOpen,
  Award,
  FileText,
  Mail,
  Clock,
  CheckCircle2,
  Layers,
  Activity,
  Compass,
  User,
  Users,
  Terminal,
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/cards/card";
import { Button } from "@/components/buttons/button";
import { Badge } from "@/components/ui/badges";
import {
  StaggerContainer,
  StaggerItem,
  Magnetic,
  GlowHover,
} from "@/components/animations/motion-hooks";

// Structured JSON data sources
import profileData from "@/data/profile.json";
import statsData from "@/data/stats.json";
import analyticsData from "@/data/analytics.json";
import achievementsData from "@/data/achievements.json";

export default function HomePage() {
  const profile = profileData.example as any;
  const kpis = analyticsData.kpis;
  const careerGrowth = analyticsData.careerGrowth;
  const learningProgress = analyticsData.learningProgress.slice(0, 4); // Limit to top 4
  const achievements = analyticsData.achievements.slice(0, 3); // Limit to top 3
  const activityFeed = analyticsData.activityFeed.slice(0, 4); // Limit to top 4

  const [mounted, setMounted] = useState(false);
  const [greeting, setGreeting] = useState("Hello 👋");

  useEffect(() => {
    setMounted(true);
    const hr = new Date().getHours();
    if (hr < 12) setGreeting("Good Morning ☕");
    else if (hr < 17) setGreeting("Good Afternoon ☀️");
    else setGreeting("Good Evening 🌙");
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full flex-1 space-y-8 p-6 pb-28 md:p-8">
        {/* Recruiter Notice & Greeting */}
        <div className="border-border/10 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="text-primary flex items-center gap-1.5 font-mono text-[9px] font-bold tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              SYSTEM ACTIVE · PM TRANSITION METRICS ONLINE
            </span>
            <h1 className="text-foreground mt-1 text-2xl font-black">
              {greeting}, I'm {profile.name}
            </h1>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Senior Business Analyst transitioning to Product Management. Sourced by verified data
              evidence.
            </p>
          </div>
          <div>
            <Badge
              variant="outline"
              className="text-success border-success/30 bg-success/5 px-2.5 py-1 font-mono text-[9px] uppercase"
            >
              ● ACTIVE TARGET: PRODUCT MANAGER
            </Badge>
          </div>
        </div>

        {/* Above the fold: Professional Identity & Primary KPIs */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* 1. Professional Identity Card */}
          <Card variant="solid" className="flex flex-col justify-between p-6 lg:col-span-2">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-secondary/40 border-border/10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border">
                  <User className="text-primary h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-foreground text-base font-bold">{profile.name}</h2>
                  <p className="text-muted-foreground text-xs">
                    {profile.currentRole} ➔ {profile.targetRole}
                  </p>
                  <p className="text-muted-foreground/80 mt-0.5 font-mono text-[9px]">
                    {profile.location}
                  </p>
                </div>
              </div>

              <div className="bg-secondary/10 border-border/5 text-muted-foreground rounded-xl border p-3.5 text-[11px] leading-relaxed select-text">
                {profile.summary}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-6">
              <Magnetic range={30}>
                <a href="/resume">
                  <Button
                    variant="default"
                    size="sm"
                    rightIcon={<FileText className="h-3.5 w-3.5" />}
                  >
                    View Resumé Spec
                  </Button>
                </a>
              </Magnetic>
              <Magnetic range={30}>
                <a href="/product-lab">
                  <Button
                    variant="glass"
                    size="sm"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    Product Lab Cases
                  </Button>
                </a>
              </Magnetic>
              <Magnetic range={30}>
                <a href="/contact">
                  <Button variant="outline" size="sm" rightIcon={<Mail className="h-3.5 w-3.5" />}>
                    Contact
                  </Button>
                </a>
              </Magnetic>
            </div>
          </Card>

          {/* 2. Quick Career KPIs */}
          <div className="grid grid-cols-2 gap-4">
            <Card variant="glass" className="flex flex-col justify-between p-4">
              <span className="text-muted-foreground font-mono text-[8px] uppercase">
                Experience
              </span>
              <div>
                <span className="text-heading-m text-foreground font-mono font-black">
                  {kpis.yearsExperience} yrs
                </span>
                <span className="text-muted-foreground mt-0.5 block text-[9px]">
                  Corporate Tenure
                </span>
              </div>
            </Card>
            <Card variant="glass" className="flex flex-col justify-between p-4">
              <span className="text-primary font-mono text-[8px] uppercase">Launched Cases</span>
              <div>
                <span className="text-heading-m text-foreground font-mono font-black">
                  {kpis.projectsCompleted}
                </span>
                <span className="text-muted-foreground mt-0.5 block text-[9px]">
                  Strategic Products
                </span>
              </div>
            </Card>
            <Card variant="glass" className="flex flex-col justify-between p-4">
              <span className="text-muted-foreground font-mono text-[8px] uppercase">
                Stakeholders
              </span>
              <div>
                <span className="text-heading-m text-foreground font-mono font-black">
                  {kpis.stakeholdersSupported}+
                </span>
                <span className="text-muted-foreground mt-0.5 block text-[9px]">
                  Aligned Contacts
                </span>
              </div>
            </Card>
            <Card variant="glass" className="flex flex-col justify-between p-4">
              <span className="text-muted-foreground font-mono text-[8px] uppercase">
                Learning Hours
              </span>
              <div>
                <span className="text-heading-m text-foreground font-mono font-black">
                  {kpis.learningHours}h
                </span>
                <span className="text-muted-foreground mt-0.5 block text-[9px]">
                  Self-Directed Study
                </span>
              </div>
            </Card>
          </div>
        </div>

        {/* Middle Section: Career Growth Chart & Learning Tracks */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Growth Chart */}
          <Card variant="solid" className="space-y-4 p-6 md:col-span-2">
            <div>
              <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Career Competency Growth Index
              </h3>
              <p className="text-muted-foreground text-[10px]">
                Transition trajectory from Junior Analyst (L1) to PM Lead (L5)
              </p>
            </div>
            <div className="h-44 w-full">
              {mounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={careerGrowth}
                    margin={{ top: 5, right: 5, left: -25, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis
                      dataKey="year"
                      stroke="var(--color-text-secondary)"
                      fontSize={9}
                      className="font-mono"
                    />
                    <YAxis
                      domain={[1, 5]}
                      stroke="var(--color-text-secondary)"
                      fontSize={9}
                      className="font-mono"
                    />
                    <Tooltip
                      contentStyle={{
                        background: "var(--surface)",
                        borderColor: "var(--border)",
                        borderRadius: "var(--radius-md)",
                        fontSize: "9px",
                        fontFamily: "var(--font-mono)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="level"
                      stroke="var(--primary)"
                      strokeWidth={1.5}
                      fillOpacity={1}
                      fill="url(#growthGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </Card>

          {/* Learning Progress List */}
          <Card variant="solid" className="flex flex-col justify-between p-6">
            <div className="space-y-4">
              <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Learning Progress
              </h3>
              <div className="space-y-3.5">
                {learningProgress.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between font-mono text-[9px]">
                      <span className="text-foreground max-w-[150px] truncate font-bold">
                        {item.name}
                      </span>
                      <span className="text-muted-foreground">{item.progress}%</span>
                    </div>
                    <div className="bg-secondary/40 h-1.5 overflow-hidden rounded-full">
                      <div
                        className="bg-primary duration-slow h-full rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <a
              href="/learning"
              className="text-primary flex items-center gap-1.5 pt-4 font-mono text-[9px] font-bold tracking-wider uppercase hover:underline"
            >
              Explore Learning Path <ArrowRight className="h-3 w-3" />
            </a>
          </Card>
        </div>

        {/* Lower Row: Latest Achievements, Current Focus, & Event Log */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Achievements */}
          <Card variant="solid" className="space-y-4 p-6">
            <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
              Latest Achievements
            </h3>
            <div className="space-y-4">
              {achievements.map((item, i) => (
                <div key={i} className="flex items-start gap-3 select-text">
                  <div className="bg-primary/10 border-primary/20 mt-0.5 shrink-0 rounded-lg border p-2">
                    <Award className="text-primary h-3.5 w-3.5" />
                  </div>
                  <div>
                    <h4 className="text-foreground text-xs leading-tight font-bold">
                      {item.title}
                    </h4>
                    <p className="text-muted-foreground mt-0.5 text-[10px] leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Current Focus Areas */}
          <Card variant="solid" className="space-y-4 p-6">
            <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
              Current Focus
            </h3>
            <div className="grid grid-cols-2 gap-3 font-mono text-[9px]">
              {[
                {
                  label: "Product Roadmap Strategy",
                  icon: <Compass className="text-primary h-4 w-4" />,
                },
                {
                  label: "Funnel Cohort Telemetry",
                  icon: <Activity className="text-success h-4 w-4" />,
                },
                {
                  label: "User Stories Formulation",
                  icon: <FileText className="text-info h-4 w-4" />,
                },
                {
                  label: "Sprint Commits Alignment",
                  icon: <Layers className="text-warning h-4 w-4" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-secondary/15 border-border/10 flex flex-col justify-between space-y-2 rounded-xl border p-3"
                >
                  {item.icon}
                  <span className="text-foreground leading-tight font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Event Log timeline */}
          <Card variant="solid" className="space-y-4 p-6">
            <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
              System Event Log
            </h3>
            <div className="border-border/20 space-y-4 border-l pl-4 font-mono text-[9px]">
              {activityFeed.map((item, i) => (
                <div key={item.id} className="relative">
                  <span className="bg-primary border-background absolute top-1 -left-[21px] flex h-2 w-2 items-center justify-center rounded-full border" />
                  <div>
                    <span className="text-muted-foreground block text-[8px]">{item.date}</span>
                    <span className="text-foreground block font-bold">{item.title}</span>
                    <span className="text-muted-foreground mt-0.5 block text-[8px] leading-normal">
                      {item.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Global Quick Navigation */}
        <section className="space-y-4">
          <h2 className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
            Quick System Navigation Modules
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {[
              { id: "/journey", label: "Timeline", icon: <Clock className="text-primary" /> },
              {
                id: "/product-lab",
                label: "Projects",
                icon: <Briefcase className="text-success" />,
              },
              { id: "/skills", label: "Skills Intel", icon: <Layers className="text-info" /> },
              {
                id: "/learning",
                label: "Learning Path",
                icon: <BookOpen className="text-warning" />,
              },
              { id: "/resume", label: "CV Spec", icon: <FileText className="text-primary" /> },
              { id: "/contact", label: "Contact", icon: <Mail className="text-success" /> },
            ].map((module) => (
              <a key={module.id} href={module.id} className="group">
                <Card
                  variant="glass"
                  className="hover:bg-secondary/35 flex h-20 flex-col justify-between p-3 transition-all select-none"
                >
                  {module.icon}
                  <span className="text-foreground group-hover:text-primary mt-2 font-mono text-[9px] font-bold tracking-wider uppercase transition-colors">
                    {module.label}
                  </span>
                </Card>
              </a>
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
