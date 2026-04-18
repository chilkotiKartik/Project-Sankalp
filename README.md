# Project-Sankalp
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&height=250&color=0:0A192F,50:112240,100:233554&text=Project-Sankalp&fontColor=E6F1FF&fontSize=54&fontAlignY=38&desc=Team%20Seekers%20%7C%20Professional%20AI%20Civic-Tech%20Platform&descAlignY=60&animation=fadeIn" width="100%" alt="Project Sankalp Header" />

<img src="https://capsule-render.vercel.app/api?type=rounded&height=130&color=0:1E3A8A,50:2563EB,100:38BDF8&text=TS&fontColor=FFFFFF&fontSize=52&animation=twinkling" width="220" alt="Team Seekers Animated Logo" />

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=700&size=21&duration=2200&pause=700&color=64FFDA&center=true&vCenter=true&width=980&lines=Built+by+Team+Seekers;AI-Driven+Civic+Intelligence;Realtime+Operations+for+Public+Impact" alt="Hero Typing Animation" />

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=600&size=16&duration=2000&pause=650&color=93C5FD&center=true&vCenter=true&width=980&lines=Professional+%7C+Reliable+%7C+Impact-Driven" alt="Hero Micro Animation" />

<img src="https://capsule-render.vercel.app/api?type=rect&height=4&color=0:64FFDA,100:0A84FF" width="100%" alt="Header Divider" />

<p>
  <img src="https://img.shields.io/badge/Team-Seekers-1E3A8A?style=for-the-badge" alt="Team Seekers" />
  <img src="https://img.shields.io/badge/Status-Competition%20Ready-2563EB?style=for-the-badge" alt="Competition Ready" />
  <img src="https://img.shields.io/badge/Domain-Civic%20Technology-0F766E?style=for-the-badge" alt="Civic Technology" />
</p>

</div>

---

## Executive Snapshot

Project-Sankalp is a full-stack civic platform that modernizes complaint handling, safety escalation, and governance visibility through AI-assisted workflows and realtime updates.

### Why it stands out

- Unified monorepo across backend, web, and mobile experiences
- AI-enabled categorization and prioritization touchpoints
- Realtime event pipeline for rapid operational awareness
- Administrator and citizen modules designed for city-scale use

---

## Quick Navigation

