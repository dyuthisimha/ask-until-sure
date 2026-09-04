import 'dotenv/config';
import { createAvmPayingClient } from '../src/x402/client.js';
import { researchEndpoints, shouldPay, type SpendPolicy } from './lib.js';

const mnemonic = process.env.CLIENT_MNEMONIC?.trim() as string;
if (!mnemonic) {
  throw new Error('CLIENT_MNEMONIC is required in .env');
}

const network = (process.env.ALGORAND_NETWORK ?? 'testnet') as 'testnet' | 'mainnet';
const baseUrl = (process.env.API_BASE_URL ?? 'http://localhost:3000') as string;

const policy: SpendPolicy = {
  dailyBudget: 1.00,
  maxPerRequest: 0.25,
  allowedServices: ['regulatory', 'caselaw', 'specialist'],
  blockedServices: [],
};

async function main() {
  const q = process.argv[2] ?? 'FDA drug approval process';
  console.log(`Agent Question: "${q}"\n`);

  const payer = createAvmPayingClient(mnemonic, network);
  const endpoints = researchEndpoints(baseUrl);
  
  let currentConfidence = 30;
  const confidenceThreshold = 85;
  let spentSoFar = 0;
  
  const sources = [
    { name: 'regulatory', url: endpoints.regulatory, price: 0.10 },
    { name: 'caselaw', url: endpoints.caselaw, price: 0.15 },
    { name: 'specialist', url: endpoints.specialist, price: 0.20 },
  ];

  for (const source of sources) {
    if (currentConfidence >= confidenceThreshold) {
      console.log(`Target confidence ${confidenceThreshold}% reached. Stopping research.\n`);
      break;
    }
    if (!shouldPay(source.price, policy, spentSoFar)) {
      console.log(`Budget constraint prevents paying $ ${source.price} for ${source.name}. Skipping...\n`);
      continue;
    }

    console.log(`Current confidence ${currentConfidence}%. Querying ${source.name} for $${source.price}...`);
    const targetUrl = `${source.url}?q=${encodeURIComponent(q)}`;
    const response = await payer.fetchWithPayment(targetUrl);

    if (!response.ok) {
      console.error(`Failed to get ${source.name}. HTTP ${response.status}`);
      continue;
    }

    const data = await response.json();
    const gain = data.confidenceDelta * 100;
    const newConfidence = Math.min(100, currentConfidence + gain);
    spentSoFar += source.price;
    currentConfidence = newConfidence;

    console.log(`+ ${gain}% confidence from ${source.name}. (Spent: $${spentSoFar.toFixed(2)})`);
    console.log(`Findings: ${data.findings.join(' ')}\n`);
  }

  console.log(`--- Research Complete ---`);
  console.log(`Final Confidence: ${currentConfidence.toFixed(0)}%`);
  console.log(`Total Spent: $${spentSoFar.toFixed(2)}`);
}

main().catch(console.error);
