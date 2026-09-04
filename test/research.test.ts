import { describe, expect, test } from 'vitest';
import { ResearchService } from '../src/services/research.js';

describe('ResearchService', () => {
  const service = new ResearchService();

  test('queryRegulatoryFilings', async () => {
    const res = await service.queryRegulatoryFilings('FDA drug');
    expect(res.source).toBe('regulatory');
    expect(res.confidenceDelta).toBeGreaterThan(0);
    expect(res.findings.length).toBeGreaterThan(0);
  });
});
