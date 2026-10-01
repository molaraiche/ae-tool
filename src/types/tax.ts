export type Activity = 'services' | 'commercial';
export type MonthlyEntry = { services: number; commercial: number; expectedServices?: number; expectedCommercial?: number; actual: boolean };
export type QuarterIncome = { services: number; commercial: number };
export type TaxResult = { tax: number; cnss: number; governmentDue: number; rawTax: number; annualizedTax: number; tranche: string };
