/**
 * Moroccan Auto-Entrepreneur reference, checked 2026-10-01.
 * Primary source: DGI, Code Général des Impôts 2026 (finances.gov.ma/Publication/dgi/2025/CGI-2026-FR.pdf).
 * Applicable year: 2026. Relevant provisions: CGI arts. 42 bis, 42 ter, 73-III, 73-II-B-6°, 73-II-G-8° and 157-II;
 * annual limits also in Law 114-13, art. 1. Same-client withholding clarified by DGI Note Circulaire 733 (2023), p. 56.
 * The special 80,000 MAD rule and ability of a foreign payer to operate withholding require case-specific confirmation.
 * Complementary-right table below is an AMO supplementary right in CGI art. 73-II-B-6°, not a CNSS percentage.
 */
export const taxReference = {
  checkedAt: '2026-10-01',
  source: 'DGI, Code Général des Impôts 2026; Law 114-13; DGI Note Circulaire 733',
  articles: ['42 bis', '42 ter', '73-III', '73-II-B-6°', '73-II-G-8°', '157-II'],
  activities: {
    services: { label: 'Prestations de services', rate: 0.01, annualCeiling: 200_000 },
    commercial: { label: 'Activités commerciales, industrielles et artisanales', rate: 0.005, annualCeiling: 500_000 },
  },
  complementaryRights: [
    { min: 0, max: 499.99, quarterly: 300, annual: 1200, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: 'Moins de 500 MAD' },
    { min: 500, max: 1000, quarterly: 390, annual: 1560, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: '500 à 1 000 MAD' },
    { min: 1001, max: 2500, quarterly: 570, annual: 2280, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: '1 001 à 2 500 MAD' },
    { min: 2501, max: 5000, quarterly: 720, annual: 2880, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: '2 501 à 5 000 MAD' },
    { min: 5001, max: 10000, quarterly: 1050, annual: 4200, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: '5 001 à 10 000 MAD' },
    { min: 10001, max: 25000, quarterly: 1500, annual: 6000, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: '10 001 à 25 000 MAD' },
    { min: 25001, max: 50000, quarterly: 2250, annual: 9000, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: '25 001 à 50 000 MAD' },
    { min: 50000.01, max: Infinity, quarterly: 3600, annual: 14400, legalReference: 'CGI 2026 art. 73-II-B-6°, table referenced by art. 73-III', tranche: 'Plus de 50 000 MAD' },
  ],
  sameClientThreshold: 80_000,
  sameClientWithholdingRate: 0.30,
  quarters: [
    { id: 1, label: 'T1', months: ['Janvier', 'Février', 'Mars'] },
    { id: 2, label: 'T2', months: ['Avril', 'Mai', 'Juin'] },
    { id: 3, label: 'T3', months: ['Juillet', 'Août', 'Septembre'] },
    { id: 4, label: 'T4', months: ['Octobre', 'Novembre', 'Décembre'] },
  ],
} as const;
