import { researchEndpoints } from '../client/lib.js';
import 'dotenv/config';

async function main() {
  const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';
  const endpoints = researchEndpoints(baseUrl);
  
  console.log('Running smoke tests against:', baseUrl);

  const health = await fetch(`${baseUrl}/health`);
  if (!health.ok) throw new Error('Health check failed');
  console.log('✅ Health check passed');

  for (const [name, url] of Object.entries(endpoints)) {
    const res = await fetch(`${url}?q=test`);
    if (res.status !== 402) throw new Error(`Expected 402 on ${name}, got ${res.status}`);
    console.log(`✅ ${name} route protected by x402`);
  }

  console.log('Smoke test complete!');
}

main().catch(e => {
  console.error('Smoke test failed:', e);
  process.exit(1);
});
