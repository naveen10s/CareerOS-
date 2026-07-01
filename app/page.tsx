"use client";

import React, { useEffect, useState } from "react";
import {
  Sparkles,
  ArrowRight,
  Layers,
  Activity,
  TrendingUp,
  Briefcase,
  Code2,
  BookOpen,
  Award,
  FileText,
  Mail,
  Clock,
  CheckCircle2,
  Calendar,
  Compass,
  FolderGit,
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/cards/card";
import Button from "@/components/buttons/button";
import { Badge } from "@/components/ui/badges";
import {
  StaggerContainer,
  StaggerItem,
  Magnetic,
  GlowHover,
  CardLift,
} from "@/components/animations/motion-hooks";
import { SplitTextReveal } from "@/components/animations/gsap-animate";

// Direct JSON data imports
import profileData from "@/data/profile.json";
import statsData from "@/data/stats.json";
import skillsData from "@/data/skills.json";
import experienceData from "@/data/experience.json";
import projectsData from "@/data/projects.json";
import certificationsData from "@/data/certifications.json";
import learningData from "@/data/learning.json";
import achievementsData from "@/data/achievements.json";

// ----------------------------------------------------
// ANIMATED COUNTER COMPONENT FOR QUICK STATS
// ----------------------------------------------------
function AnimatedNumber({ value }: { value: number }) {
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { stiffness: 60, damping: 15, mass: 1 });
  const displayVal = useTransform(springVal, (latest) => Math.floor(latest));
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    motionVal.set(value);
    const unsubscribe = displayVal.on("change", (val) => setCurrent(val));
    return () => unsubscribe();
  }, [value, motionVal, displayVal]);

  return <span>{current}</span>;
}

