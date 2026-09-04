# Ask Until Sure — Implementation Tasks

## 1. Project Metadata
- [ ] Fill in PROJECT_BRIEF.md
- [ ] Rename package.json
- [ ] Rewrite README.md
- [ ] Update .env.example

## 2. Server Configuration
- [ ] Update src/config.ts (multi-price, threshold, budget)
- [ ] Update src/server.ts (new service name)

## 3. Paid Research Endpoints
- [ ] Create src/services/research.ts
- [ ] Create src/routes/research.ts
- [ ] Delete src/routes/wallet.ts
- [ ] Delete src/services/algorand.ts

## 4. x402 Payment Middleware
- [ ] Rewrite src/x402/config.ts (3 routes, 3 prices, Bazaar metadata)

## 5. App Wiring
- [ ] Rewrite src/app.ts (new routes, validation, demo)

## 6. Demo Agent (Server-Side)
- [ ] Rewrite src/routes/demo.ts (multi-step research agent)

## 7. Browser Dashboard
- [ ] Rewrite src/web/page.ts
- [ ] Rewrite src/web/app-script.ts
- [ ] Rewrite src/web/styles.ts

## 8. Client Library & CLI
- [ ] Rewrite client/lib.ts
- [ ] Rewrite client/paid-client.ts
- [ ] Rewrite client/agent-client.ts
- [ ] Update client/unpaid-client.ts

## 9. Tests
- [ ] Update test/config.ts
- [ ] Rewrite test/app.test.ts
- [ ] Replace test/algorand.test.ts → test/research.test.ts

## 10. Scripts & SDK
- [ ] Update scripts/smoke.ts
- [ ] Update sdk/extensions.ts

## 11. Verification
- [ ] pnpm build passes
- [ ] pnpm test passes
