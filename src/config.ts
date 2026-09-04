import algosdk from 'algosdk';
import {
  ALGORAND_MAINNET_CAIP2,
  ALGORAND_TESTNET_CAIP2,
  USDC_MAINNET_ASA_ID,
  USDC_TESTNET_ASA_ID,
} from '@x402/avm';

export type AlgorandNetwork = 'testnet' | 'mainnet';

export interface RuntimeConfig {
  port: number;
  networkName: AlgorandNetwork;
  network: `${string}:${string}`;
  usdcAssetId: string;
  indexerUrl: string;
  facilitatorUrl: string;
  payTo: string;
  prices: {
    regulatory: string;
    caselaw: string;
    specialist: string;
  };
  challengeMode: boolean;
  demoMode: boolean;
  demoMnemonic?: string;
  confidenceThreshold: number;
  budgetCapUsd: number;
}

const NETWORKS = {
  testnet: {
    network: ALGORAND_TESTNET_CAIP2,
    usdcAssetId: USDC_TESTNET_ASA_ID,
    indexerUrl: 'https://testnet-idx.algonode.cloud',
  },
  mainnet: {
    network: ALGORAND_MAINNET_CAIP2,
    usdcAssetId: USDC_MAINNET_ASA_ID,
    indexerUrl: 'https://mainnet-idx.algonode.cloud',
  },
} as const;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): RuntimeConfig {
  const networkName = env.ALGORAND_NETWORK ?? 'testnet';
  if (networkName !== 'testnet' && networkName !== 'mainnet') {
    throw new Error('ALGORAND_NETWORK must be either "testnet" or "mainnet".');
  }

  const payTo = env.PAY_TO_ADDRESS?.trim();
  if (!payTo) {
    throw new Error('PAY_TO_ADDRESS is required. Add the public address of the wallet receiving USDC.');
  }
  if (!algosdk.isValidAddress(payTo)) {
    throw new Error('PAY_TO_ADDRESS is not a valid Algorand address.');
  }

  const port = Number(env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer between 1 and 65535.');
  }

  const selected = NETWORKS[networkName];

  const demoMode = env.DEMO_MODE === 'true';
  if (demoMode && networkName !== 'testnet') {
    throw new Error('DEMO_MODE is TestNet-only. Disable it before using MainNet.');
  }

  return {
    port,
    networkName,
    network: selected.network,
    usdcAssetId: selected.usdcAssetId,
    indexerUrl: (env.INDEXER_URL ?? selected.indexerUrl).replace(/\/$/, ''),
    facilitatorUrl: (env.FACILITATOR_URL ?? 'https://facilitator.goplausible.xyz').replace(/\/$/, ''),
    payTo,
    prices: {
      regulatory: '$0.10',
      caselaw: '$0.15',
      specialist: '$0.20',
    },
    challengeMode: env.CHALLENGE_MODE === 'true',
    demoMode,
    demoMnemonic: demoMode ? env.CLIENT_MNEMONIC?.trim() : undefined,
    confidenceThreshold: Number(env.CONFIDENCE_THRESHOLD ?? 85),
    budgetCapUsd: Number(env.BUDGET_CAP_USD ?? 1.00),
  };
}
