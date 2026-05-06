# VoiceIQ Stage 1 Frontend PRD

## 1. Executive Summary
VoiceIQ is an omnichannel customer intelligence platform for Nigerian telcos, built for the AI4Telco Hackathon (Microsoft AI Skills Week Lagos 2026). Stage 1 is demo-first: deliver a compelling, production-realistic UI with mocked data so judges can follow the narrative signal -> score -> explanation -> action in under 3 minutes.

## 2. User Personas
- **Amaka Osei:** MTN call center agent, Lagos. Handles 60+ calls/day. Needs instant, glanceable intelligence without leaving her screen.
- **Chidi Nwosu:** MTN retention manager. Reviews aggregate churn trends and team performance. Needs dashboards and exportable insights.

## 3. Technical Stack (prescribe exactly)
- Framework: React 18 with Vite
- Styling: TailwindCSS v3 with a custom theme extension
- Charts/Viz: Recharts for standard charts, custom SVG for the network signal diagram
- Animation: Framer Motion for entrance animations, CSS transitions for micro-interactions
- Icons: Lucide React
- State: React useState and useEffect only — no Redux, no Zustand
- Fonts: Space Grotesk (headings), IBM Plex Sans (body), JetBrains Mono (monospace/transcripts)
  loaded via @fontsource npm packages
- No backend, no API calls — all data from a /src/data/mock.js file
- Router: React Router v6 for view navigation
- Build: Vite — must run with npm run dev and deploy to Vercel with zero config

## 4. Design System

### 4a. Color Tokens (tailwind.config.js custom theme)
Define these exact tokens:

Background:
- bg-base: #080D1A (deepest background)
- bg-surface: #0F1729 (card/panel background)
- bg-elevated: #162035 (elevated card)
- bg-overlay: #1C2A42 (hover/active states)

Accent:
- accent-cobalt: #4F7EFF (primary interactive)
- accent-cobalt-dim: rgba(79,126,255,0.12) (cobalt tints)
- accent-amber: #F5C518 (secondary, warnings, Nigerian context highlights)
- accent-amber-dim: rgba(245,197,24,0.12)
- accent-violet: #7C6FFF (tertiary, SHAP bars tier 2)

Semantic:
- risk-critical: #F87171 (>80% churn)
- risk-high: #FB923C (60-80%)
- risk-medium: #F5C518 (40-60%)
- risk-low: #34D399 (<40%)

Text:
- text-primary: #F1F5F9
- text-secondary: #94A3B8
- text-muted: #4B5563
- text-cobalt: #4F7EFF
- text-amber: #F5C518

Border:
- border-default: rgba(79,126,255,0.12)
- border-active: rgba(79,126,255,0.4)

### 4b. Typography Scale
- Display: Space Grotesk 800 — page titles
- Heading 1: Space Grotesk 700 24px
- Heading 2: Space Grotesk 600 18px
- Heading 3: Space Grotesk 600 14px
- Body: IBM Plex Sans 400 14px, leading-relaxed
- Small: IBM Plex Sans 400 12px
- Mono: JetBrains Mono 400 11px — transcripts, badges, code

### 4c. Component Patterns
Define specs for:
- Panel: bg-surface, border border-default, rounded-xl, overflow-hidden
- PanelHeader: border-b border-default, px-4 py-3, flex justify-between items-center
- StatCard: bg-surface, border-t-2 (accent color), rounded-xl, p-4
- SignalChip: pill, colored border + bg tint, icon + label, 11px mono
- RiskBadge: small pill, semantic color, 10px mono bold
- ActionButton primary: bg-accent-cobalt, text-base font-semibold, rounded-lg,
  hover:brightness-110, active:scale-95
- ActionButton secondary: border border-active text-cobalt, hover:bg-accent-cobalt-dim
- ActionButton ghost: text-secondary, hover:text-primary

### 4d. Motion Spec
- Page mount: staggered fade-up (each child +80ms delay, y:16->0, opacity:0->1)
  using Framer Motion staggerChildren
- Churn score bars: animate width from 0 to value over 1200ms ease-out on mount
- Transcript lines: sequential reveal, 600ms between lines, fade-up each
- SHAP bars: staggered left-to-right fill, 150ms between bars
- Network diagram nodes: subtle scale pulse (1->1.05->1) on hover, 300ms
- Button interactions: scale-95 on press, brightness-110 on hover

## 5. Application Architecture

### 5a. File Structure
Generate the exact file/folder structure:

