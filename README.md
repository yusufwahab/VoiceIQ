# VoiceIQ

Omnichannel customer intelligence for Nigerian telcos. VoiceIQ turns real-time voice, WhatsApp, and SMS conversations into churn risk signals with clear explanations and actionable next-best actions for agents.

## Hackathon context
VoiceIQ is built for the AI4Telco Hackathon (Microsoft AI Skills Week Lagos 2026) under Problem Statement 2: Customer Analytics. The challenge: convert customer data into timely, proactive retention actions that increase customer value and reduce churn.

## What VoiceIQ does
- Ingests real-time conversations (voice + chat) and behavioral customer signals.
- Detects churn intent, frustration escalators, and complaint patterns in Nigerian English/Pidgin and code-switching.
- Combines conversational signals with behavioral features in an XGBoost churn model.
- Explains every prediction with SHAP and plain-English summaries.
- Recommends retention actions and routes high-risk customers to human agents.

## Differentiation
- Nigerian language and slang understanding as the technical moat.
- Real-time churn scoring during live interactions, not after the fact.
- Explainability-first workflow for agent trust and compliance.

## Solution architecture (high level)
- **STT**: Azure Speech Services + Whisper fine-tuning for Nigerian accents and Pidgin.
- **NLP**: Intent + sentiment + complaint classifiers with a Nigerian slang layer.
- **Churn model**: XGBoost using behavioral + conversational features.
- **Explainability**: SHAP with plain-English explanations.
- **Backend**: FastAPI streaming inference.
- **Dashboard**: React (or Streamlit for the prototype).

## New changes we are implementing
These updates directly address judge feedback for validation, deployment realism, and ROI discipline.

1) **Validation experiment**
- Run the model twice: behavioral-only vs behavioral + conversational.
- Report AUC/PR-AUC, lift@10%, and false-positive reduction.

2) **Defensible synthetic data strategy**
- Publish explicit rules for generating synthetic conversations and churn labels.
- Document limitations and how the model will retrain on real CRM/billing data.

3) **Latency budget + fallback mode**
- Target total inference latency < 1.2s (STT + NLP + scoring).
- Fallback to behavioral model if transcription confidence is low.

4) **Retention governance**
- Offer policy based on LTV and churn risk to prevent over-discounting.
- Tiered actions: self-serve for low LTV, human escalation for high LTV.

5) **Integration + privacy**
- Minimal integration map (CRM, CDR, recharge history, ticketing).
- PII redaction, storage window limits, and consent alignment.

## Demo assets
- Mocked UI: [index.html](index.html)
- VoiceIQ overview: [VoiceIQ_Overview.pdf](VoiceIQ_Overview.pdf)
- Hackathon brief: [AI Skill Week Lagos - Hackathon Participants Brief (1).pdf](AI%20Skill%20Week%20Lagos%20-%20Hackathon%20Participants%20Brief%20(1).pdf)

## Documentation
- Full hackathon and solution documentation: [docs/HACKATHON_OVERVIEW.md](docs/HACKATHON_OVERVIEW.md)

## Next steps
- Implement validation experiment and publish metrics.
- Add latency monitoring and fallback logic to the API.
- Finalize offer governance logic and demo flow.