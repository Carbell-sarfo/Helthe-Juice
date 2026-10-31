export function formatMoney(amountInSmallestUnit: number, currency = 'GHS'): string {
  const amount = amountInSmallestUnit / 100;
  return `${currency} ${amount.toFixed(2)}`;
}