```
voiceiq/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css (tailwind directives + font imports)
│   ├── data/
│   │   └── mock.js (all mocked data exported)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Shell.jsx
│   │   ├── ui/
│   │   │   ├── Panel.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── SignalChip.jsx
│   │   │   ├── RiskBadge.jsx
│   │   │   ├── ActionButton.jsx
│   │   │   └── ChurnBar.jsx
│   │   ├── dashboard/
│   │   │   ├── CallerCard.jsx
│   │   │   ├── LiveTranscript.jsx
│   │   │   ├── SignalStrip.jsx
│   │   │   ├── ChurnScoreCard.jsx
│   │   │   ├── NetworkDiagram.jsx
│   │   │   ├── ShapPanel.jsx
│   │   │   ├── RecommendationCard.jsx
│   │   │   ├── SubscriberContext.jsx
│   │   │   └── CallQueue.jsx
│   │   ├── analytics/
│   │   │   ├── StatsRow.jsx
│   │   │   ├── ChurnDistribution.jsx
│   │   │   ├── SignalTable.jsx
│   │   │   └── InterventionFeed.jsx
│   │   ├── inbox/
│   │   │   ├── ConversationList.jsx
│   │   │   └── ConversationThread.jsx
│   │   └── profile/
│   │       ├── ProfileHeader.jsx
│   │       ├── RiskTimeline.jsx
│   │       ├── InteractionHistory.jsx
│   │       └── ProfileShap.jsx
│   │   └── views/
│   │       ├── DashboardView.jsx
│   │       ├── AnalyticsView.jsx
│   │       ├── InboxView.jsx
│   │       └── ProfileView.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

### 5b. Mock Data Schema
Define the exact shape of mock.js exports:
- activeCall: { subscriber, timer, transcript[], signals[], churnScores, shap[], recommendation }
- callQueue: [{ id, name, issue, channel, riskScore, riskLevel }]
- analytics: { stats{}, distribution[], signalTable[], interventions[] }
- inbox: { conversations[], activeThread[] }
- subscriberProfile: { info{}, riskTimeline[], interactions[], shapAggregate[] }

## 6. View Specifications

### View 1: Live Agent Dashboard (default)

**Layout:** CSS Grid — `grid-cols-[240px_1fr]` outer, inner main area
`grid-cols-[2fr_1.5fr_1fr]` three columns.

**Column 1 — Active Call**

CallerCard component:
- Gradient avatar (cobalt-to-violet), initials "CO", 52px
- Name: "Chioma Okonkwo" Space Grotesk 600 18px
- Meta line: phone, network, location, tenure in text-secondary 12px
- Live timer: useEffect + setInterval counting up from 00:00, Space Grotesk 700
  cobalt, in a pill badge
- Channel badges: VOICE (cobalt), WHATSAPP (amber), SMS (violet)

LiveTranscript component:
- bg-base border border-default rounded-xl p-4
- Header: "LIVE TRANSCRIPT — PIDGIN NLP ACTIVE" JetBrains Mono 9px text-amber
  tracking-widest
- 4 transcript lines reveal sequentially on mount (useEffect, 600ms stagger):
  Line 1 — Agent: "Good afternoon, thank you for calling MTN support..."
  Line 2 — Chioma: "Abeg my data don finish again. I don buy am twice this week..."
  Line 3 — Agent: "I sincerely apologise. Let me check your account right away."
  Line 4 — Chioma: "This is the third time I dey call this week o. I wan port go
  Airtel if una no fix this today."
- Key phrases highlighted with amber bg-tint + cobalt text:
  "my data don finish again", "third time I dey call", "port go Airtel"
- After line 4: animated typing indicator (3 dots, JetBrains Mono bounce animation)
- Footer: "Azure Speech + Whisper · Pidgin model active" in text-muted mono 9px

SignalStrip component:
- Horizontal flex-wrap row of SignalChip components
- Chips: "Port Intent" (risk-critical), "3rd Contact" (risk-critical),
  "Competitor Mentioned" (accent-amber), "Recurring Data Complaint" (accent-amber),
  "High Frustration" (risk-critical)

**Column 2 — Intelligence**

ChurnScoreCard component:
- Header row: "CHURN RISK SCORE" mono + delta badge "+26pts conversational layer" amber
- Two ChurnBar rows:
  - "Behavioral model only" -> 61% -> color: text-secondary/bg-overlay fill
  - "VoiceIQ full signal" -> 87% -> color: risk-critical gradient fill
- Bars animate 0->value on mount, 1200ms ease-out
- Subtext: "XGBoost · behavioral + conversational features · SHAP explained"

NetworkDiagram component (SVG, custom built):
- ViewBox 400x280, dark background with subtle radial dot grid pattern
- Central node: "Chioma" — 36px radius circle, accent-cobalt fill, white glow
  (filter: drop-shadow)
- 6 factor nodes arranged in arc around center, sized by SHAP weight:
  - "Port Intent" r=26, risk-critical — top-right
  - "Repeat Contact" r=22, risk-critical — right
  - "No Recharge" r=20, accent-amber — bottom-right
  - "Usage Drop" r=18, accent-amber — bottom
  - "Competitor" r=16, accent-amber — bottom-left
  - "Sentiment" r=12, accent-violet — left
- Connecting lines: stroke-width proportional to SHAP value, stroke=border-active
- Hover on node: scale 1.15, glow intensifies, tooltip shows "+0.XX impact"
- On node click: corresponding SHAP bar below pulses (scale 1.02, 300ms)
- Label: "Signal contribution network — hover to explore" mono text-muted 9px

ShapPanel component:
- Title: "SHAP FEATURE IMPORTANCE" mono + "Explaining the 87% prediction" text-secondary
- 6 bar rows, each: label (IBM Plex 11px) + animated bar + value badge
  1. Port intent ("wan port") — +0.31 — risk-critical
  2. Repeat contact (3x) — +0.24 — risk-critical
  3. No recharge 9d — +0.19 — accent-cobalt
  4. Competitor mention — +0.17 — accent-amber
  5. Data usage drop 68% — +0.14 — accent-cobalt
  6. High sentiment — +0.09 — accent-violet
- Bars fill left-to-right with 150ms stagger on mount
- Verdict box: bg-base border-l-4 border-accent-cobalt p-3 rounded-r-lg italic
  IBM Plex 12px text-secondary
  Text: "Chioma is at high churn risk because she explicitly stated intent to port,
  has contacted support 3 times this week, has not recharged in 9 days, and mentioned
  Airtel as an alternative. Immediate retention action recommended."

RecommendationCard component:
- Border-l-4 border-accent-cobalt, bg-elevated, rounded-xl
- Header: checkmark SVG + "AI RECOMMENDATION" cobalt mono + "Agent reviews and acts"
  text-muted 11px
- Body text: IBM Plex 13px, bold key phrases: "1GB data bundle", "30-day loyalty package"
- 3 ActionButtons: "Apply Offer" (primary), "Escalate to Retention" (secondary),
  "Override" (ghost)
- Apply Offer interaction: onClick -> button text changes to "✓ Offer Applied",
  bg switches to risk-low (emerald), after 2000ms resets. Use useState.

**Column 3 — Subscriber Context**

SubscriberContext component containing:

Subscriber mini-card:
- Avatar, name, "4yr subscriber" badge in amber
- ARPU: "₦2,400/mo" text-amber Space Grotesk 700
- LTV: "HIGH VALUE" risk-low badge
- Network + location

Omnichannel history (3 items):
- WhatsApp (green SVG icon): "Abeg this data don finish again..." · 2h ago
- Voice (cobalt icon): "3:42 · Data complaint · Unresolved" · Yesterday
- SMS (amber icon): "MTN network bad since morning" · 3 days ago
Each: icon in rounded square, message truncated with ellipsis, relative time

Behavioral signals (4 items):
- Colored dot + text + subtext
- Dot colors: risk-critical, risk-critical, accent-amber, accent-cobalt

30-day sparkline:
- SVG line, 200x52px, no axes
- Recharge activity: starts mid-range, drops last 9 days to zero
- Cobalt stroke, 10% cobalt fill below line
- Label: "Recharge activity — 30 days" mono text-muted 9px

CallQueue component (below main 3-col grid):
- Panel with 3 queue cards side by side
- Each: subscriber name, issue, channel icon, risk badge, large risk percentage
- Emeka A. — Network complaint — 79% — risk-critical
- Fatima B. — Billing dispute — 54% — risk-high
- Tunde O. — Data query — 23% — risk-low
- Hover: border shifts to risk color, translateY(-2px)

---

### View 2: Churn Analytics Overview

Stats row (4 StatCards):
- Total Monitored: 84,247 — cobalt accent
- High Risk (>70%): 3,182 — risk-critical accent
- Interventions This Week: 847 — accent-amber
- Churn Prevented (est.): ₦42.3M — risk-low accent

ChurnDistribution: Recharts horizontal BarChart
- Bars: Critical, High, Medium, Low — semantic colors
- Dark theme: bg transparent, text text-secondary, grid stroke border-default
- Tooltip: bg-elevated, border border-active, text-primary
- Animation: animationDuration 1200ms

SignalTable: Styled table
- Columns: Signal | Frequency | Avg Impact | Top Channel
- 5 rows of mocked data
- Row hover: bg-overlay
- Impact values color-coded by severity

InterventionFeed: 5 recent intervention cards
- Each: masked name, churn score badge, action taken, outcome pill, timestamp
- Outcomes: "Accepted" (risk-low), "Pending" (accent-amber), "Declined" (risk-critical)

---

### View 3: Omnichannel Inbox

Split layout: `grid-cols-[320px_1fr]`

ConversationList:
- 6 conversation items sorted by churn risk
- Each: avatar, name, last message preview in Pidgin where appropriate,
  channel icon, risk badge, timestamp
- Active item: left border accent-cobalt, bg-overlay
- Unread indicator: amber dot top-right of avatar

ConversationThread (active: Chioma):
- Header: subscriber info + risk badge + "Open Profile" button
- Message thread: WhatsApp-style bubbles
  - Chioma messages: bg-elevated rounded-2xl rounded-tl-sm, right side, amber left border
  - VoiceIQ detection cards: full-width, bg-base, border border-default,
    cobalt left border, mono label "VOICEIQ DETECTED"
    - Detection 1: "Data complaint · Frustration: High · Churn signal: +0.14"
    - Detection 2: "Repeat complaint · Risk elevated to 74%"
- Suggested reply input:
  - bg-base border border-default rounded-xl px-4 py-3
  - Pre-filled: "Hi Chioma, I sincerely apologise for the inconvenience..."
  - Send button: accent-cobalt, right-aligned
  - "AI suggested" label in mono text-muted above input

---

### View 4: Subscriber Profile

ProfileHeader:
- Large avatar (64px gradient), name Space Grotesk 700 24px
- Subscriber ID, 4yr badge, ARPU, LTV tier
- Current churn risk: "87%" Space Grotesk 800 48px text-risk-critical
- Three info pills: Network, Location, Plan

Three-column body:

Left — Contact & Account (vertical list of labeled fields)

Center — RiskTimeline:
- Recharts LineChart, 30 data points
- Score starts ~32%, rises gradually, spikes to 87% in last 3 days
- Line: accent-cobalt, area fill 10% opacity
- 3 ReferenceLine vertical markers with labels:
  "Data complaint" (day 20), "Repeat call" (day 26), "Port intent" (day 29)
- Spike zone (days 27-30): red fill overlay
- Dark theme consistent with analytics view

Right — InteractionHistory:
- Vertical timeline with connecting line
- 5 events: each has icon, channel, description, outcome, timestamp
- Timeline dot colors match channel: cobalt/green/amber

Bottom full-width: ProfileShap
- Same SHAP bars as dashboard but labeled "30-day aggregate profile"
- Slightly larger bars, subtitle: "Aggregate signal importance across all interactions"

---

### 7. Mock Data Specification

Provide the complete content of src/data/mock.js with realistic Nigerian telco
subscriber data including:
- Full transcript array with speaker, text, highlightedPhrases[]
- Signal chips array with label, type, icon name
- SHAP features array with label, value, color, barWidth
- Network diagram nodes array with id, label, radius, color, position (angle, distance)
- Analytics data with realistic Nigerian subscriber counts and naira figures
- Inbox conversations with Nigerian names and Pidgin message previews
- Subscriber profile with complete interaction history

---

### 8. Key Interaction Specifications

Document these interactions in exact detail for the developer:

1. Call timer: useEffect on mount, setInterval every 1000ms,
   format as MM:SS, clear on unmount

2. Transcript reveal: useEffect, array of lines, forEach with
   setTimeout(i * 600ms), useState for visibleLines count

3. Churn bar animation: useEffect + useState(animating),
   CSS transition width 1200ms ease-out, trigger after 100ms mount delay

4. SHAP bar stagger: Framer Motion staggerChildren 0.15s,
   each bar: initial width 0, animate to target width

5. Network node hover: SVG onMouseEnter/Leave, useState(hoveredNode),
   conditional className/style for scale and glow

6. Apply Offer button: useState(offerApplied), onClick sets true,
   setTimeout 2000ms resets, conditional render of text and color

7. Navigation: React Router v6, <Routes> in App.jsx,
   sidebar <Link> components, active state via useLocation()

8. View transitions: Framer Motion AnimatePresence + motion.div
   with initial/animate/exit for smooth view switching

---

### 9. Performance & Quality Requirements

- Lighthouse score target: >90 performance, >95 accessibility
- No console errors or warnings in production build
- All interactive elements have focus states (outline-2 outline-accent-cobalt)
- Color contrast ratios meet WCAG AA minimum
- Animation respects prefers-reduced-motion media query
- Bundle size: <500KB gzipped (no heavy libraries)

---

### 10. Deployment

- Vite builds to /dist
- vercel.json not required — Vite output detected automatically
- Single npm run build command produces deployable output
- Environment: no env vars needed (all data is mocked)

---

### 11. AI Agent Prompt (include verbatim at end of PRD)

Generate a complete, copy-paste-ready prompt that the frontend developer can give
 directly to Codex, Cursor, or Claude Code to scaffold the entire application.

The prompt must:
- Reference the PRD sections above
- Specify exact file creation order (tailwind.config.js -> mock.js -> ui components
  -> layout components -> feature components -> views -> App.jsx -> main.jsx)
- Include the complete tailwind.config.js content to generate
- Include the complete mock.js content to generate with all realistic data
- Specify that every component must be complete and functional — no TODOs,
  no placeholder content
- Instruct the agent to run npm install and npm run dev at the end to verify
- Specify that the NetworkDiagram must be pure SVG with working hover interactions
- Specify that the LiveTranscript sequential reveal must work exactly as described
- Specify that the Apply Offer interaction must complete the full 2-second reset cycle
- Include a verification checklist the agent must confirm before finishing:
  □ All 4 views render without errors
  □ Call timer counts up correctly
  □ Transcript lines reveal sequentially
  □ Churn bars animate on mount
  □ Network diagram nodes respond to hover
  □ Apply Offer button completes full interaction cycle
  □ Navigation between all 4 views works
  □ No console errors
  □ Runs on npm run dev at localhost:5173

Format the PRD as a clean markdown document with clear section headers,
code blocks where appropriate, and tables for component props.
The AI agent prompt at the end should be in a clearly labeled fenced code block.

---

## PRODUCT CONTEXT (include this verbatim in the PRD)

VoiceIQ turns real-time voice, WhatsApp, and SMS customer conversations into churn
risk signals with explainable AI and actionable next-best-actions for Nigerian telco
call center agents. The platform detects Nigerian Pidgin, code-switching, and local
slang — making it the first churn intelligence tool built specifically for how
Nigerians actually communicate.

Problem track: Customer Analytics (AI4Telco Hackathon).
Core claim: Behavioral churn model alone scores Chioma at 61% risk. VoiceIQ's
conversational signal layer raises that to 87%. The 26-point delta is the product's
core value proposition and must be the most visually impactful moment in the UI.

Stage 1 is demo-first. All data is mocked and static. No real backend. Goal: a
compelling, production-realistic UI that judges can follow in under 3 minutes
along the narrative: signal -> score -> explanation -> action.

---

## AI Agent Prompt

```text
You are a senior product manager and frontend architect. Generate a comprehensive,
production-grade PRD (Product Requirements Document) for the Stage 1 frontend of
VoiceIQ — an omnichannel customer intelligence platform for Nigerian telcos built
for the AI4Telco Hackathon (Microsoft AI Skills Week Lagos 2026).

