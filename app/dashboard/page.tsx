"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Activity,
  TrendingUp,
  Layers,
  BookOpen,
  CheckCircle,
  Terminal,
  User,
  MapPin,
  Mail,
  ArrowRight,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Badge } from "@/components/ui/badges";
import { Progress } from "@/components/ui/overlay-primitives";
import { StaggerContainer, StaggerItem, Magnetic } from "@/components/animations/motion-hooks";
import { SplitTextReveal, GSAPReveal } from "@/components/animations/gsap-animate";
import { useCommandPalette } from "@/providers/command-palette-provider";

// 1. Direct imports of JSON example structures
import profileData from "@/data/profile.json";
import metricsData from "@/data/metrics.json";
import skillsData from "@/data/skills.json";
import timelineData from "@/data/timeline.json";

export default function DashboardPage() {
  const { setIsOpen } = useCommandPalette();
  const profile = profileData.example;
  const metrics = metricsData.example;
  const skills = skillsData.example;
  const timeline = timelineData.example;

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full flex-1 space-y-8 p-6 pb-28 md:p-8">
        {/* Profile Identity Headline */}
        <section className="space-y-4">
          <div className="border-border/20 flex flex-col items-start justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
            <div className="space-y-1.5">
              <div className="text-primary flex items-center gap-2 font-mono text-xs font-bold tracking-widest uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                Professional Identity Cockpit
              </div>
              <SplitTextReveal
                text={profile.name}
                className="text-foreground text-4xl font-extrabold tracking-tight"
              />
              <p className="text-text-primary max-w-2xl text-sm leading-relaxed font-semibold">
                {profile.headline}
              </p>
            </div>

            {/* Quick stats tags */}
            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              <Badge variant="glass" className="flex items-center gap-1">
                <User className="h-3 w-3" /> {profile.currentRole}
              </Badge>
              <Badge variant="default" className="flex items-center gap-1">
                <TrendingUp className="h-3 w-3" /> Target: {profile.targetRole}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {profile.location}
              </Badge>
            </div>
          </div>

          {/* Transition Narrative Summary */}
          <Card variant="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
                Transition Narrative
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3 text-xs leading-relaxed">
              <p className="text-text-primary text-xs font-semibold">{profile.summary}</p>
              <p>
                <strong>The Why:</strong> {profile.transitionNarrative.whyProductManagement}
              </p>
              <div className="pt-2">
                <span className="text-foreground mb-2 block font-mono text-[10px] font-bold uppercase">
                  Key Transferable Competencies:
                </span>
                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {profile.transitionNarrative.transferableSkills.map(
                    (skill: string, idx: number) => (
                      <li
                        key={idx}
                        className="bg-secondary/40 border-border/10 flex items-start gap-2 rounded-lg border p-2.5"
                      >
                        <CheckCircle className="text-success mt-0.5 h-4 w-4 shrink-0" />
                        <span>{skill}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Core Dashboard Widgets */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* 1. Metric Aggregator */}
          <Card variant="solid" className="flex flex-col justify-between md:col-span-2">
            <div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-muted-foreground font-mono text-xs font-bold tracking-wider uppercase">
                    Metric Aggregator
                  </CardTitle>
                  <Badge variant="growth">{metrics[0].change} Velocity</Badge>
                </div>
                <h3 className="text-heading-xl text-foreground mt-2 font-bold tracking-tight">
                  {metrics[0].value}
                </h3>
                <p className="text-text-primary mt-1 text-xs font-semibold">{metrics[0].label}</p>
              </CardHeader>
              <CardContent className="text-muted-foreground space-y-4 text-xs">
                <div className="bg-secondary/30 border-border/10 rounded-lg border p-3">
                  <span className="text-foreground mb-1 block font-mono text-[9px] font-bold uppercase">
                    BA Query Execution (Solution Pattern):
                  </span>
                  <p>{metrics[0].baValueExplanation}</p>
                </div>
                <div className="bg-primary/5 border-primary/10 rounded-lg border p-3">
                  <span className="text-primary mb-1 block font-mono text-[9px] font-bold uppercase">
                    PM Strategic Value (Outcome Metric):
                  </span>
                  <p>{metrics[0].pmValueExplanation}</p>
                </div>
              </CardContent>
            </div>

            {/* Quick link CTA */}
            <div className="border-border/10 mt-4 flex items-center justify-between border-t p-4 pt-0 font-mono text-[10px]">
              <span>ACTIVE COHORT TELEMETRY RUNNING</span>
              <a href="/analytics" className="text-primary flex items-center gap-1 hover:underline">
                View Query Source <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </Card>

          {/* 2. Command Palette Launcher CTA */}
          <Card variant="glow" withSpotlight className="flex flex-col justify-between">
            <CardHeader>
              <div className="text-primary flex items-center gap-2 font-mono text-xs font-bold uppercase">
                <Terminal className="h-4 w-4" />
                Command Interface
              </div>
              <CardTitle className="text-muted-foreground mt-3 font-mono text-xs font-semibold">
                Keyboard Search Shortcut
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-xs leading-relaxed">
              Open the unified search interface to query core metrics, download exportable resumés,
              or inspect background diagnostic tokens.
            </CardContent>
            <div className="p-6 pt-0">
              <Magnetic range={50}>
                <Button
                  variant="default"
                  className="flex w-full items-center justify-center gap-2 text-center"
                  onClick={() => setIsOpen(true)}
                >
                  <kbd className="rounded bg-white/20 px-1.5 py-0.5 text-[10px]">Ctrl+K</kbd>
                  Open Command Bar
                </Button>
              </Magnetic>
            </div>
          </Card>
        </section>

        {/* Skills & Timeline Details */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* 3. Agile Progress Indicator (PM vs BA Skills) */}
          <Card variant="solid">
            <CardHeader>
              <CardTitle className="text-muted-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Agile Skill Competency Matrix
              </CardTitle>
              <CardDescription>
                Levels representing transferable analyst backgrounds.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Product Management */}
              <div className="space-y-3">
                <span className="text-primary block font-mono text-[10px] font-bold uppercase">
                  Product Management Competencies
                </span>
                <div className="space-y-2">
                  {skills.productManagement.map((skill: any, idx: number) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}/5</span>
                      </div>
                      <Progress value={skill.level * 20} />
                      <p className="text-muted-foreground text-[10px] leading-normal italic">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Analysis */}
              <div className="border-border/10 space-y-3 border-t pt-3">
                <span className="text-success block font-mono text-[10px] font-bold uppercase">
                  Transferable BA Competencies
                </span>
                <div className="space-y-2">
                  {skills.businessAnalysis.map((skill: any, idx: number) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-foreground">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}/5</span>
                      </div>
                      <Progress value={skill.level * 20} />
                      <p className="text-muted-foreground text-[10px] leading-normal italic">
                        {skill.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 4. Activity Log (Milestones) */}
          <Card variant="solid">
            <CardHeader>
              <CardTitle className="text-muted-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Transition Activity Log
              </CardTitle>
              <CardDescription>Chronological sequence of transition milestones.</CardDescription>
            </CardHeader>
            <CardContent>
              <StaggerContainer className="border-border/20 relative space-y-6 border-l pl-4">
                {timeline.map((item: any, idx: number) => (
                  <StaggerItem key={item.id} className="relative">
                    {/* Node Bullet */}
                    <span className="bg-primary border-background absolute top-1 -left-[21px] h-2.5 w-2.5 rounded-full border-2" />

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-foreground bg-secondary rounded px-1.5 py-0.5 font-mono text-[10px] font-bold">
                          {item.year} {item.quarter}
                        </span>
                        <Badge variant="glass">{item.type}</Badge>
                      </div>
                      <h4 className="text-text-primary text-xs font-bold">{item.event}</h4>
                      <p className="text-muted-foreground text-[11px] leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </CardContent>

            {/* Primary Action CTA */}
            <div className="border-border/10 flex justify-end border-t p-6">
              <Magnetic range={40}>
                <a href="/journey">
                  <Button variant="glass" rightIcon={<ArrowRight />}>
                    Explore Journey Timeline
                  </Button>
                </a>
              </Magnetic>
            </div>
          </Card>
        </section>
      </div>
    </DashboardLayout>
  );
}
