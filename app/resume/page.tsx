"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  Eye,
  Briefcase,
  GraduationCap,
  Award,
  Code2,
  TrendingUp,
  MapPin,
  Mail,
  ChevronRight,
  CheckCircle,
} from "lucide-react";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/cards/card";
import { Badge } from "@/components/ui/badges";
import { cn } from "@/lib/utils";
import profileData from "@/data/profile.json";
import experienceData from "@/data/experience.json";
import skillsData from "@/data/skills/example.json";
import certificationsData from "@/data/certifications.json";

type Experience = (typeof experienceData.example)[number];
type Skill = (typeof skillsData)[number];
type Cert = (typeof certificationsData.example)[number];

const RESUME_SECTIONS = [
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
];

function formatDate(d: string) {
  if (d === "Present") return "Present";
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
  return `${months[parseInt(m) - 1]} ${y}`;
}

export default function ResumePage() {
  const profile = profileData.example as any;
  const experiences = experienceData.example as Experience[];
  const skills = skillsData as Skill[];
  const certs = certificationsData.example as Cert[];

  const [activeSection, setActiveSection] = useState("profile");

  // Group skills by category
  const groupedSkills = skills.reduce<Record<string, Skill[]>>((acc, s) => {
    const cat = s.category.replace(/-/g, " ");
    acc[cat] = acc[cat] ?? [];
    acc[cat].push(s);
    return acc;
  }, {});

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 border-primary/20 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border">
              <FileText className="text-primary h-5 w-5" />
            </div>
            <div>
              <span className="text-primary font-mono text-[9px] tracking-widest uppercase">
                Career Document
              </span>
              <h1 className="text-foreground text-2xl font-extrabold tracking-tight">Resume</h1>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Structured professional overview — all data from the intelligence layer.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="bg-primary text-primary-foreground inline-flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-[10px] tracking-wider uppercase transition-opacity hover:opacity-90"
              aria-label="Download PDF resume"
            >
              <Download className="h-3.5 w-3.5" /> Download PDF
            </a>
          </div>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sticky section nav */}
          <aside className="space-y-2 lg:sticky lg:top-24 lg:self-start">
            <Card variant="glass" className="p-3">
              <span className="text-primary mb-2 block pl-1 font-mono text-[8px] font-bold uppercase">
                SECTIONS
              </span>
              <nav className="space-y-1">
                {RESUME_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => {
                      setActiveSection(sec.id);
                      document
                        .getElementById(`res-${sec.id}`)
                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    className={cn(
                      "w-full rounded px-2 py-1.5 text-left font-mono text-[9px] tracking-wider uppercase transition-all",
                      activeSection === sec.id
                        ? "bg-primary/15 text-primary"
                        : "text-muted-foreground hover:bg-secondary/40 hover:text-foreground",
                    )}
                  >
                    {sec.label}
                  </button>
                ))}
              </nav>
            </Card>

            {/* Identity card */}
            <Card variant="solid" className="space-y-3 p-4">
              <div className="text-muted-foreground space-y-1.5 font-mono text-[9px] uppercase">
                <div className="flex items-center gap-2">
                  <Mail className="h-3 w-3 shrink-0" />
                  <span className="text-foreground">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 shrink-0" />
                  <span className="text-foreground">{profile.location}</span>
                </div>
              </div>
              <div className="border-border/10 border-t pt-2">
                <span className="text-muted-foreground mb-1 block font-mono text-[8px] uppercase">
                  Target Role
                </span>
                <span className="text-primary font-mono text-[10px] font-bold">
                  {profile.targetRole}
                </span>
              </div>
            </Card>
          </aside>

          {/* Resume content */}
          <div className="space-y-10">
            {/* Profile */}
            <section id="res-profile" className="scroll-mt-24 space-y-4">
              <ResumeSection
                icon={<Eye className="text-primary h-4 w-4" />}
                title="Professional Profile"
              />
              <Card variant="solid" className="p-6">
                <div className="space-y-3">
                  <div>
                    <h2 className="text-foreground text-lg font-extrabold">{profile.name}</h2>
                    <p className="text-primary mt-0.5 font-mono text-[10px]">{profile.headline}</p>
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">{profile.summary}</p>
                  <div>
                    <span className="text-muted-foreground mb-2 block font-mono text-[8px] uppercase">
                      Core Strengths
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {profile.strengths.map((s: string) => (
                        <Badge key={s} variant="default" className="text-[8px]">
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="border-border/10 border-t pt-3">
                    <span className="text-muted-foreground mb-2 block font-mono text-[8px] uppercase">
                      Why Product Management
                    </span>
                    <p className="text-muted-foreground border-primary/30 border-l-2 pl-3 text-xs leading-relaxed italic">
                      "{profile.transitionNarrative.whyProductManagement}"
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* Experience */}
            <section id="res-experience" className="scroll-mt-24 space-y-4">
              <ResumeSection
                icon={<Briefcase className="text-primary h-4 w-4" />}
                title="Work Experience"
              />
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <Card key={exp.id} variant="solid" className="space-y-3 p-5">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-foreground text-sm font-bold">{exp.role}</h3>
                        <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-2 font-mono text-[9px]">
                          <span>{exp.company}</span>
                          <span>·</span>
                          <span>{exp.location}</span>
                          {exp.isCurrent && (
                            <Badge variant="growth" className="text-[7px]">
                              Current
                            </Badge>
                          )}
                        </div>
                      </div>
                      <span className="text-muted-foreground shrink-0 font-mono text-[9px]">
                        {formatDate(exp.startDate)} – {formatDate(exp.endDate)}
                      </span>
                    </div>
                    {exp.summary && (
                      <p className="text-muted-foreground text-xs leading-relaxed">{exp.summary}</p>
                    )}
                    <ul className="space-y-1.5">
                      {exp.responsibilities.slice(0, 4).map((r, i) => (
                        <li
                          key={i}
                          className="text-muted-foreground flex items-start gap-2 text-xs"
                        >
                          <ChevronRight className="text-primary mt-0.5 h-3.5 w-3.5 shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {[...exp.pmKeywords.slice(0, 3), ...exp.baKeywords.slice(0, 2)].map((k) => (
                        <Badge key={k} variant="secondary" className="font-mono text-[7px]">
                          {k}
                        </Badge>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section id="res-skills" className="scroll-mt-24 space-y-4">
              <ResumeSection
                icon={<Code2 className="text-primary h-4 w-4" />}
                title="Skills & Capabilities"
              />
              <div className="space-y-4">
                {Object.entries(groupedSkills).map(([cat, catSkills]) => (
                  <div key={cat}>
                    <span className="text-muted-foreground mb-2 block font-mono text-[9px] font-bold uppercase">
                      {cat}
                    </span>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {catSkills.map((skill) => (
                        <div
                          key={skill.id}
                          className="bg-secondary/10 border-border/10 flex items-center justify-between rounded-lg border px-3 py-2"
                        >
                          <span className="text-foreground text-xs font-medium">{skill.name}</span>
                          <div className="flex shrink-0 items-center gap-2">
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                  key={i}
                                  className={cn(
                                    "h-1.5 w-4 rounded-full",
                                    i < skill.level ? "bg-primary" : "bg-secondary/50",
                                  )}
                                />
                              ))}
                            </div>
                            <span className="text-muted-foreground font-mono text-[8px]">
                              {skill.level}/5
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section id="res-certifications" className="scroll-mt-24 space-y-4 pb-4">
              <ResumeSection
                icon={<Award className="text-primary h-4 w-4" />}
                title="Certifications"
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {certs.map((cert, i) => (
                  <Card key={i} variant="solid" className="flex items-start gap-3 p-4">
                    <div className="bg-warning/10 border-warning/20 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
                      <Award className="text-warning h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-foreground text-xs font-bold">{cert.name}</h4>
                      <p className="text-muted-foreground mt-0.5 font-mono text-[9px]">
                        {cert.issuer}
                      </p>
                      <p className="text-muted-foreground font-mono text-[9px]">{cert.date}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ResumeSection({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="border-border/20 flex items-center gap-2 border-b pb-3">
      <div className="bg-primary/10 border-primary/20 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border">
        {icon}
      </div>
      <h2 className="text-foreground text-sm font-extrabold">{title}</h2>
    </div>
  );
}