The PRD will be used by a frontend developer to build the application using React,
TailwindCSS, and standard modern tooling. It must also include at the end a complete,
copy-paste-ready AI agent prompt (for Codex, Cursor, or Claude) that the frontend
developer can use to scaffold the full application in one pass.

---

## PRODUCT CONTEXT (include this verbatim in the PRD)

VoiceIQ turns real-time voice, WhatsApp, and SMS customer conversations into churn
risk signals with explainable AI and actionable next-best-actions for Nigerian telco
call center agents. The platform detects Nigerian Pidgin, code-switching, and local
slang — making it the first churn intelligence tool built specifically for how
Nigerians actually communicate.

Problem track: Customer Analytics (AI4Telco Hackathon).
Core claim: Behavioral churn model alone scores Chioma at 61% risk. VoiceIQ's
conversational signal layer raises that to 87%. The 26-point delta is the product's
core value proposition and must be the most visually impactful moment in the UI.

Stage 1 is demo-first. All data is mocked and static. No real backend. Goal: a
compelling, production-realistic UI that judges can follow in under 3 minutes
along the narrative: signal -> score -> explanation -> action.

---

## PRD STRUCTURE TO GENERATE

Generate a complete PRD with the following sections:

### 1. Executive Summary
One paragraph product overview, hackathon context, and Stage 1 goal.

