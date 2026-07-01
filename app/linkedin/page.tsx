"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Globe,
  MapPin,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { Button } from "@/components/buttons/button";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";

function formatDate(d: string) {
  if (d === "Present" || d === "Future" || !d) return d || "Present";
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
  const mIndex = parseInt(m) - 1;
  return isNaN(mIndex) || mIndex < 0 ? d : `${months[mIndex]} ${y}`;
}

export default function LinkedInCenterPage() {
  const profile = profileData.example as any;
  const experiences = experienceData.example;
  const projects = projectsData.example;

  const [recommendations, setRecommendations] = useState([
    {
      name: "Marcus Chen",
      role: "Engineering Director at TechInnovate Solutions",
      relation: "Managed Alex directly",
      text: "Alex acts as a vital bridge between complex data models and developer tasks. In our onboarding redesign, Alex's telemetry schema requirements cleared our backlog blockage, cutting sprint planning times in half and raising our onboarding completions by 22%. Outstanding PM qualities.",
      avatar: "MC",
    },
    {
      name: "Sarah Jenkins",
      role: "Senior Product Designer",
      relation: "Collaborated with Alex on onboarding redesign",
      text: "Alex doesn't just read analytics; Alex translates user friction into intuitive story requirements. Working together, Alex mapped out user stories in Jira with Given-When-Then criteria that aligned design and engineering perfectly. Highly recommend Alex for any PM team.",
      avatar: "SJ",
    },
  ]);

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full space-y-8 p-6 pb-24 md:p-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-start gap-3"
        >
          <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
            <Globe className="text-primary h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                Marketing Layer
              </span>
              <span className="bg-primary/20 h-px w-8" />
              <span className="text-muted-foreground font-mono text-[9px]">
                LinkedIn Strategy Spec
              </span>
            </div>
            <h1 className="text-foreground text-2xl font-extrabold tracking-tight">
              LinkedIn Center
            </h1>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Optimized profile copy, headline formulas, recommendations, and featured content
              setups.
            </p>
          </div>
        </motion.div>

        {/* Profile Card Mock */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main LinkedIn Feed Mock Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Header Banner & Bio Card */}
            <Card variant="solid" className="border-border/20 shadow-premium-sm overflow-hidden">
              {/* Mesh Gradient Banner */}
              <div className="relative h-32 w-full bg-gradient-to-r from-violet-600/30 via-indigo-600/20 to-teal-500/25">
                <div className="bg-background/80 absolute top-3 right-3 rounded-full border border-white/10 px-2 py-1 font-mono text-[8px]">
                  SaaS Core Theme Connected
                </div>
              </div>
              <div className="relative px-6 pb-6">
                {/* Profile Image Offset */}
                <div className="relative -mt-16 mb-4">
                  <div className="border-card bg-secondary shadow-premium-md h-24 w-24 overflow-hidden rounded-full border-4">
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-500 to-indigo-700 font-mono text-2xl font-black text-white">
                      AM
                    </div>
                  </div>
                </div>

                {/* Profile Metadata */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-foreground text-xl font-black tracking-tight">
                      {profile.name}
                    </h2>
                    <Badge
                      variant="outline"
                      className="border-success/30 text-success font-mono text-[8px]"
                    >
                      Open to Work (PM)
                    </Badge>
                  </div>
                  <p className="text-foreground text-xs leading-normal font-bold">
                    {profile.headline}
                  </p>
                  <div className="text-muted-foreground flex flex-wrap items-center gap-3 font-mono text-[9px]">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {profile.location}
                    </span>
                    <span>·</span>
                    <a
                      href={profile.links?.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-0.5"
                    >
                      Official Profile <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>

                <div className="border-border/10 mt-5 flex flex-wrap gap-2.5 border-t pt-4">
                  <a href="/resume">
                    <Button variant="default" size="sm">
                      Open Resumé
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button variant="outline" size="sm">
                      Send Connection
                    </Button>
                  </a>
                </div>
              </div>
            </Card>

            {/* About Card */}
            <Card variant="solid" className="space-y-3 p-6">
              <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                About
              </h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{profile.summary}</p>
              <div className="bg-secondary/40 border-border/10 space-y-1 rounded-xl border p-3">
                <span className="text-primary block font-mono text-[8px] font-bold uppercase">
                  PRODUCT TRANSITION STORY
                </span>
                <p className="text-muted-foreground text-[11px] leading-relaxed italic">
                  "{profile.transitionNarrative.whyProductManagement}"
                </p>
              </div>
            </Card>

            {/* Experience Card */}
            <Card variant="solid" className="space-y-4 p-6">
              <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Experience
              </h3>
              <div className="space-y-6">
                {experiences.map((exp, idx) => (
                  <div key={exp.id} className="relative flex gap-4">
                    {/* Visual Connector Timeline line */}
                    {idx < experiences.length - 1 && (
                      <span className="bg-border/20 absolute top-8 bottom-0 left-4.5 w-0.5" />
                    )}
                    <div className="bg-secondary border-border/15 flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl border font-mono text-[10px] font-extrabold">
                      {exp.company.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="min-w-0 space-y-2">
                      <div>
                        <h4 className="text-foreground text-xs leading-snug font-bold">
                          {exp.role}
                        </h4>
                        <div className="text-muted-foreground font-mono text-[9px]">
                          {exp.company} · {exp.location}
                        </div>
                        <div className="text-muted-foreground/80 font-mono text-[8px]">
                          {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                        </div>
                      </div>
                      <ul className="list-disc space-y-1 pl-4">
                        {exp.responsibilities.slice(0, 3).map((resp, i) => (
                          <li key={i} className="text-muted-foreground text-[11px] leading-relaxed">
                            {resp}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.pmKeywords.slice(0, 4).map((keyword) => (
                          <Badge key={keyword} variant="outline" className="font-mono text-[7px]">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations Section */}
            <Card variant="solid" className="space-y-4 p-6">
              <div className="flex items-center gap-2">
                <MessageSquare className="text-primary h-4 w-4" />
                <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                  Recommendations
                </h3>
              </div>
              <div className="space-y-4">
                {recommendations.map((rec, i) => (
                  <div
                    key={i}
                    className="border-border/10 flex gap-3 border-b pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="bg-primary/10 text-primary flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-extrabold">
                      {rec.avatar}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <h4 className="text-foreground text-[11px] font-bold">{rec.name}</h4>
                        <span className="text-muted-foreground/60 font-mono text-[8px]">
                          ({rec.relation})
                        </span>
                      </div>
                      <p className="text-muted-foreground font-mono text-[8px]">{rec.role}</p>
                      <p className="text-muted-foreground pt-1 text-[11px] leading-relaxed">
                        "{rec.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column LinkedIn Insights Panel */}
          <div className="space-y-6">
            {/* Headline Optimization Tips */}
            <Card variant="solid" className="space-y-3 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="text-primary h-4.5 w-4.5" />
                <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                  Headline Strategy
                </h3>
              </div>
              <p className="text-muted-foreground text-[10px] leading-relaxed">
                LinkedIn headlines are indexed heavily by ATS systems. A transitions PM must balance
                showing their deep analytical domain with target PM keywords.
              </p>
              <div className="bg-secondary/40 border-border/10 space-y-1 rounded-xl border p-3">
                <span className="text-foreground block font-mono text-[8px] font-bold">
                  FORMULA
                </span>
                <code className="text-primary block font-mono text-[9px]">
                  [Current Role] | Specializing in [Analytic Strength] | Transitioning to [Target PM
                  Role]
                </code>
              </div>
            </Card>

            {/* Featured Projects Mock */}
            <Card variant="solid" className="space-y-3 p-4">
              <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Featured Projects
              </h3>
              <div className="space-y-3">
                {projects.slice(0, 2).map((proj) => (
                  <a href={`/product-lab?slug=${proj.slug}`} key={proj.id} className="group block">
                    <div className="bg-secondary/20 hover:bg-secondary/40 border-border/10 space-y-1 rounded-xl border p-3 transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-primary font-mono text-[8px] font-bold uppercase">
                          PROJECT FEATURE
                        </span>
                        <ArrowRight className="text-muted-foreground group-hover:text-primary h-3.5 w-3.5 transition-colors" />
                      </div>
                      <h4 className="text-foreground group-hover:text-primary text-xs leading-snug font-bold transition-colors">
                        {proj.title}
                      </h4>
                      <p className="text-muted-foreground line-clamp-2 text-[10px] leading-relaxed">
                        {proj.problem}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </Card>

            {/* Skills & Endorsements Mock */}
            <Card variant="solid" className="space-y-3 p-4">
              <h3 className="text-foreground font-mono text-xs font-bold tracking-wider uppercase">
                Top Skills
              </h3>
              <div className="space-y-2">
                {[
                  { name: "Agile Backlog Prioritization", count: 24, cat: "PM Transition" },
                  { name: "SQL Cohort Telemetry Analysis", count: 42, cat: "Analytical Core" },
                  { name: "User Journey & Spec Writing", count: 18, cat: "UX Architect" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="bg-secondary/15 border-border/10 flex items-center justify-between rounded-lg border p-2.5"
                  >
                    <div>
                      <div className="text-foreground text-xs font-bold">{s.name}</div>
                      <span className="text-muted-foreground/60 font-mono text-[8px] uppercase">
                        {s.cat}
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className="border-primary/20 text-primary shrink-0 font-mono text-[8px]"
                    >
                      +{s.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
