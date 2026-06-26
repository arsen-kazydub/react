import { formatCurrency } from '@app/utils/formatCurrency'

export function formatTooltipLabel(TooltipItem: any, chartType: string, totalSalary: number) {
  let label = TooltipItem.dataset?.label || ''
  let value = TooltipItem.raw as number
  label += ': ' + formatCurrency(value)
  // to use doughnut chart, add: || chartType === 'doughnut'
  if (chartType === 'pie') {
    const percent = (value * 100) / totalSalary
    label += ' (' + Math.round(percent) + '%)'
  }
  return label
}