### 2. User Personas
Two personas:
- Amaka Osei: MTN call center agent, Lagos. Handles 60+ calls/day. Needs instant,
  glanceable intelligence without leaving her screen.
- Chidi Nwosu: MTN retention manager. Reviews aggregate churn trends and team
  performance. Needs dashboards and exportable insights.

### 3. Technical Stack (prescribe exactly)
- Framework: React 18 with Vite
- Styling: TailwindCSS v3 with a custom theme extension
- Charts/Viz: Recharts for standard charts, custom SVG for the network signal diagram
- Animation: Framer Motion for entrance animations, CSS transitions for micro-interactions
- Icons: Lucide React
- State: React useState and useEffect only — no Redux, no Zustand
- Fonts: Space Grotesk (headings), IBM Plex Sans (body), JetBrains Mono (monospace/transcripts)
  loaded via @fontsource npm packages
- No backend, no API calls — all data from a /src/data/mock.js file
- Router: React Router v6 for view navigation
- Build: Vite — must run with npm run dev and deploy to Vercel with zero config

### 4. Design System

#### 4a. Color Tokens (tailwind.config.js custom theme)
Define these exact tokens:

Background:
- bg-base: #080D1A (deepest background)
- bg-surface: #0F1729 (card/panel background)
- bg-elevated: #162035 (elevated card)
- bg-overlay: #1C2A42 (hover/active states)

