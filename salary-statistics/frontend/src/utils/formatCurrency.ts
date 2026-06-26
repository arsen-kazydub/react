export function formatCurrency(n: number, dollarSign?: boolean) {
  dollarSign = typeof dollarSign === 'undefined' ? true : dollarSign
  let sum = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(n)
  if (dollarSign) {
    // prettier-ignore
    sum = n >= 0
      ? '$' + sum
      : '-$' + sum.substring(1)
  }
  return sum
}
