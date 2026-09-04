export interface SpendPolicy {
  dailyBudget: number;
  maxPerRequest: number;
  allowedServices: string[];
  blockedServices: string[];
}

export function shouldPay(priceUsd: number, policy: SpendPolicy, spentSoFar: number): boolean {
  if (priceUsd > policy.maxPerRequest) return false;
  if (spentSoFar + priceUsd > policy.dailyBudget) return false;
  return true;
}

export function researchEndpoints(baseUrl: string) {
  const base = baseUrl.replace(/\/$/, '');
  return {
    regulatory: `${base}/api/research/regulatory`,
    caselaw: `${base}/api/research/caselaw`,
    specialist: `${base}/api/research/specialist`,
  };
}
