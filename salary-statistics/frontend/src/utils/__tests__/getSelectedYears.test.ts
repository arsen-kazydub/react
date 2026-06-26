import { getSelectedYears } from '@app/utils/getSelectedYears'

describe('getSelectedYears', () => {
  const year0 = 2021
  const year1 = 2022
  const year2 = 2023

  // no years
  it('returns an empty array', () => {
    const years = {
      [year0]: false,
      [year1]: false,
      [year2]: false,
    }
    expect(getSelectedYears(years)).toEqual([])
  })

  // first year
  it('returns the first year', () => {
    const years = {
      [year0]: true,
      [year1]: false,
      [year2]: false,
    }
    expect(getSelectedYears(years)).toEqual([year0])
  })

  // first and last years
  it('returns the first and the last years', () => {
    const years = {
      [year0]: true,
      [year1]: false,
      [year2]: true,
    }
    expect(getSelectedYears(years)).toEqual([year0, year2])
  })

  // all years
  it('returns all years', () => {
    const years = {
      [year0]: true,
      [year1]: true,
      [year2]: true,
    }
    expect(getSelectedYears(years)).toEqual([year0, year1, year2])
  })
})
