import { getChartColor } from '@app/components/chart/getChartColor'

describe('getChartColor', () => {
  // default
  it('returns color for a valid index and opacity setting', () => {
    expect(getChartColor(1)).toBe('hsla(340,65%,45%,1)')
    expect(getChartColor(1, true)).toBe('hsla(340,65%,45%,1)')
    expect(getChartColor(1, false)).toBe('hsla(340,65%,45%,0.5)')
  })

  // rotated colors
  it('wraps index using modulo, including negative values', () => {
    expect(getChartColor(0)).toBe('hsla(210,65%,45%,1)')
    expect(getChartColor(7)).toBe('hsla(210,65%,45%,1)')
    expect(getChartColor(-1)).toBe('hsla(60,65%,45%,1)')
    expect(getChartColor(6)).toBe('hsla(60,65%,45%,1)')
  })

  // special case
  it('handles the special red color', () => {
    expect(getChartColor(3)).toBe('hsla(0,0%,40%,1)')
    expect(getChartColor(3, false)).toBe('hsla(0,0%,40%,0.5)')
  })
})