Accent:
- accent-cobalt: #4F7EFF (primary interactive)
- accent-cobalt-dim: rgba(79,126,255,0.12) (cobalt tints)
- accent-amber: #F5C518 (secondary, warnings, Nigerian context highlights)
- accent-amber-dim: rgba(245,197,24,0.12)
- accent-violet: #7C6FFF (tertiary, SHAP bars tier 2)

Semantic:
- risk-critical: #F87171 (>80% churn)
- risk-high: #FB923C (60-80%)
- risk-medium: #F5C518 (40-60%)
- risk-low: #34D399 (<40%)

Text:
- text-primary: #F1F5F9
- text-secondary: #94A3B8
- text-muted: #4B5563
- text-cobalt: #4F7EFF
- text-amber: #F5C518

Border:
- border-default: rgba(79,126,255,0.12)
- border-active: rgba(79,126,255,0.4)

#### 4b. Typography Scale
- Display: Space Grotesk 800 — page titles
- Heading 1: Space Grotesk 700 24px
- Heading 2: Space Grotesk 600 18px
- Heading 3: Space Grotesk 600 14px
- Body: IBM Plex Sans 400 14px, leading-relaxed
- Small: IBM Plex Sans 400 12px
- Mono: JetBrains Mono 400 11px — transcripts, badges, code

#### 4c. Component Patterns
Define specs for:
- Panel: bg-surface, border border-default, rounded-xl, overflow-hidden
- PanelHeader: border-b border-default, px-4 py-3, flex justify-between items-center
- StatCard: bg-surface, border-t-2 (accent color), rounded-xl, p-4
- SignalChip: pill, colored border + bg tint, icon + label, 11px mono
- RiskBadge: small pill, semantic color, 10px mono bold
- ActionButton primary: bg-accent-cobalt, text-base font-semibold, rounded-lg,
  hover:brightness-110, active:scale-95
- ActionButton secondary: border border-active text-cobalt, hover:bg-accent-cobalt-dim
- ActionButton ghost: text-secondary, hover:text-primary

#### 4d. Motion Spec
- Page mount: staggered fade-up (each child +80ms delay, y:16->0, opacity:0->1)
  using Framer Motion staggerChildren
- Churn score bars: animate width from 0 to value over 1200ms ease-out on mount
- Transcript lines: sequential reveal, 600ms between lines, fade-up each
- SHAP bars: staggered left-to-right fill, 150ms between bars
- Network diagram nodes: subtle scale pulse (1->1.05->1) on hover, 300ms
- Button interactions: scale-95 on press, brightness-110 on hover

