export interface ResearchFinding {
  findings: string[];
  confidenceDelta: number;
  source: string;
}

export class ResearchService {
  async queryRegulatoryFilings(question: string): Promise<ResearchFinding> {
    const q = question.toLowerCase();
    if (q.includes('cosmetics') || q.includes('eu')) {
      return {
        findings: [
          'EU Regulation 1223/2009 sets out the rules that cosmetic products must comply with.',
          'Safety assessments must be carried out before placing a cosmetic product on the EU market.',
        ],
        confidenceDelta: 0.35,
        source: 'regulatory',
      };
    }
    if (q.includes('fda') || q.includes('drug')) {
      return {
        findings: [
          'The FDA requires a New Drug Application (NDA) to be filed before a drug can be marketed.',
          'Clinical trial data must demonstrate safety and efficacy.',
        ],
        confidenceDelta: 0.45,
        source: 'regulatory',
      };
    }
    return {
      findings: ['General regulatory guidelines suggest compliance with local consumer protection laws.'],
      confidenceDelta: 0.15,
      source: 'regulatory',
    };
  }

  async queryCaseLaw(question: string): Promise<ResearchFinding> {
    const q = question.toLowerCase();
    if (q.includes('cosmetics') || q.includes('eu')) {
      return {
        findings: [
          'Case C-321/14 established precedents regarding animal testing for cosmetics.',
          'Ingredient labeling requirements have been strictly enforced in recent member state rulings.',
        ],
        confidenceDelta: 0.25,
        source: 'caselaw',
      };
    }
    if (q.includes('fda') || q.includes('drug')) {
      return {
        findings: [
          'Recent cases highlight the importance of accurate adverse event reporting.',
          'Off-label promotion liabilities remain a significant risk for pharmaceutical companies.',
        ],
        confidenceDelta: 0.30,
        source: 'caselaw',
      };
    }
    return {
      findings: ['No specific precedents found for this niche. Reliance on general contract law is advised.'],
      confidenceDelta: 0.10,
      source: 'caselaw',
    };
  }

  async querySpecialist(question: string): Promise<ResearchFinding> {
    const q = question.toLowerCase();
    if (q.includes('cosmetics') || q.includes('eu')) {
      return {
        findings: [
          'Expert opinion: Expect tighter restrictions on microplastics and PFAS in cosmetics by 2026.',
          'Recommendation: Audit supply chain immediately for non-compliant raw materials.',
        ],
        confidenceDelta: 0.30,
        source: 'specialist',
      };
    }
    if (q.includes('fda') || q.includes('drug')) {
      return {
        findings: [
          'Expert opinion: Fast-track designations are increasingly competitive. Focus on novel surrogate endpoints.',
          'Recommendation: Engage with FDA early through Type B meetings.',
        ],
        confidenceDelta: 0.20,
        source: 'specialist',
      };
    }
    return {
      findings: ['Expert opinion: Proceed with caution. Seek localized counsel before product launch.'],
      confidenceDelta: 0.25,
      source: 'specialist',
    };
  }
}
