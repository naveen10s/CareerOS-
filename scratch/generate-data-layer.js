const fs = require("fs");
const path = require("path");

const DATA_ROOT = path.join(__dirname, "..", "data");

// Helper to write files
function writeFile(dir, filename, content) {
  const fullDir = path.join(DATA_ROOT, dir);
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  fs.writeFileSync(path.join(fullDir, filename), content.trim() + "\n");
}

// Definition of each model
const models = {
  profile: {
    schema: `
import { z } from "zod";

export const ProfileSchema = z.object({
  personal: z.object({
    name: z.string(),
    email: z.string().email(),
    avatar: z.string(),
    location: z.string(),
  }),
  career: z.object({
    headline: z.string(),
    targetRoles: z.array(z.string()),
    currentRole: z.string(),
  }),
  vision: z.object({
    statement: z.string(),
    transitionFocus: z.string(),
  }),
  goals: z.array(z.string()),
  links: z.object({
    linkedin: z.string().url(),
    github: z.string().url(),
    portfolio: z.string().url(),
  }),
  brand: z.object({
    themeColor: z.string(),
    tagline: z.string(),
  }),
});
`,
    example: {
      personal: {
        name: "Alex Mercer",
        email: "alex@careeros.dev",
        avatar: "/assets/avatar.jpg",
        location: "San Francisco, CA",
      },
      career: {
        headline: "Business Analyst transitioning to PM | Data-driven Strategy Specialist",
        targetRoles: ["Associate Product Manager", "Product Manager"],
        currentRole: "Senior Business Analyst",
      },
      vision: {
        statement: "Bridge legacy analytics data layers into customer feature solutions.",
        transitionFocus: "Translating telemetry analytics into product prioritization roadmaps.",
      },
      goals: [
        "Complete CSPO certification",
        "Own feature launch lifecycle from concept to metrics validation",
      ],
      links: {
        linkedin: "https://linkedin.com/in/alex-mercer",
        github: "https://github.com/career-os",
        portfolio: "https://careeros.dev",
      },
      brand: {
        themeColor: "violet",
        tagline: "Career Operating System Spec",
      },
    },
  },

  experience: {
    schema: `
import { z } from "zod";

export const ExperienceItemSchema = z.object({
  id: z.string(),
  company: z.string(),
  role: z.string(),
  timeline: z.object({
    start: z.string(),
    end: z.string(),
    isCurrent: z.boolean(),
  }),
  responsibilities: z.array(z.string()),
  achievements: z.array(z.string()),
  businessImpact: z.array(z.string()),
  technologies: z.array(z.string()),
  stakeholders: z.array(z.string()),
  metrics: z.array(z.string()),
});

export const ExperienceSchema = z.array(ExperienceItemSchema);
`,
    example: [
      {
        id: "exp-1",
        company: "TechInnovate Solutions",
        role: "Senior Business Analyst",
        timeline: {
          start: "2024-03",
          end: "Present",
          isCurrent: true,
        },
        responsibilities: [
          "Query telemetry databases to analyze onboarding drops.",
          "Write product specification documents and sync with engineering.",
        ],
        achievements: ["Designed database view schema reducing query latency by 45%."],
        businessImpact: ["Onboarding completion rates increased by 22% over 2 quarters."],
        technologies: ["SQL", "PostgreSQL", "Tableau", "JIRA"],
        stakeholders: ["Engineering Leads", "Product Director", "QA Team"],
        metrics: ["22% conversion increase", "45% query latency reduction"],
      },
    ],
  },

  projects: {
    schema: `
import { z } from "zod";

export const ProjectItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  problem: z.string(),
  businessContext: z.string(),
  research: z.array(z.string()),
  requirements: z.array(z.string()),
  solution: z.string(),
  timeline: z.array(z.string()),
  kpis: z.array(z.string()),
  metrics: z.array(z.string()),
  lessons: z.array(z.string()),
  future: z.array(z.string()),
});

export const ProjectsSchema = z.array(ProjectItemSchema);
`,
    example: [
      {
        id: "proj-1",
        title: "Telemetry cohort dashboard redesign",
        problem: "Product managers lacked direct cohort retention figures.",
        businessContext: "Required for roadmapping and release testing validation.",
        research: ["Conducted 8 PM interviews", "Identified query latency as blocker"],
        requirements: ["Build circular progress chart", "Allow query exports"],
        solution: "Deployed a centralized React telemetry dashboard synced with SQL schemas.",
        timeline: ["Q1: User interviews", "Q2: Design & build", "Q3: Launch & verify"],
        kpis: ["Dashboard adoption rate", "Decision latency hours"],
        metrics: ["95% decision latency reduction", "100% executive adoption"],
        lessons: ["Define schema constraints early to avoid ETL rework"],
        future: ["Integrate automated anomaly alert triggers"],
      },
    ],
  },

  skills: {
    schema: `
import { z } from "zod";

export const SkillItemSchema = z.object({
  id: z.string(),
  skill: z.string(),
  category: z.enum(["product", "business-analysis", "leadership", "technical"]),
  evidence: z.array(z.string()),
  projects: z.array(z.string()),
  level: z.number().min(1).max(5),
  learning: z.array(z.string()),
});

export const SkillsSchema = z.array(SkillItemSchema);
`,
    example: [
      {
        id: "skill-1",
        skill: "SQL & Analytics Queries",
        category: "technical",
        evidence: ["Built automated reporting schemas in TechInnovate."],
        projects: ["proj-1"],
        level: 5,
        learning: ["PostgreSQL Expert Course"],
      },
      {
        id: "skill-2",
        skill: "User Story Mapping",
        category: "product",
        evidence: ["Mapped 14 story tickets adopted directly by engineering."],
        projects: ["proj-1"],
        level: 4,
        learning: ["Agile Product Owner Foundations"],
      },
    ],
  },

  leadership: {
    schema: `
import { z } from "zod";

export const LeadershipItemSchema = z.object({
  id: z.string(),
  situation: z.string(),
  action: z.string(),
  outcome: z.string(),
  evidence: z.array(z.string()),
});

export const LeadershipSchema = z.array(LeadershipItemSchema);
`,
    example: [
      {
        id: "lead-1",
        situation: "Friction between engineers and design on PRD requirements.",
        action: "Facilitated structured sizing sessions and drafted clear JIRA story specs.",
        outcome:
          "Cleared backlog blockage, decreasing sprint planning times from 4 hours to 1.5 hours.",
        evidence: ["CTO award milestone citation."],
      },
    ],
  },

  product: {
    schema: `
import { z } from "zod";

export const ProductSchema = z.object({
  wireframing: z.array(z.string()),
  userDiscovery: z.array(z.string()),
  roadmapping: z.array(z.string()),
  backlogGrooming: z.array(z.string()),
});
`,
    example: {
      wireframing: ["Figma layouts", "Balsamiq conceptual models"],
      userDiscovery: ["Customer interviews", "Friction mapping loops"],
      roadmapping: ["Gantt charts", "Now-Next-Later priority frames"],
      backlogGrooming: ["Story point sizing", "Acceptance criteria definitions"],
    },
  },

  "business-analysis": {
    schema: `
import { z } from "zod";

export const BusinessAnalysisSchema = z.object({
  dataMapping: z.array(z.string()),
  processModeling: z.array(z.string()),
  requirementsElicitation: z.array(z.string()),
  gapAnalysis: z.array(z.string()),
});
`,
    example: {
      dataMapping: ["Source-to-target maps", "ETL schemas"],
      processModeling: ["BPMN flows", "UML swimlane structures"],
      requirementsElicitation: ["Stakeholder workshops", "User interviews"],
      gapAnalysis: ["As-Is vs To-Be matrix"],
    },
  },

  learning: {
    schema: `
import { z } from "zod";

export const LearningSchema = z.object({
  courses: z.array(z.string()),
  books: z.array(z.object({
    title: z.string(),
    author: z.string(),
    status: z.enum(["reading", "completed", "backlog"]),
  })),
  certifications: z.array(z.string()),
  roadmap: z.array(z.string()),
});
`,
    example: {
      courses: ["course-1"],
      books: [
        { title: "Inspired", author: "Marty Cagan", status: "completed" },
        { title: "Escaping the Build Trap", author: "Melissa Perri", status: "reading" },
      ],
      certifications: ["cert-1"],
      roadmap: ["SQL advanced optimizations", "Interaction Design Principles"],
    },
  },

  certifications: {
    schema: `
import { z } from "zod";

export const CertificationItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  issuer: z.string(),
  date: z.string(),
  credentialId: z.string().optional(),
  credentialUrl: z.string().url().optional(),
});

export const CertificationsSchema = z.array(CertificationItemSchema);
`,
    example: [
      {
        id: "cert-1",
        name: "Certified Scrum Product Owner (CSPO)",
        issuer: "Scrum Alliance",
        date: "2025-01",
        credentialId: "CSPO-9988",
        credentialUrl: "https://bcert.me/example",
      },
    ],
  },

  courses: {
    schema: `
import { z } from "zod";

export const CourseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  platform: z.string(),
  date: z.string(),
  syllabus: z.array(z.string()),
});

export const CoursesSchema = z.array(CourseItemSchema);
`,
    example: [
      {
        id: "course-1",
        name: "Product Management Foundations",
        platform: "Coursera / University of Maryland",
        date: "2025-06",
        syllabus: ["Customer Discovery", "MVP Definition", "Sprint Execution"],
      },
    ],
  },

  metrics: {
    schema: `
import { z } from "zod";

export const MetricItemSchema = z.object({
  id: z.string(),
  metric: z.string(),
  value: z.string(),
  improvement: z.string(),
  context: z.string(),
});

export const MetricsSchema = z.array(MetricItemSchema);
`,
    example: [
      {
        id: "met-1",
        metric: "Telemetry Latency Funnel",
        value: "2 hours",
        improvement: "-95%",
        context: "ETL optimization and denormalizing reporting tables.",
      },
    ],
  },

  timeline: {
    schema: `
import { z } from "zod";

export const TimelineItemSchema = z.object({
  id: z.string(),
  year: z.string(),
  quarter: z.string().optional(),
  event: z.string(),
  description: z.string(),
  type: z.enum(["career", "education", "pm-transition", "project-launch"]),
});

export const TimelineSchema = z.array(TimelineItemSchema);
`,
    example: [
      {
        id: "time-1",
        year: "2024",
        quarter: "Q3",
        event: "Agile Backlog Lead",
        description: "Assumed backlog prioritizations side-by-side with Engineering Director.",
        type: "pm-transition",
      },
    ],
  },

  resume: {
    schema: `
import { z } from "zod";

export const ResumeSchema = z.object({
  professionalSummary: z.string(),
  experienceIds: z.array(z.string()),
  projectIds: z.array(z.string()),
  skillIds: z.array(z.string()),
});
`,
    example: {
      professionalSummary: "Data-driven Senior Business Analyst transitioning to PM.",
      experienceIds: ["exp-1"],
      projectIds: ["proj-1"],
      skillIds: ["skill-1", "skill-2"],
    },
  },

  linkedin: {
    schema: `
import { z } from "zod";

export const LinkedinSchema = z.object({
  headline: z.string(),
  about: z.string(),
  experience: z.array(z.object({
    id: z.string(),
    bullets: z.array(z.string()),
  })),
  featured: z.array(z.string()),
});
`,
    example: {
      headline: "Senior Business Analyst | Transitioning to Product Management",
      about: "I translate telemetry queries into roadmaps.",
      experience: [
        {
          id: "exp-1",
          bullets: ["Led dashboard optimization query builds.", "Facilitated PM agile sprints."],
        },
      ],
      featured: ["proj-1"],
    },
  },

  website: {
    schema: `
import { z } from "zod";

export const WebsiteSchema = z.object({
  hero: z.object({
    title: z.string(),
    sub: z.string(),
  }),
  journey: z.object({
    timelineIds: z.array(z.string()),
  }),
  projects: z.object({
    displayIds: z.array(z.string()),
  }),
  dashboard: z.object({
    chartType: z.string(),
    showMetricIds: z.array(z.string()),
  }),
  analytics: z.object({
    funnelId: z.string(),
  }),
  learning: z.object({
    currentTopic: z.string(),
  }),
});
`,
    example: {
      hero: {
        title: "Career Operating System Spec",
        sub: "SaaS interface demonstrating analytical to PM transitions.",
      },
      journey: {
        timelineIds: ["time-1"],
      },
      projects: {
        displayIds: ["proj-1"],
      },
      dashboard: {
        chartType: "bar",
        showMetricIds: ["met-1"],
      },
      analytics: {
        funnelId: "telemetry-cohort",
      },
      learning: {
        currentTopic: "User Experience Design",
      },
    },
  },

  blog: {
    schema: `
import { z } from "zod";

export const BlogArticleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  date: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  content: z.string(),
});

export const BlogSchema = z.array(BlogArticleSchema);
`,
    example: [
      {
        title: "Why Telemetry is the Analyst's Superpower in Product",
        slug: "why-telemetry-is-pm-superpower",
        date: "2026-06-25",
        category: "Product Management",
        tags: ["Telemetry", "SQL", "Transition"],
        content: "Understanding database view optimization bridges BA to PM roadmaps...",
      },
    ],
  },

  interviews: {
    schema: `
import { z } from "zod";

export const InterviewItemSchema = z.object({
  id: z.string(),
  question: z.string(),
  starStories: z.object({
    situation: z.string(),
    task: z.string(),
    action: z.string(),
    result: z.string(),
  }),
  category: z.enum(["behavioral", "pm", "ba", "leadership", "product-design"]),
});

export const InterviewsSchema = z.array(InterviewItemSchema);
`,
    example: [
      {
        id: "int-1",
        question: "Tell me about a time you resolved engineering friction.",
        starStories: {
          situation: "Friction between engineers and design on PRD requirements.",
          task: "Resolve alignment blocks.",
          action: "Facilitated structured sizing sessions and story spec updates.",
          result: "Planning meetings reduced from 4 hours to 1.5 hours.",
        },
        category: "leadership",
      },
    ],
  },

  assets: {
    schema: `
import { z } from "zod";

export const AssetSchema = z.object({
  id: z.string(),
  path: z.string(),
  alt: z.string(),
  type: z.enum(["image", "video", "document"]),
});

export const AssetsSchema = z.array(AssetSchema);
`,
    example: [
      {
        id: "asset-avatar",
        path: "/assets/avatar.jpg",
        alt: "Candidate Profile Picture",
        type: "image",
      },
    ],
  },
};

// Generate files for each model
Object.keys(models).forEach((key) => {
  const model = models[key];

  // Capitalize name for imports
  const camelName = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  const capName = camelName.charAt(0).toUpperCase() + camelName.slice(1);

  // 1. schema.ts
  const schemaContent = model.schema;
  writeFile(key, "schema.ts", schemaContent);

  // 2. types.ts
  const typesContent = `
import { z } from "zod";
import { ${capName}Schema } from "./schema";

export type ${capName} = z.infer<typeof ${capName}Schema>;
`;
  writeFile(key, "types.ts", typesContent);

  // 3. validation.ts
  const validationContent = `
import { ${capName}Schema } from "./schema";
import { ${capName} } from "./types";

export function validate${capName}(data: unknown): ${capName} {
  return ${capName}Schema.parse(data);
}

export function safeValidate${capName}(data: unknown) {
  return ${capName}Schema.safeParse(data);
}
`;
  writeFile(key, "validation.ts", validationContent);

  // 4. example.json
  writeFile(key, "example.json", JSON.stringify(model.example, null, 2));

  console.log(`Generated data layer files for model: ${key}`);
});
