# Content & Data Models Spec - CareerOS

This document specifies the content model structures and JSON data schemas configured for the **CareerOS** transition dashboard.

---

## 📝 1. Content Modeling Schema

The following tables define the structured, reusable fields for each core product block.

### 1. Projects

- **Why**: Demonstrates tangible execution case studies.
- **Fields**:
  | Field          | Type   | Description                              |
  | :------------- | :----- | :--------------------------------------- |
  | `id`           | String | Unique project identifier.               |
  | `title`        | String | Project name (e.g. Telemetry Dashboard). |
  | `summary`      | String | 1-sentence tagline.                      |
  | `challenge`    | String | User problem/business bottleneck.        |
  | `solution`     | String | Core feature implementation.             |
  | `role`         | String | Acting ownership title.                  |
  | `technologies` | Array  | Dev languages (React, SQL).              |
  | `pmAspects`    | Array  | PM skills shown (PRDs, wireframes).      |
  | `baAspects`    | Array  | BA skills shown (SQL queries, schemas).  |
  | `metrics`      | Array  | Measurable outcomes.                     |

### 2. Experience

- **Why**: Proves professional track record.
- **Fields**:
  | Field                 | Type   | Description                   |
  | :-------------------- | :----- | :---------------------------- |
  | `id`                  | String | Unique experience identifier. |
  | `role`                | String | Job title.                    |
  | `company`             | String | Employer.                     |
  | `startDate / endDate` | String | ISO date markers.             |
  | `responsibilities`    | Array  | Bulleted actions.             |
  | `pmKeywords`          | Array  | PM transferable actions.      |
  | `baKeywords`          | Array  | Analyst actions.              |
  | `impactMetrics`       | Array  | Performance indicators.       |

---

## 💾 2. JSON Schema & Data Models

These TypeScript schemas map to the JSON config files inside the `data/` directory.

### Profile Schema (`data/profile.json`)

```typescript
interface Profile {
  name: string;
  headline: string;
  currentRole: string;
  targetRole: string;
  summary: string;
  avatar: string;
  email: string;
  location: string;
  strengths: string[];
  transitionNarrative: {
    whyProductManagement: string;
    transferableSkills: string[];
  };
}
```

### Projects Schema (`data/projects.json`)

```typescript
interface ProjectItem {
  id: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  role: string;
  technologies: string[];
  pmAspects: string[];
  baAspects: string[];
  metrics: string[];
  links?: {
    github?: string;
    live?: string;
  };
}
type Projects = ProjectItem[];
```

### Experience Schema (`data/experience.json`)

```typescript
interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  responsibilities: string[];
  pmKeywords: string[];
  baKeywords: string[];
  impactMetrics: string[];
}
type Experience = ExperienceItem[];
```

### Skills Schema (`data/skills.json`)

```typescript
interface SkillItem {
  name: string;
  level: number; // 1-5
  transferableFromBA?: boolean;
  description?: string;
}
interface Skills {
  productManagement: SkillItem[];
  businessAnalysis: SkillItem[];
  technical: SkillItem[];
}
```

### Learning Path Schema (`data/learning.json`)

```typescript
interface LearningItem {
  id: string;
  topic: string;
  platform: string;
  progress: number; // 0-100
  targetDate: string;
  relevance: string;
}
type Learning = LearningItem[];
```

### Telemetry Metrics Schema (`data/metrics.json`)

```typescript
interface MetricItem {
  id: string;
  label: string;
  value: string;
  change: string;
  baValueExplanation: string;
  pmValueExplanation: string;
}
type Metrics = MetricItem[];
```

### Social Links Schema (`data/social-links.json`)

```typescript
interface SocialLink {
  platform: string;
  url: string;
  handle: string;
  icon?: string;
}
type SocialLinks = SocialLink[];
```

### Timeline Milestone Schema (`data/timeline.json`)

```typescript
interface TimelineItem {
  id: string;
  year: string;
  quarter?: string;
  event: string;
  details: string;
  milestoneType: "career" | "education" | "pm-transition" | "project-launch";
}
type Timeline = TimelineItem[];
```
