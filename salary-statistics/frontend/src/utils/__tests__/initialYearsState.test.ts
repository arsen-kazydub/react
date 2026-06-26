import { initialYearsState } from '@app/utils/initialYearsState'

describe('initialYearsState', () => {
  // no years
  it('returns an empty object when salaries is empty', () => {
    expect(initialYearsState({})).toEqual({})
  })

  // single year
  it('returns an object with a single year set to true', () => {
    const salaries = { '2023': [1000, 2000, 3000] }
    expect(initialYearsState(salaries)).toEqual({ '2023': true })
  })

  // multiple years
  it('returns an object with multiple years, where the last year is true', () => {
    const salaries = {
      '2021': [1000, 2000],
      '2022': [3000, 4000],
      '2023': [5000, 6000],
    }
    expect(initialYearsState(salaries)).toEqual({
      '2021': false,
      '2022': false,
      '2023': true,
    })
  })
})