- [Key Metrics](#key-metrics)
- [Impact Graphs](#impact-graphs)
- [Architecture](#architecture)
- [Platform Modules](#platform-modules)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [FAQ](#faq)
- [Team Seekers](#team-seekers)

---

## Key Metrics

| Metric | Value |
|---|---|
| Citizen workflows | 12+ |
| Admin modules | 8+ |
| AI capabilities | 6+ |
| Backend routes | 20+ |
| Realtime events | 5+ |
| Platforms | Web, Mobile, API |

---

## Impact Graphs

### Capability Mix

```mermaid
pie title Platform Capability Distribution
  "Citizen Services" : 35
  "Admin Operations" : 30
  "AI Intelligence" : 20
  "Realtime Layer" : 15
```

### Complaint-to-Resolution Journey

```mermaid
flowchart LR
  C1[Complaint Created] --> C2[AI Categorized]
  C2 --> C3[Priority Assigned]
  C3 --> C4[Admin Action]
  C4 --> C5[Field Response]
  C5 --> C6[Citizen Notified]
```

### Response Timeline

```mermaid
gantt
  title Typical Response Lifecycle
  dateFormat  HH:mm
  axisFormat  %H:%M
  section Workflow
  Complaint Logged        :a1, 00:00, 1m
  AI Priority Assigned    :a2, after a1, 1m
  Admin Acknowledged      :a3, after a2, 4m
  Action Started          :a4, after a3, 15m
  Resolved and Closed     :a5, after a4, 70m
```

---

## Architecture

```mermaid
flowchart LR
  CM[Citizen Mobile] --> API[API Layer]
  CW[Citizen Web] --> API
  AD[Admin Dashboard] --> API
  API --> AU[Auth and RBAC]
  API --> CS[Complaint Services]
  API --> QW[Queue and Worker]
  API --> RT[Realtime Events]
  CS --> DB[(Data Layer)]
  QW --> DB
  RT --> AD
```

### Repository layout

- backend: API, middleware, services, queues, sockets
- sankalp-ai: Next.js dashboard and web experience
- sankalp-ai app: Expo mobile application

---

## Platform Modules

### Admin

- Incident and complaint operations panel
- Audit visibility and workflow controls
- Prioritized task handling with realtime status updates

### Citizen

- Fast complaint creation and lifecycle tracking
- Accessible mobile-first service flows
- Transparent status visibility and trust-oriented experience

### AI

- Complaint intelligence and classification support
- Priority recommendation signals
- Extensible AI integration points for advanced analytics

---

## Technology Stack

| Layer | Stack |
|---|---|
| Backend | Node.js, TypeScript, Express, Socket.IO, Bull, JWT |
| Web | Next.js, React, Tailwind CSS, Framer Motion, Recharts |
| Mobile | Expo, React Native, Expo Router, React Query |
| Data | In-memory with migration path to PostgreSQL |
| AI | Google Generative AI integration points |

---

## Quick Start

Install dependencies:

```bash
npm run install:all
```

Run backend and web together:

```bash
npm run dev
```

Run services individually:

```bash
npm run backend
npm run frontend
```

Backend:

```bash
cd backend
npm run dev
npm run build
npm run start
npm run seed
npm run migrate
```

Web:

```bash
cd sankalp-ai
npm run dev
npm run build
npm run start
npm run lint
```

Mobile:

```bash
cd "sankalp-ai app"
npm run start
npm run server:dev
npm run lint
```

---

## FAQ

### Why is this different from a standard complaint app?

It combines AI-assisted triage, realtime operations, and multi-platform delivery in one unified stack.

### Is this deployable beyond demo usage?

Yes. The repository includes runnable services, modular architecture, and a clear scaling path.

### Can this support city-level operations?

The design uses queue-driven workloads, realtime events, and role-based control patterns suited for scale.

---

## Team Seekers

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=rounded&height=90&color=0:0D47A1,50:1976D2,100:42A5F5&text=TEAM%20SEEKERS&fontColor=FFFFFF&fontSize=34&animation=twinkling" width="100%" alt="Team Seekers Banner" />

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=700&size=19&duration=1900&pause=700&color=90CAF9&center=true&vCenter=true&width=960&lines=Seekers+Build+for+Impact;Seekers+Design+for+People;Seekers+Deliver+to+Win" alt="Team Seekers Animation" />

<p><strong>Built with ambition. Engineered with discipline. Delivered for impact.</strong></p>

</div>

---

## Footer

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=soft&height=95&color=0:0A192F,50:112240,100:233554&text=Thank%20You%20for%20Visiting%20Project-Sankalp&fontColor=E6F1FF&fontSize=28&animation=fadeIn" width="100%" alt="Footer Header" />

<img src="https://capsule-render.vercel.app/api?type=rounded&height=105&color=0:0F766E,50:0EA5E9,100:1D4ED8&text=TEAM%20SEEKERS&fontColor=FFFFFF&fontSize=30&animation=twinkling" width="460" alt="Footer Team Seekers Logo" />

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=600&size=18&duration=2300&pause=700&color=64FFDA&center=true&vCenter=true&width=960&lines=Team+Seekers+%7C+Built+for+Public+Impact;Reliable+Architecture+for+City-Scale+Operations" alt="Footer Animation" />

<img src="https://readme-typing-svg.herokuapp.com?font=Poppins&weight=500&size=15&duration=2100&pause=700&color=BAE6FD&center=true&vCenter=true&width=960&lines=Crafted+with+Precision+by+Team+Seekers" alt="Footer Micro Animation" />

<p>
  <img src="https://img.shields.io/badge/Project-Sankalp-1E3A8A?style=flat-square" alt="Project Sankalp" />
  <img src="https://img.shields.io/badge/Team-Seekers-2563EB?style=flat-square" alt="Team Seekers" />
  <img src="https://img.shields.io/badge/License-All%20Rights%20Reserved-0F766E?style=flat-square" alt="All Rights Reserved" />
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&height=130&section=footer&color=0:233554,50:112240,100:0A192F" width="100%" alt="Footer Wave" />

</div>

---

## Copyright

Copyright (c) 2026 Team Seekers. All rights reserved.