### 5. Application Architecture

#### 5a. File Structure
Generate the exact file/folder structure:

```
voiceiq/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css (tailwind directives + font imports)
│   ├── data/
│   │   └── mock.js (all mocked data exported)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── TopBar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Shell.jsx
│   │   ├── ui/
│   │   │   ├── Panel.jsx
│   │   │   ├── StatCard.jsx
│   │   │   ├── SignalChip.jsx
│   │   │   ├── RiskBadge.jsx
│   │   │   ├── ActionButton.jsx
│   │   │   └── ChurnBar.jsx
│   │   ├── dashboard/
│   │   │   ├── CallerCard.jsx
│   │   │   ├── LiveTranscript.jsx
│   │   │   ├── SignalStrip.jsx
│   │   │   ├── ChurnScoreCard.jsx
│   │   │   ├── NetworkDiagram.jsx
│   │   │   ├── ShapPanel.jsx
│   │   │   ├── RecommendationCard.jsx
│   │   │   ├── SubscriberContext.jsx
│   │   │   └── CallQueue.jsx
│   │   ├── analytics/
│   │   │   ├── StatsRow.jsx
│   │   │   ├── ChurnDistribution.jsx
│   │   │   ├── SignalTable.jsx
│   │   │   └── InterventionFeed.jsx
│   │   ├── inbox/
│   │   │   ├── ConversationList.jsx
│   │   │   └── ConversationThread.jsx
│   │   └── profile/
│   │       ├── ProfileHeader.jsx
│   │       ├── RiskTimeline.jsx
│   │       ├── InteractionHistory.jsx
│   │       └── ProfileShap.jsx
│   │   └── views/
│   │       ├── DashboardView.jsx
│   │       ├── AnalyticsView.jsx
│   │       ├── InboxView.jsx
│   │       └── ProfileView.jsx
├── tailwind.config.js
├── vite.config.js
└── package.json
```

#### 5b. Mock Data Schema
Define the exact shape of mock.js exports:
- activeCall: { subscriber, timer, transcript[], signals[], churnScores, shap[], recommendation }
- callQueue: [{ id, name, issue, channel, riskScore, riskLevel }]
- analytics: { stats{}, distribution[], signalTable[], interventions[] }
- inbox: { conversations[], activeThread[] }
- subscriberProfile: { info{}, riskTimeline[], interactions[], shapAggregate[] }

### 6. View Specifications

#### View 1: Live Agent Dashboard (default)

**Layout:** CSS Grid — `grid-cols-[240px_1fr]` outer, inner main area
`grid-cols-[2fr_1.5fr_1fr]` three columns.

**Column 1 — Active Call**

CallerCard component:
- Gradient avatar (cobalt-to-violet), initials "CO", 52px
- Name: "Chioma Okonkwo" Space Grotesk 600 18px
- Meta line: phone, network, location, tenure in text-secondary 12px
- Live timer: useEffect + setInterval counting up from 00:00, Space Grotesk 700
  cobalt, in a pill badge
- Channel badges: VOICE (cobalt), WHATSAPP (amber), SMS (violet)

LiveTranscript component:
- bg-base border border-default rounded-xl p-4
- Header: "LIVE TRANSCRIPT — PIDGIN NLP ACTIVE" JetBrains Mono 9px text-amber
  tracking-widest
- 4 transcript lines reveal sequentially on mount (useEffect, 600ms stagger):
  Line 1 — Agent: "Good afternoon, thank you for calling MTN support..."
  Line 2 — Chioma: "Abeg my data don finish again. I don buy am twice this week..."
  Line 3 — Agent: "I sincerely apologise. Let me check your account right away."
  Line 4 — Chioma: "This is the third time I dey call this week o. I wan port go
  Airtel if una no fix this today."
- Key phrases highlighted with amber bg-tint + cobalt text:
  "my data don finish again", "third time I dey call", "port go Airtel"
- After line 4: animated typing indicator (3 dots, JetBrains Mono bounce animation)
- Footer: "Azure Speech + Whisper · Pidgin model active" in text-muted mono 9px

SignalStrip component:
- Horizontal flex-wrap row of SignalChip components
- Chips: "Port Intent" (risk-critical), "3rd Contact" (risk-critical),
  "Competitor Mentioned" (accent-amber), "Recurring Data Complaint" (accent-amber),
  "High Frustration" (risk-critical)

**Column 2 — Intelligence**

ChurnScoreCard component:
- Header row: "CHURN RISK SCORE" mono + delta badge "+26pts conversational layer" amber
- Two ChurnBar rows:
  - "Behavioral model only" -> 61% -> color: text-secondary/bg-overlay fill
  - "VoiceIQ full signal" -> 87% -> color: risk-critical gradient fill
- Bars animate 0->value on mount, 1200ms ease-out
- Subtext: "XGBoost · behavioral + conversational features · SHAP explained"

NetworkDiagram component (SVG, custom built):
- ViewBox 400x280, dark background with subtle radial dot grid pattern
- Central node: "Chioma" — 36px radius circle, accent-cobalt fill, white glow
  (filter: drop-shadow)
