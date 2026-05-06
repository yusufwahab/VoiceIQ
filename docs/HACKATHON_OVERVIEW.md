# VoiceIQ Hackathon Documentation

## 1) Hackathon overview
- Event: Microsoft AI Skills Week Lagos 2026, AI4Telco Hackathon.
- Sponsor ecosystem: Microsoft, MTN Foundation, Data Science Nigeria (DSN).
- Track: Problem Statement 2 (Customer Analytics).
- Goal: proactive, AI-driven retention to reduce churn and increase customer value.

## 2) Problem statement (summary)
Telecom operators have large customer datasets but fail to convert them into timely actions. As a result, retention is reactive and churn remains high. The challenge is to design an AI-driven system that predicts churn early and triggers personalized retention offers at scale.

## 3) VoiceIQ solution summary
VoiceIQ is an omnichannel customer intelligence platform that listens to real-time customer conversations (voice, WhatsApp, SMS), detects churn intent and frustration signals, and combines them with behavioral data to produce explainable churn risk scores and next-best actions.

### Key outcomes
- Early churn detection (30-60 days ahead).
- Actionable agent guidance with explainability.
- Retention offers governed by ROI-friendly policies.

## 4) Target users
- Call center agents.
- Retention and customer experience managers.
- Operations leadership and network teams.

## 5) Solution flow
1. Ingest live voice and chat interactions.
2. Transcribe and normalize Nigerian English/Pidgin + code-switching.
3. Extract conversational signals (intent, sentiment, complaint frequency).
4. Combine with behavioral features (recharge recency, usage drops, inactivity).
5. Score churn risk with XGBoost.
6. Explain prediction with SHAP + plain-English summary.
7. Trigger policy-based retention offers and routing.

## 6) Architecture (prototype)
- STT: Azure Speech Services + Whisper fine-tuning.
- NLP: intent + sentiment + complaint classifiers with Nigerian slang layer.
- Churn model: XGBoost on behavioral + conversational features.
- Explainability: SHAP with plain-English explanation output.
- Backend: FastAPI for streaming inference.
- Dashboard: React (or Streamlit for demo).

## 7) Datasets
### 7.1 Behavioral churn datasets
- Kaggle Telco Churn: kaggle.com/datasets/blastchar/telco-customer-churn
- Iranian Telecom Churn: archive.ics.uci.edu/dataset/563/iranian+churn+dataset

### 7.2 Conversational signals (synthetic)
Real telco conversational data is proprietary. We generate synthetic conversations to simulate Nigerian call center interactions.

**Synthetic data rules (documented):**
- Pidgin and code-switching phrases included in 35-45% of messages.
- Complaint categories: data issues, billing disputes, network quality, porting intent.
- Churn labels correlate with: repeated complaints, competitor mentions, low recharge recency.
- Sentiment ranges: negative sentiment clusters in churn-positive samples.
- Contact frequency and time-of-day patterns match typical call center loads.

**Limitations:**
- Synthetic text cannot fully capture real customer language variance.
- Final model will retrain on real CRM/billing data with no architectural changes.

## 8) Validation experiment (new change)
We run two model variants:
- **Baseline:** behavioral features only.
- **VoiceIQ:** behavioral + conversational signals.

**Metrics to report:**
- AUC and PR-AUC.
- Lift@10% for retention targeting.
- False-positive reduction vs baseline.

## 9) Latency budget and fallback (new change)
Goal: <1.2 seconds end-to-end inference during a live call.
- STT: 600-900 ms.
- NLP: 100-200 ms.
- Scoring + SHAP: 50-100 ms.

**Fallback:**
- If transcription confidence is low, use behavioral-only churn model and keyword alerts.

## 10) Retention governance (new change)
Offer policy is based on churn risk and LTV:
- High churn + high LTV: agent escalation + premium offer.
- High churn + low LTV: self-service win-back message.
- Medium churn: proactive guidance, no discount unless repeated complaints.

This prevents over-discounting and keeps ROI positive.

## 11) Integration + privacy (new change)
**Data in:** CRM, recharge history, CDR, ticketing system, WhatsApp/SMS logs.
**Data out:** retention offers, agent UI, CX reporting dashboards.

**Privacy safeguards:**
- PII redaction before storage.
- Short retention windows for audio and transcripts.
- Consent alignment with existing call center disclosures.

## 12) Demo narrative
- Start with a real user scenario (Chioma).
- Show live transcript with detected signals.
- Display churn score delta (baseline vs VoiceIQ).
- Show SHAP explanation in plain English.
- Trigger a policy-based retention offer.

## 13) Deliverables checklist
- Churn prediction model (baseline + VoiceIQ variant).
- SHAP explainability output.
- Agent dashboard demo.
- API endpoint for churn scoring.
- Validation experiment report.
- Demo video and slides.
