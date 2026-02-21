export function formatCurrency(priceCents, currency = 'USD') {
  const userLocale = navigator.language || 'en-US';

  return new Intl.NumberFormat(userLocale, {
    style: 'currency',
    currency: currency
  }).format(priceCents / 100);
}