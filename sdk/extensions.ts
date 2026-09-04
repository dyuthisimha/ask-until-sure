export interface SpendPolicy {
  dailyBudget: number;
  maxPerRequest: number;
  allowedServices: string[];
  blockedServices: string[];
}

export function evaluateSourceValue(confidenceDelta: number, priceUsd: number): number {
  if (priceUsd <= 0) return Infinity;
  return confidenceDelta / priceUsd;
}
