# VoiceIQ Three-Stage Execution Plan

## Overview
We will deliver VoiceIQ in three stages to maximize demo readiness, technical credibility, and production realism within hackathon timelines.

## Stage 1: Demo-first (rule-based, no training)
**Goal:** Ship a credible end-to-end demo fast.

**What we build**
- Mocked API responses for churn score, detected signals, and SHAP summary.
- Rule-based churn scoring (e.g., port intent + repeat complaints + low recharge).
- Scripted live transcript and agent card workflow in the UI.
- Simple dashboard with clear narrative flow.

**Deliverables**
- Working demo UI.
- Demo script and storyline.
- Rule-based scoring logic document.

**Success criteria**
- Demo is smooth and compelling within 2-3 minutes.
- Judges can follow the full flow: signal -> score -> explanation -> action.

## Stage 2: Model-first (training and validation)
**Goal:** Prove real predictive lift from conversational signals.

**What we build**
- Baseline churn model (behavioral features only).
- VoiceIQ model (behavioral + conversational features).
- Validation card with metrics (AUC, PR-AUC, lift@10%, false-positive reduction).
- Synthetic conversation dataset generation rules.

**Deliverables**
- Trained models and evaluation results.
- Updated validation card with metrics.
- Feature list and data generation notes.

**Success criteria**
- Measurable improvement over baseline.
- Clear, defensible evidence for the 61% -> 87% demo claim.

## Stage 3: Integration-first (multi-channel and ops)
**Goal:** Show a production-realistic system with real-time ingestion.

**What we build**
- Multi-channel ingestion mocks for voice, WhatsApp, SMS.
- Real-time scoring pipeline with latency budget and fallback rules.
- Governance policy for offers and ROI discipline.
- Minimal integration map (CRM, CDR, recharge history, tickets).

**Deliverables**
- End-to-end pipeline diagram.
- Latency budget and fallback logic notes.
- Privacy and consent summary.

**Success criteria**
- Stable real-time demo with low-latency updates.
- Clear operational story for production readiness.

## Team roles and responsibilities

### Frontend developer
- Build and polish the demo UI (dashboard, agent card, SHAP panel).
- Wire UI to mocked API in Stage 1, then real endpoints in Stage 2/3.
- Ensure demo flow is crisp and visually consistent.
- Prepare demo-friendly states and scripted data.

### Backend / Data / AI engineer
- Stage 1: Implement rules engine for churn signals.
- Stage 2: Train churn models, run validation, publish metrics.
- Stage 3: Create ingestion pipeline stubs, latency budgets, and fallback logic.
- Own data generation rules and evaluation artifacts.

### PM / Pitch lead
- Maintain narrative, demo script, and slide deck structure.
- Coordinate milestones across stages and ensure timing.
- Prepare final submission materials (README, docs, demo video, slides).
- Lead rehearsal and Q&A preparation.
