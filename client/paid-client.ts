import 'dotenv/config';
import { createAvmPayingClient } from '../src/x402/client.js';
import { researchEndpoints } from './lib.js';

const mnemonic = process.env.CLIENT_MNEMONIC?.trim() as string;
if (!mnemonic) {
  throw new Error('CLIENT_MNEMONIC is required in .env');
}

const network = (process.env.ALGORAND_NETWORK ?? 'testnet') as 'testnet' | 'mainnet';
const baseUrl = (process.env.API_BASE_URL ?? 'http://localhost:3000') as string;

async function main() {
  const payer = createAvmPayingClient(mnemonic, network);
  const q = 'FDA drug approval process';
  const endpoints = researchEndpoints(baseUrl);
  const targetUrl = `${endpoints.regulatory}?q=${encodeURIComponent(q)}`;

  console.log(`Requesting paid resource: ${targetUrl}`);

  const response = await payer.fetchWithPayment(targetUrl);

  if (!response.ok) {
    console.error(`Payment failed: HTTP ${response.status}`);
    process.exit(1);
  }

  const data = await response.json();
  const txId = response.headers.get('x-x402-receipt-txid');

  console.log('\n--- Paid Resource Unlocked ---');
  console.log(JSON.stringify(data, null, 2));
  console.log('\nSettlement Transaction:', txId);
}

main().catch(console.error);
