export const CURRENCY_CODE = 'INR';

export function formatPrice(amount) {
  const value = Number(amount) || 0;
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: CURRENCY_CODE,
    maximumFractionDigits: 0,
  }).format(value);
}
