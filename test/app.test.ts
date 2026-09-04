import { describe, expect, test } from 'vitest';
import { createApp } from '../src/app.js';
import { testConfig } from './config.js';

describe('App Router', () => {
  const app = createApp(testConfig);

  test('GET /health returns ask-until-sure', async () => {
    const res = await app.request('/health');
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.service).toBe('ask-until-sure');
  });

  test('GET /api/research/regulatory without q returns 400', async () => {
    const res = await app.request('/api/research/regulatory');
    expect(res.status).toBe(400);
  });

  test('GET /api/research/regulatory with q returns 402 Payment Required', async () => {
    const res = await app.request('/api/research/regulatory?q=test');
    expect(res.status).toBe(402);
    expect(res.headers.has('payment-required')).toBe(true);
  });
});
