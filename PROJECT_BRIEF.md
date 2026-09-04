# Project Brief

Ask Until Sure — Confidence-Gated Research Agent

## Service

- Name: Ask Until Sure
- One-line description: A multi-source research agent where each data source is an x402-gated paid endpoint.
- Paid route: `/api/research/regulatory`, `/api/research/caselaw`, `/api/research/specialist`
- Price in USDC: $0.10, $0.15, $0.20 respectively
- Network for local testing: Algorand TestNet
- Intended production network: Algorand MainNet

## Buyer

- Who or what pays for this? An autonomous agent orchestrated on behalf of a user.
- Why would an autonomous agent buy it? To increase its confidence in answering a user's question, selectively choosing sources whose expected confidence gain exceeds their price.
- What policy should an agent use before paying? Stop when confidence crosses a threshold or a budget cap is hit. Ensure expected value is high enough.

## Input

Describe each input field, validation rule, and example value.

```json
{
  "q": "FDA drug approval process for novel treatments"
}
```

## Output

Describe the response returned after settlement.

```json
{
  "findings": ["Regulatory finding 1", "Regulatory finding 2"],
  "confidenceDelta": 0.45,
  "source": "regulatory"
}
```

## Data Sources Or Actions

- External APIs: Mocked regulatory, caselaw, and specialist endpoints
- On-chain reads: None
- Off-chain computation: Confidence threshold evaluation
- Side effects after payment: Return research findings

## Bazaar Metadata

- Search keywords: research, regulatory, caselaw, specialist, confidence
- Input schema: `{"q": "string"}`
- Output example: `{"findings": ["..."], "confidenceDelta": 0.45, "source": "regulatory"}`
- Trust or freshness notes: Simulated for demo purposes.

## Deployment Notes

- Required env vars: `PAY_TO_ADDRESS`, `CONFIDENCE_THRESHOLD`, `BUDGET_CAP_USD`
- TestNet readiness: Ready
- MainNet readiness: Not applicable for mock demo
- Known risks: Mock data sources only.
