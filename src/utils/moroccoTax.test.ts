import { describe, expect, it } from 'vitest';
import { calculateCNSS, calculateQuarter, calculateSavings, calculateSameClientThreshold, calculateYearToDateProgress, getComplementaryRight, projectQuarter, sumQuarterActual } from './moroccoTax';
import type { MonthlyEntry } from '../types/tax';

describe('Moroccan AE financial calculations', () => {
  it('returns zero IR and the first AMO complementary band at zero activity', () => expect(calculateQuarter({ services: 0, commercial: 0 })).toMatchObject({ tax: 0, cnss: 300, governmentDue: 300 }));
  it('calculates service turnover at 1 percent', () => expect(calculateQuarter({ services: 10000, commercial: 0 })).toMatchObject({ tax: 100, cnss: 300, governmentDue: 400 }));
  it('calculates commercial turnover at 0.5 percent', () => expect(calculateQuarter({ services: 0, commercial: 10000 }).tax).toBe(50));
  it('calculates mixed categories at their separate rates', () => expect(calculateQuarter({ services: 10000, commercial: 10000 }).tax).toBe(150));
  it('uses the exact complementary-right band boundaries', () => {
    expect(getComplementaryRight(499).amount).toBe(300);
    expect(getComplementaryRight(500).amount).toBe(390);
    expect(getComplementaryRight(1000).amount).toBe(390);
    expect(getComplementaryRight(1001).amount).toBe(570);
    expect(getComplementaryRight(2500).amount).toBe(570);
    expect(getComplementaryRight(2501).amount).toBe(720);
  });
  it('annualizes a quarter for the complementary-right planning band', () => expect(calculateCNSS({ services: 10000, commercial: 0 })).toMatchObject({ amount: 300, tranche: 'Moins de 500 MAD' }));
  it('keeps actual and projected receipts separate', () => {
    const entries: MonthlyEntry[] = [{ services: 6000, commercial: 0, actual: true }, { services: 4000, commercial: 0, actual: true }, { services: 0, commercial: 0, expectedServices: 2000, actual: false }];
    expect(sumQuarterActual(entries)).toEqual({ services: 10000, commercial: 0 });
    expect(projectQuarter(entries)).toEqual({ services: 12000, commercial: 0 });
  });
  it('splits remaining savings and does not return a negative balance', () => {
    expect(calculateSavings(700, 200, 2)).toEqual({ remaining: 500, perMonth: 250 });
    expect(calculateSavings(700, 800, 0)).toEqual({ remaining: 0, perMonth: 0 });
  });
  it('flags only the same-client amount over the threshold', () => {
    expect(calculateSameClientThreshold(80000).excess).toBe(0);
    expect(calculateSameClientThreshold(80001).excess).toBe(1);
  });
  it('tracks separate annual turnover ceilings', () => expect(calculateYearToDateProgress(200001, 500000)).toMatchObject({ services: { exceeded: true }, commercial: { exceeded: false } }));
});
