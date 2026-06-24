import { formatTooltipLabel } from '@app/components/chart/formatTooltipLabel'

const label = 'My Label'
const sum = 2000
const formattedSum = '$2,000'

const tooltip = {
  dataset: {},
  raw: sum,
}

const tooltipWithLabel = {
  ...tooltip,
  dataset: { label: label },
}

describe('formatTooltipLabel', () => {
  // Line and Bar charts
  it('formats label of Line and Bar charts', () => {
    expect(formatTooltipLabel(tooltipWithLabel, 'line', sum)).toBe(`${label}: ${formattedSum}`)
    expect(formatTooltipLabel(tooltipWithLabel, 'bar', sum)).toBe(`${label}: ${formattedSum}`)
  })

  // Pie chart
  it('formats label of Pie chart', () => {
    expect(formatTooltipLabel(tooltipWithLabel, 'pie', sum)).toBe(
      `${label}: ${formattedSum} (100%)`,
    )
  })

  it('formats label without text', () => {
    expect(formatTooltipLabel(tooltip, 'line', sum)).toBe(`: ${formattedSum}`)
  })
})
