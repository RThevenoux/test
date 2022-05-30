const percentFormatter = new Intl.NumberFormat("fr-FR", {
  style: 'percent',
  minimumFractionDigits: 1,
  maximumFractionDigits: 1
});

export function toPercent(n: number) {
  return percentFormatter.format(n);
}