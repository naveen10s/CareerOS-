# User Personas & Flows Spec - CareerOS

This document specifies target user profiles (Personas) and their corresponding sequential journeys (User Flows) designed to maximize engagement and evaluation efficiency.

---

## 👥 1. Target User Personas

### 1. The Recruiter (Sarah)

- **Context**: Agency or in-house talent acquisition; handles bulk screening.
- **Goals**: Verify candidate core details (years of experience, locations, target role) and download standard PDF resumé in under 60 seconds.
- **Pain Points**: Hard-to-navigate portfolio websites that hide critical contact details behind complex scrolling animations.
- **Key Questions**: "Does this candidate meet our basic background criteria?", "Can I download their resume right away?"
- **Decision Criteria**: Accessibility of credentials, clear timeline markers.
- **Expected Journey**:
  ```text
  Landing Page (Home) -> Quick command bar (Ctrl+K) -> Resume Page -> Download PDF -> Contact Page
  ```

### 2. The Hiring Manager (Dave)

- **Context**: Lead/Senior PM looking for an Associate/Junior PM to join their team.
- **Goals**: Find transferable skills (data proficiency, requirement analysis) that prove the candidate can write user stories and execute roadmap tasks.
- **Pain Points**: Candidates who lack raw product execution experience and present purely generic certificates.
- **Key Questions**: "Has this candidate actually worked with engineers?", "Can they write clean specs, queries, and handle sprints?"
- **Decision Criteria**: Transferable BA skills matrix, case study structures.
- **Expected Journey**:
  ```text
  Landing Page -> Career Dashboard -> Experience Matrix (filtered by PM actions) -> Projects -> Product Lab -> Contact Page
  ```

### 3. The Founder (Alek)

- **Context**: Early/Growth-stage startup founder; wears many hats.
- **Goals**: Evaluate execution speed, autonomy, business mindset, and product prioritization.
- **Pain Points**: Candidates who expect a large product org structure and lack resourcefulness.
- **Key Questions**: "Will this person take ownership?", "Can they prioritize features based on metric impact rather than opinions?"
- **Decision Criteria**: Direct metric improvements (telemetry, velocity gains).
- **Expected Journey**:
  ```text
  Landing Page -> Career Dashboard -> Analytics Telemetry -> Projects -> Contact Page
  ```

### 4. The CTO (Marcus)

- **Context**: Technical leader evaluating alignment between product and engineering.
- **Goals**: Verify that the candidate has strong technical literacy (SQL queries, API understandings, telemetry collection) and can draft clear requirements.
- **Pain Points**: Product Managers who submit vague requirements, write poor tickets, and create friction for developers.
- **Key Questions**: "Does this person understand databases?", "Will my developers enjoy collaborating with them?"
- **Decision Criteria**: Product Lab ticket structures, tech stack list, code/analyst details.
- **Expected Journey**:
  ```text
  Landing Page -> Career Dashboard -> Product Lab -> Analytics (SQL check) -> Contact Page
  ```

### 5. The Product Director (Elena)

- **Context**: Head of Product / Product Leader overseeing product org.
- **Goals**: Evaluate strategic product thinking, customer interview loops, prioritization methodologies, and mentorship potential.
- **Pain Points**: Product Managers who construct roadmaps without clear customer feedback or user testing validation.
- **Key Questions**: "How does this candidate discover customer needs?", "How do they validate hypotheses?"
- **Decision Criteria**: Case study user discovery frameworks, journey timelines.
- **Expected Journey**:
  ```text
  Landing Page -> Career Dashboard -> Journey Timeline -> Projects -> Contact Page
  ```

---

## 🚀 2. Designed User Flows

### Flow A: The Recruiter Pathway

Designed for speed, clear navigation landmarks, and immediate print/download access.

```text
Landing Page
   │  (Goal: Quick Verification)
   ├───> [Press Ctrl+K or Click Command Bar]
   │        │
   │        └───> [Select "Export Resumé to PDF"]
   │                 │
   │                 └───> [Download / Print PDF Resumé]
   │                           │
   │                           └───> [Select "Book Interview Slot" on Contact Page]
```

### Flow B: The Hiring Manager Pathway

Designed to prove day-to-day execution compatibility (PRDs, sprint backlogs, tech collaborations).

```text
Landing Page
   │
   └───> Career Dashboard (Inspect KPI Metrics)
            │
            └───> Experience Matrix (Toggle "PM Initiatives" filter)
                     │
                     └───> Projects (Inspect "Telemetry Redesign" Case Study)
                              │
                              └───> Product Lab (Inspect active JIRA-style Backlog tickets)
                                       │
                                       └───> Contact Page (Direct Scheduler calendar booking)
```

### Flow C: The Founder / CTO Pathway

Designed to prove strategic priority logic, metric impact, and database/tech query competencies.

```text
Landing Page
   │
   └───> Career Dashboard (Inspect Onboarding Velocity charts)
            │
            └───> Analytics (Inspect Cohort SQL queries & Telemetry data latency funnels)
                     │
                     └───> Product Lab (Inspect JIRA ticket specs and API models)
                              │
                              └───> Contact Page
```
