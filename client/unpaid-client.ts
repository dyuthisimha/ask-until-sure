import 'dotenv/config';
import { researchEndpoints } from './lib.js';

const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000';

async function main() {
  const endpoints = researchEndpoints(baseUrl);
  const q = 'EU cosmetics regulations';
  const targetUrl = `${endpoints.regulatory}?q=${encodeURIComponent(q)}`;

  console.log(`Sending unpaid request to: ${targetUrl}`);
  const response = await fetch(targetUrl);

  console.log(`\nHTTP Status: ${response.status} ${response.statusText}`);
  
  if (response.status === 402) {
    console.log('\n--- 402 Payment Required Header ---');
    console.log(response.headers.get('payment-required'));
  } else {
    console.log(await response.text());
  }
}

main().catch(console.error);