- 6 factor nodes arranged in arc around center, sized by SHAP weight:
  - "Port Intent" r=26, risk-critical — top-right
  - "Repeat Contact" r=22, risk-critical — right
  - "No Recharge" r=20, accent-amber — bottom-right
  - "Usage Drop" r=18, accent-amber — bottom
  - "Competitor" r=16, accent-amber — bottom-left
  - "Sentiment" r=12, accent-violet — left
- Connecting lines: stroke-width proportional to SHAP value, stroke=border-active
- Hover on node: scale 1.15, glow intensifies, tooltip shows "+0.XX impact"
- On node click: corresponding SHAP bar below pulses (scale 1.02, 300ms)
- Label: "Signal contribution network — hover to explore" mono text-muted 9px

ShapPanel component:
- Title: "SHAP FEATURE IMPORTANCE" mono + "Explaining the 87% prediction" text-secondary
- 6 bar rows, each: label (IBM Plex 11px) + animated bar + value badge
  1. Port intent ("wan port") — +0.31 — risk-critical
  2. Repeat contact (3x) — +0.24 — risk-critical
  3. No recharge 9d — +0.19 — accent-cobalt
  4. Competitor mention — +0.17 — accent-amber
  5. Data usage drop 68% — +0.14 — accent-cobalt
  6. High sentiment — +0.09 — accent-violet
- Bars fill left-to-right with 150ms stagger on mount
- Verdict box: bg-base border-l-4 border-accent-cobalt p-3 rounded-r-lg italic
  IBM Plex 12px text-secondary
  Text: "Chioma is at high churn risk because she explicitly stated intent to port,
  has contacted support 3 times this week, has not recharged in 9 days, and mentioned
  Airtel as an alternative. Immediate retention action recommended."

RecommendationCard component:
- Border-l-4 border-accent-cobalt, bg-elevated, rounded-xl
- Header: checkmark SVG + "AI RECOMMENDATION" cobalt mono + "Agent reviews and acts"
  text-muted 11px
- Body text: IBM Plex 13px, bold key phrases: "1GB data bundle", "30-day loyalty package"
- 3 ActionButtons: "Apply Offer" (primary), "Escalate to Retention" (secondary),
  "Override" (ghost)
- Apply Offer interaction: onClick -> button text changes to "✓ Offer Applied",
  bg switches to risk-low (emerald), after 2000ms resets. Use useState.

**Column 3 — Subscriber Context**

SubscriberContext component containing:

Subscriber mini-card:
- Avatar, name, "4yr subscriber" badge in amber
- ARPU: "₦2,400/mo" text-amber Space Grotesk 700
- LTV: "HIGH VALUE" risk-low badge
- Network + location

Omnichannel history (3 items):
- WhatsApp (green SVG icon): "Abeg this data don finish again..." · 2h ago
- Voice (cobalt icon): "3:42 · Data complaint · Unresolved" · Yesterday
- SMS (amber icon): "MTN network bad since morning" · 3 days ago
Each: icon in rounded square, message truncated with ellipsis, relative time

Behavioral signals (4 items):
- Colored dot + text + subtext
- Dot colors: risk-critical, risk-critical, accent-amber, accent-cobalt

30-day sparkline:
- SVG line, 200x52px, no axes
- Recharge activity: starts mid-range, drops last 9 days to zero
- Cobalt stroke, 10% cobalt fill below line
- Label: "Recharge activity — 30 days" mono text-muted 9px

CallQueue component (below main 3-col grid):
- Panel with 3 queue cards side by side
- Each: subscriber name, issue, channel icon, risk badge, large risk percentage
- Emeka A. — Network complaint — 79% — risk-critical
- Fatima B. — Billing dispute — 54% — risk-high
- Tunde O. — Data query — 23% — risk-low
- Hover: border shifts to risk color, translateY(-2px)

---

#### View 2: Churn Analytics Overview

Stats row (4 StatCards):
- Total Monitored: 84,247 — cobalt accent
- High Risk (>70%): 3,182 — risk-critical accent
- Interventions This Week: 847 — accent-amber
- Churn Prevented (est.): ₦42.3M — risk-low accent

ChurnDistribution: Recharts horizontal BarChart
- Bars: Critical, High, Medium, Low — semantic colors
- Dark theme: bg transparent, text text-secondary, grid stroke border-default
- Tooltip: bg-elevated, border border-active, text-primary
- Animation: animationDuration 1200ms

SignalTable: Styled table
- Columns: Signal | Frequency | Avg Impact | Top Channel
- 5 rows of mocked data
- Row hover: bg-overlay
- Impact values color-coded by severity

InterventionFeed: 5 recent intervention cards
- Each: masked name, churn score badge, action taken, outcome pill, timestamp
- Outcomes: "Accepted" (risk-low), "Pending" (accent-amber), "Declined" (risk-critical)

---

#### View 3: Omnichannel Inbox

Split layout: `grid-cols-[320px_1fr]`

ConversationList:
- 6 conversation items sorted by churn risk
- Each: avatar, name, last message preview in Pidgin where appropriate,
  channel icon, risk badge, timestamp
- Active item: left border accent-cobalt, bg-overlay
- Unread indicator: amber dot top-right of avatar

ConversationThread (active: Chioma):
- Header: subscriber info + risk badge + "Open Profile" button
- Message thread: WhatsApp-style bubbles
  - Chioma messages: bg-elevated rounded-2xl rounded-tl-sm, right side, amber left border
  - VoiceIQ detection cards: full-width, bg-base, border border-default,
    cobalt left border, mono label "VOICEIQ DETECTED"
    - Detection 1: "Data complaint · Frustration: High · Churn signal: +0.14"
    - Detection 2: "Repeat complaint · Risk elevated to 74%"
