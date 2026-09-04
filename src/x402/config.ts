import { ExactAvmScheme } from '@x402/avm/exact/server';
import { HTTPFacilitatorClient } from '@x402/core/server';
import type { ResourceServerExtension } from '@x402/core/types';
import { paymentMiddleware, x402ResourceServer } from '@x402/hono';
import { bazaarResourceServerExtension, declareDiscoveryExtension } from '@x402-avm/extensions';
import type { RuntimeConfig } from '../config.js';

export const REGULATORY_DESCRIPTION = 'Query regulatory filings and documents.';
export const CASELAW_DESCRIPTION = 'Search through case law and precedents.';
export const SPECIALIST_DESCRIPTION = 'Request opinions from domain specialists.';

export function createX402Middleware(config: RuntimeConfig) {
  const facilitator = new HTTPFacilitatorClient({ url: config.facilitatorUrl });
  const server = new x402ResourceServer(facilitator);
  server.register(config.network, new ExactAvmScheme());
  server.registerExtension(bazaarResourceServerExtension as unknown as ResourceServerExtension);

  const discoveryRegulatory = declareDiscoveryExtension({
    input: { q: 'FDA drug approval process for novel treatments' },
    inputSchema: { properties: { q: { type: 'string', description: 'Search query' } }, required: ['q'] },
    output: { example: { findings: ['Regulatory finding 1', 'Regulatory finding 2'], confidenceDelta: 0.35, source: 'regulatory' } },
  });

  const discoveryCaselaw = declareDiscoveryExtension({
    input: { q: 'Precedents regarding off-label drug promotion' },
    inputSchema: { properties: { q: { type: 'string', description: 'Search query' } }, required: ['q'] },
    output: { example: { findings: ['Case law finding 1'], confidenceDelta: 0.25, source: 'caselaw' } },
  });

  const discoverySpecialist = declareDiscoveryExtension({
    input: { q: 'Opinion on fast-track designations for orphan drugs' },
    inputSchema: { properties: { q: { type: 'string', description: 'Search query' } }, required: ['q'] },
    output: { example: { findings: ['Specialist opinion 1'], confidenceDelta: 0.20, source: 'specialist' } },
  });

  const baseAccepts = (price: string) => [
    {
      scheme: 'exact',
      price: price,
      network: config.network,
      payTo: config.payTo,
      extra: {
        asset: config.usdcAssetId,
        ...(config.challengeMode ? { tag: 'x402-global-challenge' } : {}),
      },
    },
  ];

  return paymentMiddleware(
    {
      'GET /api/research/regulatory': {
        accepts: baseAccepts(config.prices.regulatory),
        description: REGULATORY_DESCRIPTION,
        mimeType: 'application/json',
        extensions: discoveryRegulatory,
      },
      'GET /api/research/caselaw': {
        accepts: baseAccepts(config.prices.caselaw),
        description: CASELAW_DESCRIPTION,
        mimeType: 'application/json',
        extensions: discoveryCaselaw,
      },
      'GET /api/research/specialist': {
        accepts: baseAccepts(config.prices.specialist),
        description: SPECIALIST_DESCRIPTION,
        mimeType: 'application/json',
        extensions: discoverySpecialist,
      },
    },
    server,
  );
}
