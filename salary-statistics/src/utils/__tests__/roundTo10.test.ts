import { roundTo10 } from '@app/utils/roundTo10'

describe('roundTo10', () => {
  it('rounds to the nearest 10', () => {
    expect(roundTo10(12)).toBe(10)
    expect(roundTo10(15)).toBe(20)
    expect(roundTo10(18)).toBe(20)
  })

  it('handles negative numbers correctly', () => {
    expect(roundTo10(-12)).toBe(-10)
    expect(roundTo10(-15)).toBe(-10)
    expect(roundTo10(-18)).toBe(-20)
  })

  it('handles zero correctly', () => {
    expect(roundTo10(0)).toBe(0)
  })

  it('handles numbers already multiples of 10 correctly', () => {
    expect(roundTo10(10)).toBe(10)
    expect(roundTo10(20)).toBe(20)
    expect(roundTo10(30)).toBe(30)
  })

  it('handles floating-point numbers', () => {
    expect(roundTo10(12.3)).toBe(10)
    expect(roundTo10(17.8)).toBe(20)
  })

  it('handles very small numbers', () => {
    expect(roundTo10(1)).toBeCloseTo(0)
    expect(roundTo10(-1)).toBeCloseTo(0)
  })
})
