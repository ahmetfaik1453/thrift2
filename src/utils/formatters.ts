export const formatCurrency = (amount: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatIBAN = (iban: string) => {
  if (iban.length !== 16) {
    return 'Invalid IBAN';
  }
  return iban.replace(/(.{4})/g, '$1 ').trim();
};

export const formatExchangeRate = (rate: number) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
  }).format(rate);
};
