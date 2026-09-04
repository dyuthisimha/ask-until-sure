import { loadConfig, type RuntimeConfig } from '../src/config.js';

export const testConfig: RuntimeConfig = {
  port: 3000,
  networkName: 'testnet',
  network: 'eip155:1:algo:testnet',
  usdcAssetId: '10458941',
  indexerUrl: 'https://testnet-idx.algonode.cloud',
  facilitatorUrl: 'https://facilitator.goplausible.xyz',
  payTo: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ',
  prices: {
    regulatory: '$0.10',
    caselaw: '$0.15',
    specialist: '$0.20',
  },
  challengeMode: false,
  demoMode: true,
  demoMnemonic: 'test mnemonic',
  confidenceThreshold: 85,
  budgetCapUsd: 1.00,
};
