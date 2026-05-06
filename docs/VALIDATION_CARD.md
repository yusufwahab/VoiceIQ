# VoiceIQ Validation Card (1-Page)

## Objective
Prove that conversational signals improve churn prediction accuracy and retention targeting beyond behavioral-only models.

## Experiment design
- **Baseline model:** behavioral features only.
- **VoiceIQ model:** behavioral + conversational features.
- **Same train/test split** and identical model settings except feature set.

## Datasets
- Behavioral: Kaggle Telco Churn + Iranian Telecom Churn (normalized).
- Conversational: synthetic Nigerian telco conversations generated with documented rules.

## Conversational features (examples)
- Porting intent detection (binary, confidence).
- Frustration level score (0-1).
- Competitor mention frequency.
- Complaint recurrence (last 7/30 days).
- Negative sentiment streak length.

## Metrics to report
- AUC and PR-AUC.
- Lift@10% (retention targeting efficiency).
- False-positive rate reduction.

## Expected outcome (fill after run)
- Baseline AUC: __
- VoiceIQ AUC: __
- Lift@10% improvement: __
- False-positive reduction: __

## Latency budget
Target end-to-end inference under 1.2 seconds.
- STT: 600-900 ms.
- NLP: 100-200 ms.
- Scoring + SHAP: 50-100 ms.

## Governance policy
Offers are gated by churn risk and LTV to avoid over-discounting.
- High churn + high LTV: retention offer + human escalation.
- High churn + low LTV: self-service win-back message.
- Medium churn: guidance only.

## Fallback mode
If transcription confidence is low, use behavioral-only model plus keyword alerts.

## Risks and mitigations
- **Synthetic data bias:** retrain on real CRM data during pilot.
- **Latency drift:** caching + batch inference for peak hours.
- **Model drift:** monthly retraining and monitoring dashboards.
