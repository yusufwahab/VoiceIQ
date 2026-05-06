# VoiceIQ

**Omnichannel Customer Intelligence for Nigerian Telcos**

VoiceIQ is an AI-powered churn intelligence platform built for the AI4Telco Hackathon (Microsoft AI Skills Week Lagos 2026). It turns real-time voice, WhatsApp, and SMS conversations into explainable churn risk signals with actionable next-best-actions for call center agents.

## 🎯 Core Value Proposition

**Behavioral churn model alone:** 61% risk score  
**VoiceIQ with conversational signals:** 87% risk score  
**The 26-point delta is the product.**

## ✨ Key Features

- **Real-Time Voice Intelligence** — Transcribes and analyses live calls in Nigerian Pidgin, Yoruba, Igbo, and Hausa code-switching
- **Explainable SHAP Scoring** — Every churn prediction broken down into feature contributions
- **Omnichannel Inbox** — Voice, WhatsApp, SMS unified and sorted by churn risk
- **AI-Powered Retention Actions** — Context-aware next-best-action recommendations delivered in real time
- **Network Signal Diagram** — Interactive SVG visualization of signal contribution to churn risk

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
voiceiq/
├── src/
│   ├── components/
│   │   ├── layout/          # Shell, Sidebar, TopBar
│   │   ├── ui/              # Panel, StatCard, SignalChip, RiskBadge, ActionButton, ChurnBar
│   │   ├── dashboard/       # CallerCard, LiveTranscript, ChurnScoreCard, NetworkDiagram, ShapPanel, etc.
│   │   ├── analytics/       # StatsRow, ChurnDistribution, SignalTable, InterventionFeed
│   │   ├── inbox/           # ConversationList, ConversationThread
│   │   └── profile/         # ProfileHeader, RiskTimeline, InteractionHistory, ProfileShap
│   ├── views/
│   │   ├── LandingPage.jsx
│   │   ├── SignInPage.jsx
│   │   ├── SignUpPage.jsx
│   │   ├── DashboardView.jsx
│   │   ├── AnalyticsView.jsx
│   │   ├── InboxView.jsx
│   │   └── ProfileView.jsx
│   ├── data/
│   │   └── mock.js          # All mocked data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## 🎨 Design System

### Color Tokens

**Background:**
- `bg-base`: #080D1A (deepest background)
- `bg-surface`: #0F1729 (card/panel background)
- `bg-elevated`: #162035 (elevated card)
- `bg-overlay`: #1C2A42 (hover/active states)

**Accent:**
- `accent-cobalt`: #4F7EFF (primary interactive)
- `accent-amber`: #F5C518 (secondary, warnings, Nigerian context highlights)
- `accent-violet`: #7C6FFF (tertiary)

**Semantic:**
- `risk-critical`: #F87171 (>80% churn)
- `risk-high`: #FB923C (60-80%)
- `risk-medium`: #F5C518 (40-60%)
- `risk-low`: #34D399 (<40%)

### Typography

- **Display/Headings:** Space Grotesk (400, 600, 700)
- **Body:** IBM Plex Sans (400, 600)
- **Mono:** JetBrains Mono (400) — transcripts, badges, code

## 🔐 Authentication (Demo Mode)

The app includes a landing page, sign-in, and sign-up flows. For demo purposes:
- Any email/password combination will work
- Auth state is stored in `localStorage`
- Protected routes redirect to `/signin` if not authenticated
- Sign out button in sidebar clears auth and returns to landing page

## 📊 Views

1. **Landing Page** (`/`) — Marketing page with features, stats, testimonials, and CTA
2. **Sign In** (`/signin`) — Authentication page
3. **Sign Up** (`/signup`) — Registration page with benefits sidebar
4. **Live Agent Dashboard** (`/dashboard`) — Real-time call intelligence with 3-column layout
5. **Churn Analytics** (`/analytics`) — Aggregate stats, distribution charts, signal table, intervention feed
6. **Omnichannel Inbox** (`/inbox`) — Conversations sorted by churn risk with AI-suggested replies
7. **Subscriber Profile** (`/profile`) — Deep-dive into individual subscriber with 30-day risk timeline

## 🎬 Key Interactions

- **Call Timer:** Counts up from 00:00 in real time
- **Transcript Reveal:** Lines appear sequentially with 600ms stagger
- **Churn Bars:** Animate from 0 to target value over 1200ms
- **SHAP Bars:** Staggered left-to-right fill with 150ms delay
- **Network Diagram:** Hover on nodes to see impact values, click to pulse corresponding SHAP bar
- **Apply Offer Button:** Changes to "✓ Offer Applied" with green background, resets after 2s

## 🛠 Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** TailwindCSS v3 with custom theme
- **Charts:** Recharts (analytics), custom SVG (network diagram)
- **Animation:** Framer Motion + CSS transitions
- **Icons:** Lucide React
- **Routing:** React Router v6
- **State:** React useState/useEffect only (no Redux/Zustand)
- **Fonts:** @fontsource packages (Space Grotesk, IBM Plex Sans, JetBrains Mono)

## 📦 Deployment

```bash
npm run build
```

Outputs to `/dist` — ready for Vercel, Netlify, or any static host. No environment variables needed (all data is mocked).

## 🎯 Hackathon Context

**Problem Track:** Customer Analytics  
**Event:** AI4Telco Hackathon — Microsoft AI Skills Week Lagos 2026  
**Stage:** Stage 1 (Demo-first, mocked data)  
**Goal:** Compelling, production-realistic UI that judges can follow in under 3 minutes

## 📝 License

Built for AI4Telco Hackathon 2026
