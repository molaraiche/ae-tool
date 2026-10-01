export function formatMoney(value: number, currency: 'MAD' | 'USD' | 'EUR' = 'MAD') {
  const amount = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
  if (currency === 'MAD') return `${amount} MAD`;
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
}
