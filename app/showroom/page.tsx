"use client";

import React, { useState } from "react";
import {
  Play,
  Activity,
  Award,
  BookOpen,
  Briefcase,
  Code2,
  Settings,
  Search,
  Bell,
  Mail,
  FileText,
  User,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Info,
  Layers,
  Fingerprint,
  Home,
  FolderGit,
} from "lucide-react";
import Button from "@/components/buttons/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/cards/card";
import { MetricWidget, ActivityWidget, ProgressWidget } from "@/components/dashboard/widget";
import { FadeIn, ScaleIn, Reveal } from "@/components/animations/motion";
import { GSAPReveal, SplitTextReveal } from "@/components/animations/gsap-animate";
import {
  Magnetic,
  CardLift,
  StaggerContainer,
  StaggerItem,
  GlowHover,
} from "@/components/animations/motion-hooks";
import { Input, Textarea, SearchInput, Switch, Select } from "@/components/ui/inputs";
import { Badge, Chip } from "@/components/ui/badges";
import {
  Dialog,
  Tooltip,
  Dropdown,
  DropdownItem,
  Accordion,
  AccordionItem,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Avatar,
  Progress,
} from "@/components/ui/overlay-primitives";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";

export default function Page() {
  const [activeTab, setActiveTab] = useState("typography");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [switchVal, setSwitchVal] = useState(false);
  const [selectVal, setSelectVal] = useState("opt1");
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [chips, setChips] = useState(["Roadmaps", "User Testing", "SQL Queries"]);

  const mockActivities = [
    {
      id: "act-1",
      title: "Product Requirement Doc Drafted",
      description: "Mapped user journey for telemetry analytics dashboard.",
      time: "2 hours ago",
      isMilestone: true,
    },
    {
      id: "act-2",
      title: "SQL Performance Query Optimized",
      description: "Improved dashboard loading latency by 45%.",
      time: "1 day ago",
      isMilestone: false,
    },
    {
      id: "act-3",
      title: "Completed Agile Backlog Grooming",
      description: "Prioritized user stories with technical engineering team.",
      time: "3 days ago",
      isMilestone: false,
    },
  ];

  const triggerLoadingDemo = () => {
    setLoadingBtn(true);
    setTimeout(() => setLoadingBtn(false), 2000);
  };

  const removeChip = (val: string) => {
    setChips(chips.filter((c) => c !== val));
  };

  return (
    <DashboardLayout>
      {/* Scrollable Contents */}
      <div className="max-w-container-max mx-auto w-full flex-1 space-y-12 p-8 pb-28">
        {/* Header Description */}
        <section className="space-y-3">
          <div className="text-primary flex items-center gap-1.5 font-mono text-xs font-bold tracking-widest uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Sprint 1 | Task 002 Showroom
          </div>

          <SplitTextReveal
            text="NaveenOS Design System"
            className="text-foreground text-4xl font-extrabold tracking-tight"
          />

          <FadeIn delay={0.2} direction="up" distance={10}>
            <p className="text-muted-foreground max-w-2xl text-xs leading-relaxed">
              Render engine displaying typography grids, inputs, badges, dialog portals, docks, and
              spring-physics motion models. Toggle between Dark & Light themes or hit{" "}
              <kbd className="border-border bg-secondary/80 rounded border px-1 py-0.5 font-mono text-[9px]">
                Ctrl+K
              </kbd>{" "}
              to trigger the Command Bar.
            </p>
          </FadeIn>
        </section>

        {/* MAIN TABS MATRIX */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="typography">Tokens & Typo</TabsTrigger>
            <TabsTrigger value="components">UI Components</TabsTrigger>
            <TabsTrigger value="overlays">Overlay Portals</TabsTrigger>
            <TabsTrigger value="widgets">Dashboard Analytics</TabsTrigger>
            <TabsTrigger value="motion">tactile Motion</TabsTrigger>
          </TabsList>

          {/* TAB 1: TYPOGRAPHY AND TOKENS */}
          <TabsContent value="typography" className="space-y-6 pt-4">
            <Card variant="solid">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Typographic Scale Matrix</CardTitle>
                <CardDescription>
                  Hierarchical scales defined with responsive line heights.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="border-border/20 border-b pb-2">
                    <span className="text-muted-foreground font-mono text-[10px] uppercase">
                      Hero XXL (64px)
                    </span>
                    <h1 className="text-hero-xxl leading-hero-xxl font-extrabold tracking-tighter">
                      Hero XXL Title
                    </h1>
                  </div>
                  <div className="border-border/20 border-b pb-2">
                    <span className="text-muted-foreground font-mono text-[10px] uppercase">
                      Display XL (48px)
                    </span>
                    <h2 className="text-display-xl leading-display-xl font-bold tracking-tight">
                      Display XL Subtitle
                    </h2>
                  </div>
                  <div className="border-border/20 border-b pb-2">
                    <span className="text-muted-foreground font-mono text-[10px] uppercase">
                      Heading XL/L/M/S
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-heading-xl leading-heading-xl font-bold">
                        Heading XL Title
                      </h3>
                      <h4 className="text-heading-l leading-heading-l font-bold">
                        Heading L Title
                      </h4>
                      <h5 className="text-heading-m leading-heading-m font-bold">
                        Heading M Title
                      </h5>
                      <h6 className="text-heading-s leading-heading-s font-bold">
                        Heading S Title
                      </h6>
                    </div>
                  </div>
                  <div className="border-border/20 border-b pb-2">
                    <span className="text-muted-foreground font-mono text-[10px] uppercase">
                      Body L (18px) & Body (16px)
                    </span>
                    <p className="text-body-l text-text-primary leading-body-l">
                      Body Large: Mapped for primary article paragraphs or details.
                    </p>
                    <p className="text-body text-text-secondary leading-body mt-1">
                      Body Default: Standard reading copy text blocks and descriptions.
                    </p>
                  </div>
                  <div className="border-border/20 flex items-center justify-between border-b pb-2">
                    <div>
                      <span className="text-muted-foreground block font-mono text-[10px] uppercase">
                        Caption & Label
                      </span>
                      <span className="text-caption text-muted-foreground mr-4">
                        Caption Info Text
                      </span>
                      <span className="text-label text-muted-foreground font-semibold">
                        Label Tag
                      </span>
                    </div>
                    <div>
                      <span className="text-muted-foreground block font-mono text-[10px] uppercase">
                        Mono Stack
                      </span>
                      <span className="text-mono font-mono">SP1_FOUNDATION_TOKEN_OK</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB 2: UI COMPONENTS (BUTTONS, INPUTS, BADGES, CHIPS) */}
          <TabsContent value="components" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Inputs & Form widgets */}
              <Card variant="solid">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Form Components</CardTitle>
                  <CardDescription>
                    Includes accessibility markers and error validation triggers.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <SearchInput placeholder="Search backlog user stories..." />
                  <Input
                    label="Product Roadmap Item Name"
                    placeholder="e.g. Telemetry redesign"
                    helperText="Please keep characters under 50."
                  />
                  <Textarea
                    label="Target Strategic Rationale"
                    placeholder="Describe the BA to PM business impact..."
                  />
                  <div className="flex items-center justify-between pt-2">
                    <Switch
                      label="Enable Real-Time Alerts"
                      checked={switchVal}
                      onCheckedChange={setSwitchVal}
                    />
                    <Select
                      className="w-40"
                      value={selectVal}
                      onChange={(e) => setSelectVal(e.target.value)}
                      options={[
                        { label: "Vibrant Violet", value: "opt1" },
                        { label: "Metrics Emerald", value: "opt2" },
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Buttons & Badges */}
              <div className="space-y-6">
                <Card variant="solid">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">Tactile Buttons</CardTitle>
                    <CardDescription> tactility triggers with customized shapes.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2.5">
                    <Button variant="default" size="sm">
                      Primary
                    </Button>
                    <Button variant="secondary" size="sm">
                      Secondary
                    </Button>
                    <Button variant="glass" size="sm">
                      Frosted Glass
                    </Button>
                    <Button variant="outline" size="sm">
                      Outline
                    </Button>
                    <Button variant="growth" size="sm">
                      Growth
                    </Button>
                    <Button variant="insight" size="sm">
                      Insight
                    </Button>
                  </CardContent>
                </Card>

                <Card variant="solid">
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">
                      Badges & Interactive Chips
                    </CardTitle>
                    <CardDescription>
                      Static tag indicators and dynamic close/remove tags.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="default">Beta</Badge>
                      <Badge variant="secondary">Backlog</Badge>
                      <Badge variant="glass">Glass</Badge>
                      <Badge variant="growth">Growth +20%</Badge>
                      <Badge variant="insight">Insight</Badge>
                      <Badge variant="danger">High Priority</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {chips.map((c) => (
                        <Chip key={c} variant="glass" onRemove={() => removeChip(c)}>
                          {c}
                        </Chip>
                      ))}
                      {chips.length === 0 && (
                        <Button
                          variant="ghost"
                          size="xs"
                          onClick={() => setChips(["Roadmaps", "User Testing", "SQL Queries"])}
                        >
                          Reset Chips
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* TAB 3: OVERLAY PORTALS (DIALOGS, TOOLTIPS, DROPDOWNS, TABS, PROGRESS) */}
          <TabsContent value="overlays" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card variant="solid">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">Portal dialogs & Tooltips</CardTitle>
                  <CardDescription>Escapable, keyboard-aware triggers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center gap-4">
                    {/* Dialog Trigger */}
                    <Button variant="default" onClick={() => setDialogOpen(true)}>
                      Launch Dialog Portal
                    </Button>

                    {/* Tooltip Wrapper */}
                    <Tooltip content="Provides instant telemetry detail metrics.">
                      <div className="text-muted-foreground border-border flex cursor-help items-center gap-1.5 border-b border-dashed py-1 text-xs font-medium select-none">
                        <Info className="text-primary h-3.5 w-3.5" />
                        Hover to Inspect Tooltip
                      </div>
                    </Tooltip>
                  </div>

                  <Dialog
                    isOpen={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    title="System Diagnostic Notification"
                  >
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      NaveenOS system architecture bootstrap is running normally. All memory layers
                      and scroll bindings verified. Hit the close button or click outside to release
                      focus.
                    </p>
                    <div className="mt-6 flex justify-end gap-2">
                      <Button variant="secondary" size="sm" onClick={() => setDialogOpen(false)}>
                        Close
                      </Button>
                      <Button variant="default" size="sm" onClick={() => setDialogOpen(false)}>
                        Approve Config
                      </Button>
                    </div>
                  </Dialog>

                  {/* Progress Loader Bar */}
                  <div className="space-y-2 pt-2">
                    <span className="text-muted-foreground font-mono text-[10px] uppercase">
                      Progress Track Loader (82%)
                    </span>
                    <Progress value={82} />
                  </div>
                </CardContent>
              </Card>

              {/* Dropdowns, Accordions & Avatars */}
              <Card variant="solid">
                <CardHeader>
                  <CardTitle className="text-sm font-semibold">
                    Lists, Dropdowns & Profiles
                  </CardTitle>
                  <CardDescription>Nested item selectors and collapsible lists.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="flex items-center justify-between">
                    {/* Custom dropdown */}
                    <Dropdown
                      trigger={
                        <Button variant="secondary" size="sm">
                          Trigger Menu ▼
                        </Button>
                      }
                    >
                      <DropdownItem onClick={() => alert("Profile Clicked")}>
                        <User className="mr-2 h-3.5 w-3.5" /> User Profile
                      </DropdownItem>
                      <DropdownItem onClick={() => alert("Settings Clicked")}>
                        <Settings className="mr-2 h-3.5 w-3.5" /> System Config
                      </DropdownItem>
                      <DropdownItem isDanger onClick={() => alert("Delete Clicked")}>
                        Remove Cache
                      </DropdownItem>
                    </Dropdown>

                    {/* Profile Avatars */}
                    <div className="flex items-center gap-2">
                      <Avatar fallback="NS" />
                      <Avatar
                        fallback="JD"
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                      />
                    </div>
                  </div>

                  {/* Accordion folding list */}
                  <Accordion className="pt-2">
                    <AccordionItem title="Can I customize color tokens?">
                      Yes. Modify custom CSS variable tokens directly inside globals.css which binds
                      dynamically with the extended theme.
                    </AccordionItem>
                    <AccordionItem title="Is reduced motion supported?">
                      Yes. Framer Motion wrappers parse standard media flags to bypass spring
                      translations if reduced motion is set.
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* TAB 4: DASHBOARD ANALYTICS WIDGETS */}
          <TabsContent value="widgets" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <MetricWidget
                title="Telemetry Latency"
                value="1.8 hours"
                change="-92%"
                trend="up"
                subtext="Database query speeds after denormalizing release telemetry."
                sparklineData={[20, 35, 15, 60, 80, 50, 95]}
              />

              <ProgressWidget
                title="PM Competency Target"
                goalName="User Experience & Prototyping"
                current={78}
                target={100}
                unit="points"
              />

              <ActivityWidget title="Action Stream Logs" activities={mockActivities} />
            </div>
          </TabsContent>

          {/* TAB 5: MOTION SYSTEM (MAGNETIC, TILT TILT, STAGGER) */}
          <TabsContent value="motion" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Magnetic Wrapper Demo */}
              <Card variant="solid">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-sm font-semibold">
                    <Fingerprint className="text-primary h-4 w-4" />
                    Magnetic Attraction Physics
                  </CardTitle>
                  <CardDescription>
                    Cursor proximity translates target buttons towards mouse coordinates.
                  </CardDescription>
                </CardHeader>
                <CardContent className="border-border/20 flex h-32 items-center justify-center rounded-lg border border-dashed">
                  <Magnetic range={80} actionStrength={0.45}>
                    <Button variant="default">Hover Near Me</Button>
                  </Magnetic>
                </CardContent>
              </Card>

              {/* 3D Tilt Card Lift Demo */}
              <CardLift>
                <Card
                  variant="glow"
                  withSpotlight
                  spotlightColor="rgba(104, 56, 239, 0.07)"
                  className="h-full"
                >
                  <CardHeader>
                    <CardTitle className="text-sm font-semibold">
                      3D Tilt & Spot Glow Hover
                    </CardTitle>
                    <CardDescription>
                      Calculates mouse vectors to tilt card panels in 3D space.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-muted-foreground pt-2 text-xs leading-relaxed">
                    Move your cursor across this panel. It combines the cursor spot glow overlay
                    with spring-driven 3D coordinate rotations, resulting in a responsive,
                    SaaS-styled interface interaction.
                  </CardContent>
                </Card>
              </CardLift>
            </div>

            {/* Stagger Animation List */}
            <Card variant="solid">
              <CardHeader>
                <CardTitle className="text-sm font-semibold">Staggered Entry Lists</CardTitle>
                <CardDescription>
                  Parent delay variables trigger cascading sequenced entries.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <StaggerContainer className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[1, 2, 3].map((val) => (
                    <StaggerItem key={val}>
                      <div className="bg-secondary/40 border-border/20 rounded-lg border p-4 text-center font-mono text-xs">
                        Entry Item #{val}
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
