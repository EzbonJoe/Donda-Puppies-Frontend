export function formatCurrency(price, currency = 'UGX') {
  const userLocale = navigator.language || 'en-UG';

  return new Intl.NumberFormat(userLocale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}