- Suggested reply input:
  - bg-base border border-default rounded-xl px-4 py-3
  - Pre-filled: "Hi Chioma, I sincerely apologise for the inconvenience..."
  - Send button: accent-cobalt, right-aligned
  - "AI suggested" label in mono text-muted above input

---

#### View 4: Subscriber Profile

ProfileHeader:
- Large avatar (64px gradient), name Space Grotesk 700 24px
- Subscriber ID, 4yr badge, ARPU, LTV tier
- Current churn risk: "87%" Space Grotesk 800 48px text-risk-critical
- Three info pills: Network, Location, Plan

Three-column body:

Left — Contact & Account (vertical list of labeled fields)

Center — RiskTimeline:
- Recharts LineChart, 30 data points
- Score starts ~32%, rises gradually, spikes to 87% in last 3 days
- Line: accent-cobalt, area fill 10% opacity
- 3 ReferenceLine vertical markers with labels:
  "Data complaint" (day 20), "Repeat call" (day 26), "Port intent" (day 29)
- Spike zone (days 27-30): red fill overlay
- Dark theme consistent with analytics view

Right — InteractionHistory:
- Vertical timeline with connecting line
- 5 events: each has icon, channel, description, outcome, timestamp
- Timeline dot colors match channel: cobalt/green/amber

Bottom full-width: ProfileShap
- Same SHAP bars as dashboard but labeled "30-day aggregate profile"
- Slightly larger bars, subtitle: "Aggregate signal importance across all interactions"

---

### 7. Mock Data Specification

Provide the complete content of src/data/mock.js with realistic Nigerian telco
subscriber data including:
- Full transcript array with speaker, text, highlightedPhrases[]
- Signal chips array with label, type, icon name
- SHAP features array with label, value, color, barWidth
- Network diagram nodes array with id, label, radius, color, position (angle, distance)
- Analytics data with realistic Nigerian subscriber counts and naira figures
- Inbox conversations with Nigerian names and Pidgin message previews
- Subscriber profile with complete interaction history

---

### 8. Key Interaction Specifications

Document these interactions in exact detail for the developer:

1. Call timer: useEffect on mount, setInterval every 1000ms,
   format as MM:SS, clear on unmount

2. Transcript reveal: useEffect, array of lines, forEach with
   setTimeout(i * 600ms), useState for visibleLines count

3. Churn bar animation: useEffect + useState(animating),
   CSS transition width 1200ms ease-out, trigger after 100ms mount delay

4. SHAP bar stagger: Framer Motion staggerChildren 0.15s,
   each bar: initial width 0, animate to target width

5. Network node hover: SVG onMouseEnter/Leave, useState(hoveredNode),
   conditional className/style for scale and glow

6. Apply Offer button: useState(offerApplied), onClick sets true,
   setTimeout 2000ms resets, conditional render of text and color

7. Navigation: React Router v6, <Routes> in App.jsx,
   sidebar <Link> components, active state via useLocation()

8. View transitions: Framer Motion AnimatePresence + motion.div
   with initial/animate/exit for smooth view switching

---

### 9. Performance & Quality Requirements

- Lighthouse score target: >90 performance, >95 accessibility
- No console errors or warnings in production build
- All interactive elements have focus states (outline-2 outline-accent-cobalt)
- Color contrast ratios meet WCAG AA minimum
- Animation respects prefers-reduced-motion media query
- Bundle size: <500KB gzipped (no heavy libraries)

---

### 10. Deployment

- Vite builds to /dist
- vercel.json not required — Vite output detected automatically
- Single npm run build command produces deployable output
- Environment: no env vars needed (all data is mocked)

---

### 11. AI Agent Prompt (include verbatim at end of PRD)

Generate a complete, copy-paste-ready prompt that the frontend developer can give
 directly to Codex, Cursor, or Claude Code to scaffold the entire application.

The prompt must:
- Reference the PRD sections above
- Specify exact file creation order (tailwind.config.js -> mock.js -> ui components
  -> layout components -> feature components -> views -> App.jsx -> main.jsx)
- Include the complete tailwind.config.js content to generate
- Include the complete mock.js content to generate with all realistic data
- Specify that every component must be complete and functional — no TODOs,
  no placeholder content
- Instruct the agent to run npm install and npm run dev at the end to verify
- Specify that the NetworkDiagram must be pure SVG with working hover interactions
- Specify that the LiveTranscript sequential reveal must work exactly as described
- Specify that the Apply Offer interaction must complete the full 2-second reset cycle
- Include a verification checklist the agent must confirm before finishing:
  □ All 4 views render without errors
  □ Call timer counts up correctly
  □ Transcript lines reveal sequentially
  □ Churn bars animate on mount
  □ Network diagram nodes respond to hover
  □ Apply Offer button completes full interaction cycle
  □ Navigation between all 4 views works
  □ No console errors
  □ Runs on npm run dev at localhost:5173

Format the PRD as a clean markdown document with clear section headers,
code blocks where appropriate, and tables for component props.
The AI agent prompt at the end should be in a clearly labeled fenced code block.
```