export default function HomePage() {
  const profile = profileData.example as any;
  const stats = statsData;
  const skills = skillsData.example;
  const experience = experienceData.example;
  const projects = projectsData.example;
  const certifications = certificationsData.example;
  const learning = learningData.example;
  const achievements = achievementsData.example;

  const [greeting, setGreeting] = useState("Hello 👋");

  useEffect(() => {
    const hr = new Date().getHours();
    if (hr < 12) setGreeting("Good Morning 👋");
    else if (hr < 17) setGreeting("Good Afternoon 👋");
    else setGreeting("Good Evening 👋");
  }, []);

  return (
    <DashboardLayout>
      <div className="max-w-container-max mx-auto w-full flex-1 space-y-12 p-6 pb-28 md:p-8">
        {/* SECTION 2: PROFESSIONAL IDENTITY */}
        <section className="space-y-6">
          <div className="border-border/20 flex flex-col gap-4 border-b pb-8">
            <div className="space-y-2">
              <span className="text-primary flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest uppercase">
                <Sparkles className="h-3.5 w-3.5" />
                SYSTEM INITIALIZED & OPERATIONAL
              </span>
              <h1 className="text-heading-xl text-muted-foreground flex flex-col gap-2 font-bold tracking-tight sm:flex-row sm:items-center">
                <span>{greeting}</span>
                <span className="text-foreground font-extrabold">{profile.name}</span>
              </h1>
              <SplitTextReveal
                text={`${profile.currentRole} ➔ ${profile.targetRole}`}
                className="text-body-l text-text-primary mt-1 font-semibold"
              />
            </div>

            <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
              {profile.summary}
            </p>

            {/* CTA Buttons array */}
            <div className="flex flex-wrap items-center gap-3 pt-3">
              <Magnetic range={30}>
                <a href="/resume">
                  <Button
                    variant="default"
                    size="sm"
                    rightIcon={<FileText className="h-3.5 w-3.5" />}
                  >
                    Resumé Spec
                  </Button>
                </a>
              </Magnetic>
              <Magnetic range={30}>
                <a href="/projects">
                  <Button
                    variant="glass"
                    size="sm"
                    rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
                  >
                    View Projects
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
              <div className="bg-border/40 mx-2 hidden h-6 w-px sm:block" />
              <Magnetic range={40}>
                <a
                  href={profile.links?.github || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border-border/10 flex h-8.5 w-8.5 items-center justify-center rounded-lg border"
                  >
                    <svg
                      className="text-muted-foreground hover:text-foreground h-4 w-4 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </Button>
                </a>
              </Magnetic>
              <Magnetic range={40}>
                <a
                  href={profile.links?.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="border-border/10 flex h-8.5 w-8.5 items-center justify-center rounded-lg border"
                  >
                    <svg
                      className="text-muted-foreground hover:text-foreground h-4 w-4 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </Button>
                </a>
              </Magnetic>
            </div>
          </div>
        </section>

        {/* SECTION 3: CAREER SNAPSHOT */}
        <section className="space-y-4">
          <h2 className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
            Career Snapshot Telemetry
          </h2>
          <StaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <StaggerItem>
              <Card variant="solid" className="flex h-full flex-col justify-between">
                <CardHeader className="pb-2">
                  <span className="text-muted-foreground font-mono text-[9px] uppercase">
                    Role Parameters
                  </span>
                  <CardTitle className="text-foreground mt-1 text-xs font-bold">
                    Current Anchor
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs leading-relaxed">
                  Active tenure as a <strong>{profile.currentRole}</strong>, delivering data
                  analytics models and aligning cross-functional teams.
                </CardContent>
                <CardFooter className="text-primary pt-2 font-mono text-[10px]">
                  100% OPERATIONAL TENURE
                </CardFooter>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="solid" className="flex h-full flex-col justify-between">
                <CardHeader className="pb-2">
                  <span className="text-primary font-mono text-[9px] uppercase">
                    Target Milestone
                  </span>
                  <CardTitle className="text-foreground mt-1 text-xs font-bold">
                    Transition Vector
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs leading-relaxed">
                  Steering data insights toward core <strong>{profile.targetRole}</strong>{" "}
                  functions—focusing on user journeys and telemetry metrics execution.
                </CardContent>
                <CardFooter className="text-success pt-2 font-mono text-[10px]">
                  TRANSITION: IN-FLIGHT
                </CardFooter>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="solid" className="flex h-full flex-col justify-between">
                <CardHeader className="pb-2">
                  <span className="text-muted-foreground font-mono text-[9px] uppercase">
                    Agile Experience
                  </span>
                  <CardTitle className="text-foreground mt-1 text-xs font-bold">
                    Sprint tenure
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs leading-relaxed">
                  Active experience facilitating backlog grooming, writing engineering stories, and
                  managing sprint commitments.
                </CardContent>
                <CardFooter className="text-info pt-2 font-mono text-[10px]">
                  {experience[0].company} SYNCED
                </CardFooter>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="solid" className="flex h-full flex-col justify-between">
                <CardHeader className="pb-2">
                  <span className="text-muted-foreground font-mono text-[9px] uppercase">
                    Project Footprint
                  </span>
                  <CardTitle className="text-foreground mt-1 text-xs font-bold">
                    Product Launches
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs leading-relaxed">
                  Designed telemetry redesigns saving query times and improving cohort tracking
                  decisions for executive boards.
                </CardContent>
                <CardFooter className="text-primary pt-2 font-mono text-[10px]">
                  CASE STUDY: {projects[0].id.toUpperCase()}
                </CardFooter>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="solid" className="flex h-full flex-col justify-between">
                <CardHeader className="pb-2">
                  <span className="text-muted-foreground font-mono text-[9px] uppercase">
                    Learning Engine
                  </span>
                  <CardTitle className="text-foreground mt-1 text-xs font-bold">
                    Academic Upskilling
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs leading-relaxed">
                  Focusing on <strong>{learning[0].topic}</strong> via platforms like{" "}
                  {learning[0].platform} to expand product wireframing.
                </CardContent>
                <CardFooter className="text-warning pt-2 font-mono text-[10px]">
                  PROGRESS: {learning[0].progress}% ACTIVE
                </CardFooter>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card variant="solid" className="flex h-full flex-col justify-between">
                <CardHeader className="pb-2">
                  <span className="text-muted-foreground font-mono text-[9px] uppercase">
                    AI & Technology
                  </span>
                  <CardTitle className="text-foreground mt-1 text-xs font-bold">
                    System Competencies
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-xs leading-relaxed">
                  Utilizing next-gen frameworks (Next.js 15, TypeScript) alongside telemetry AI
                  processing queries.
                </CardContent>
                <CardFooter className="text-primary pt-2 font-mono text-[10px]">
                  TECH STACK OPTIMIZED
                </CardFooter>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </section>

        {/* SECTION 4: QUICK STATS */}
        <section className="space-y-4">
          <h2 className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
            Quick Operational Metrics
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
            <Card variant="glass" className="p-4 text-center">
              <span className="text-heading-xl text-foreground block font-mono font-extrabold">
                <AnimatedNumber value={stats.projects} />
              </span>
              <span className="text-muted-foreground mt-1 block font-mono text-[9px] uppercase">
                Projects
              </span>
            </Card>

            <Card variant="glass" className="p-4 text-center">
              <span className="text-heading-xl text-foreground block font-mono font-extrabold">
                <AnimatedNumber value={stats.technologies} />
              </span>
              <span className="text-muted-foreground mt-1 block font-mono text-[9px] uppercase">
                Technologies
              </span>
            </Card>

            <Card variant="glass" className="p-4 text-center">
              <span className="text-heading-xl text-foreground block font-mono font-extrabold">
                <AnimatedNumber value={stats.stakeholders} />
              </span>
              <span className="text-muted-foreground mt-1 block font-mono text-[9px] uppercase">
                Stakeholders
              </span>
            </Card>

            <Card variant="glass" className="p-4 text-center">
              <span className="text-heading-xl text-foreground block font-mono font-extrabold">
                <AnimatedNumber value={stats.domains} />
              </span>
              <span className="text-muted-foreground mt-1 block font-mono text-[9px] uppercase">
                Domains
              </span>
            </Card>

            <Card variant="glass" className="p-4 text-center">
              <span className="text-heading-xl text-foreground block font-mono font-extrabold">
                <AnimatedNumber value={stats.learningHours} />
              </span>
              <span className="text-muted-foreground mt-1 block font-mono text-[9px] uppercase">
                Learning Hours
              </span>
            </Card>

            <Card variant="glass" className="p-4 text-center">
              <span className="text-heading-xl text-foreground block font-mono font-extrabold">
                <AnimatedNumber value={stats.certificates} />
              </span>
              <span className="text-muted-foreground mt-1 block font-mono text-[9px] uppercase">
                Certificates
              </span>
            </Card>
          </div>
        </section>

        {/* SECTION 5: CURRENT FOCUS */}
        <section className="space-y-4">
          <h2 className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
            Current Specialization Focus Areas
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-5">
            <Card variant="solid" className="flex h-40 flex-col justify-between p-5">
              <BookOpen className="text-primary h-5 w-5" />
              <div>
                <h3 className="text-foreground mt-3 text-xs font-bold">Product Strategy</h3>
                <p className="text-muted-foreground mt-1 text-[10px] leading-normal">
                  Defining milestones and MVP priorities.
                </p>
              </div>
            </Card>

            <Card variant="solid" className="flex h-40 flex-col justify-between p-5">
              <Code2 className="text-success h-5 w-5" />
              <div>
                <h3 className="text-foreground mt-3 text-xs font-bold">SQL Queries</h3>
                <p className="text-muted-foreground mt-1 text-[10px] leading-normal">
                  Constructing schema filters for cohort analysis.
                </p>
              </div>
            </Card>

            <Card variant="solid" className="flex h-40 flex-col justify-between p-5">
              <Activity className="text-info h-5 w-5" />
              <div>
                <h3 className="text-foreground mt-3 text-xs font-bold">Product Analytics</h3>
                <p className="text-muted-foreground mt-1 text-[10px] leading-normal">
                  Monitoring user activation funnel telemetry.
                </p>
              </div>
            </Card>

            <Card variant="solid" className="flex h-40 flex-col justify-between p-5">
              <Sparkles className="text-primary h-5 w-5" />
              <div>
                <h3 className="text-foreground mt-3 text-xs font-bold">AI Competencies</h3>
                <p className="text-muted-foreground mt-1 text-[10px] leading-normal">
                  Integrating automated queries to resolve data blocks.
                </p>
              </div>
            </Card>

            <Card variant="solid" className="flex h-40 flex-col justify-between p-5">
              <Layers className="text-warning h-5 w-5" />
              <div>
                <h3 className="text-foreground mt-3 text-xs font-bold">Agile Sprints</h3>
                <p className="text-muted-foreground mt-1 text-[10px] leading-normal">
                  Facilitating backlog planning sessions.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* SECTION 6: LATEST ACTIVITY */}
        <section className="space-y-4">
          <h2 className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
            System Event Log / Latest Activity
          </h2>
          <Card variant="solid">
            <CardContent className="p-6">
              <div className="border-border/20 relative space-y-6 border-l pl-6">
                {/* 1. Recently Updated Project */}
                <div className="relative">
                  <span className="bg-primary border-background absolute top-1.5 -left-[29px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2">
                    <Code2 className="h-1.5 w-1.5 text-white" />
                  </span>
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[9px] uppercase">
                      <Clock className="text-primary h-3 w-3" /> RECENTLY UPDATED PROJECT
                    </span>
                    <h3 className="text-foreground text-xs font-bold">{projects[0].title}</h3>
                    <p className="text-muted-foreground max-w-2xl text-[11px] leading-relaxed">
                      {projects[0].problem} Outcomes: {projects[0].metrics[0]}.
                    </p>
                  </div>
                </div>

                {/* 2. Latest Certification */}
                <div className="relative">
                  <span className="bg-success border-background absolute top-1.5 -left-[29px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2">
                    <Award className="h-1.5 w-1.5 text-white" />
                  </span>
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[9px] uppercase">
                      <Award className="text-success h-3 w-3" /> LATEST CERTIFICATION CREDENTIAL
                    </span>
                    <h3 className="text-foreground text-xs font-bold">{certifications[0].name}</h3>
                    <p className="text-muted-foreground max-w-2xl text-[11px] leading-relaxed">
                      Issued by <strong>{certifications[0].issuer}</strong> in{" "}
                      {certifications[0].date}.
                    </p>
                  </div>
                </div>

                {/* 3. Latest Learning */}
                <div className="relative">
                  <span className="bg-warning border-background absolute top-1.5 -left-[29px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2">
                    <BookOpen className="h-1.5 w-1.5 text-white" />
                  </span>
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[9px] uppercase">
                      <BookOpen className="text-warning h-3 w-3" /> LATEST CURRICULUM UPGRADE
                    </span>
                    <h3 className="text-foreground text-xs font-bold">{learning[0].topic}</h3>
                    <p className="text-muted-foreground max-w-2xl text-[11px] leading-relaxed">
                      Completed active path tracking under {learning[0].platform} to expand:{" "}
                      {learning[0].relevance}
                    </p>
                  </div>
                </div>

                {/* 4. Latest Achievement */}
                <div className="relative">
                  <span className="bg-info border-background absolute top-1.5 -left-[29px] flex h-3.5 w-3.5 items-center justify-center rounded-full border-2">
                    <CheckCircle2 className="h-1.5 w-1.5 text-white" />
                  </span>
                  <div className="space-y-1">
                    <span className="text-muted-foreground flex items-center gap-1.5 font-mono text-[9px] uppercase">
                      <Sparkles className="text-info h-3 w-3" /> LATEST SYSTEM CITATION
                    </span>
                    <h3 className="text-foreground text-xs font-bold">{achievements[0].title}</h3>
                    <p className="text-muted-foreground max-w-2xl text-[11px] leading-relaxed">
                      {achievements[0].description} Impact: {achievements[0].metricImpact}.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* SECTION 7: QUICK NAVIGATION */}
        <section className="space-y-4">
          <h2 className="text-primary font-mono text-xs font-bold tracking-wider uppercase">
            Quick System Navigation Modules
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            <a href="/journey" className="group select-none">
              <GlowHover className="h-full">
                <Card
                  variant="glass"
                  className="hover:bg-secondary/40 flex h-full flex-col justify-between p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <TrendingUp className="text-primary duration-normal h-5 w-5 transition-transform group-hover:scale-110" />
                    <ArrowRight className="text-muted-foreground duration-fast h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-foreground text-xs font-bold">Journey</h3>
                    <p className="text-muted-foreground mt-1 text-[10px]">
                      Chronological progression timeline mapping.
                    </p>
                  </div>
                </Card>
              </GlowHover>
            </a>

            <a href="/projects" className="group select-none">
              <GlowHover className="h-full">
                <Card
                  variant="glass"
                  className="hover:bg-secondary/40 flex h-full flex-col justify-between p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <FolderGit className="text-success duration-normal h-5 w-5 transition-transform group-hover:scale-110" />
                    <ArrowRight className="text-muted-foreground duration-fast h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-foreground text-xs font-bold">Projects</h3>
                    <p className="text-muted-foreground mt-1 text-[10px]">
                      Deep-dive strategic product case studies.
                    </p>
                  </div>
                </Card>
              </GlowHover>
            </a>

            <a href="/dashboard" className="group select-none">
              <GlowHover className="h-full">
                <Card
                  variant="glass"
                  className="hover:bg-secondary/40 flex h-full flex-col justify-between p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <Layers className="text-info duration-normal h-5 w-5 transition-transform group-hover:scale-110" />
                    <ArrowRight className="text-muted-foreground duration-fast h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-foreground text-xs font-bold">Skills Matrix</h3>
                    <p className="text-muted-foreground mt-1 text-[10px]">
                      Inspect PM and BA skill level vectors.
                    </p>
                  </div>
                </Card>
              </GlowHover>
            </a>

            <a href="/learning" className="group select-none">
              <GlowHover className="h-full">
                <Card
                  variant="glass"
                  className="hover:bg-secondary/40 flex h-full flex-col justify-between p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <BookOpen className="text-warning duration-normal h-5 w-5 transition-transform group-hover:scale-110" />
                    <ArrowRight className="text-muted-foreground duration-fast h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-foreground text-xs font-bold">Learning Path</h3>
                    <p className="text-muted-foreground mt-1 text-[10px]">
                      Upskilling trackers, courses, and readings.
                    </p>
                  </div>
                </Card>
              </GlowHover>
            </a>

            <a href="/resume" className="group select-none">
              <GlowHover className="h-full">
                <Card
                  variant="glass"
                  className="hover:bg-secondary/40 flex h-full flex-col justify-between p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <FileText className="text-primary duration-normal h-5 w-5 transition-transform group-hover:scale-110" />
                    <ArrowRight className="text-muted-foreground duration-fast h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-foreground text-xs font-bold">Resumé Spec</h3>
                    <p className="text-muted-foreground mt-1 text-[10px]">
                      Inspect and download printable resumé.
                    </p>
                  </div>
                </Card>
              </GlowHover>
            </a>

            <a href="/contact" className="group select-none">
              <GlowHover className="h-full">
                <Card
                  variant="glass"
                  className="hover:bg-secondary/40 flex h-full flex-col justify-between p-6 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <Mail className="text-success duration-normal h-5 w-5 transition-transform group-hover:scale-110" />
                    <ArrowRight className="text-muted-foreground duration-fast h-4 w-4 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                  <div className="mt-8">
                    <h3 className="text-foreground text-xs font-bold">Contact</h3>
                    <p className="text-muted-foreground mt-1 text-[10px]">
                      Schedule scheduling calendars and links.
                    </p>
                  </div>
                </Card>
              </GlowHover>
            </a>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
