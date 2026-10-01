import { taxReference } from '../config/moroccoTax2026';
import type { MonthlyEntry, QuarterIncome, TaxResult } from '../types/tax';

export function roundTax(amount: number): number { return Math.floor(amount + 0.5); }
export function calculateIncomeTax(income: QuarterIncome): { tax: number; rawTax: number } {
  const rawTax = income.services * taxReference.activities.services.rate + income.commercial * taxReference.activities.commercial.rate;
  return { rawTax, tax: roundTax(rawTax) };
}
export function getComplementaryRight(annualizedTax: number) {
  const row = taxReference.complementaryRights.find((item) => annualizedTax >= item.min && annualizedTax <= item.max) ?? taxReference.complementaryRights.at(-1)!;
  return { amount: row.quarterly, tranche: row.tranche };
}
export function calculateCNSS(income: QuarterIncome): { amount: number; annualizedTax: number; tranche: string } {
  // The portal regression matches when the quarter's tax is annualized for the CGI annual-tax band.
  // CGI art. 73-III refers to a regulatory calculation method, so this projection needs official confirmation.
  const annualizedTax = calculateIncomeTax({ services: income.services * 4, commercial: income.commercial * 4 }).tax;
  return { ...getComplementaryRight(annualizedTax), annualizedTax };
}
export function calculateQuarter(income: QuarterIncome): TaxResult {
  const tax = calculateIncomeTax(income);
  const cnss = calculateCNSS(income);
  return {
    tax: tax.tax, cnss: cnss.amount, governmentDue: tax.tax + cnss.amount,
    rawTax: tax.rawTax, annualizedTax: cnss.annualizedTax, tranche: cnss.tranche,
  };
}
export function sumQuarterActual(entries: MonthlyEntry[]): QuarterIncome {
  return entries.reduce((sum, item) => ({ services: sum.services + (item.actual ? item.services : 0), commercial: sum.commercial + (item.actual ? item.commercial : 0) }), { services: 0, commercial: 0 });
}
export function projectQuarter(entries: MonthlyEntry[], sameIncome = false): QuarterIncome {
  const lastActual = [...entries].reverse().find((item) => item.actual);
  return entries.reduce((sum, item) => ({
    services: sum.services + (item.actual ? item.services : (item.expectedServices ?? (sameIncome ? lastActual?.services : 0) ?? 0)),
    commercial: sum.commercial + (item.actual ? item.commercial : (item.expectedCommercial ?? (sameIncome ? lastActual?.commercial : 0) ?? 0)),
  }), { services: 0, commercial: 0 });
}
export function calculateSavings(target: number, alreadySaved: number, monthsRemaining: number): { remaining: number; perMonth: number } {
  const remaining = Math.max(0, target - alreadySaved);
  return { remaining, perMonth: monthsRemaining > 0 ? Math.ceil((remaining / monthsRemaining) * 100) / 100 : remaining };
}
export function calculateSameClientThreshold(amount: number) { return { threshold: taxReference.sameClientThreshold, amount: Math.max(0, amount), excess: Math.max(0, amount - taxReference.sameClientThreshold) }; }
export function getCurrentQuarter(date = new Date()): number { return Math.floor(date.getMonth() / 3) + 1; }

export function calculateYearToDateProgress(services: number, commercial: number) {
  const servicesCap = taxReference.activities.services.annualCeiling;
  const commercialCap = taxReference.activities.commercial.annualCeiling;
  return { services: { amount: services, cap: servicesCap, ratio: services / servicesCap, exceeded: services > servicesCap }, commercial: { amount: commercial, cap: commercialCap, ratio: commercial / commercialCap, exceeded: commercial > commercialCap } };
}
