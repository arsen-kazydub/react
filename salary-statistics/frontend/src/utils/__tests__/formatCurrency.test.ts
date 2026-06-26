import { formatCurrency } from '@app/utils/formatCurrency'

describe('formatCurrency', () => {
  // default
  it('formats a number as currency with a dollar sign by default', () => {
    expect(formatCurrency(1234.56)).toBe('$1,235')
    expect(formatCurrency(0)).toBe('$0')
    expect(formatCurrency(-1000)).toBe('-$1,000')
  })

  // dollarSign is true
  it('formats a number as currency with a dollar sign when dollarSign is true', () => {
    expect(formatCurrency(1234.56, true)).toBe('$1,235')
    expect(formatCurrency(0, true)).toBe('$0')
    expect(formatCurrency(-1000, true)).toBe('-$1,000')
  })

  // dollarSign is false
  it('formats a number as currency without a dollar sign when dollarSign is false', () => {
    expect(formatCurrency(1234.56, false)).toBe('1,235')
    expect(formatCurrency(0, false)).toBe('0')
    expect(formatCurrency(-1000, false)).toBe('-1,000')
  })

  // large numbers
  it('handles large numbers correctly', () => {
    expect(formatCurrency(1234567890.12)).toBe('$1,234,567,890')
  })

  // small decimal numbers
  it('handles small decimal numbers correctly', () => {
    expect(formatCurrency(0.01)).toBe('$0')
    expect(formatCurrency(0.99)).toBe('$1')
  })
})
