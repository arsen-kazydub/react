import { getAverageSalary } from '@app/utils/getAverageSalary'

describe('getAverageSalary', () => {
  const year0 = 2021
  const year1 = 2022

  const salaries = {
    [year0]: [5200, 2500, 2200, 3600, 5400, 3700, 3300, 4400, 3200, 4700, 5600, 5400], // 49 200
    [year1]: [4000, 3400, 3200, 5200, 2000, 3200, 5000, 4800, 4300, 4600, 4800, 3200], // 47 700
  }

  it('returns the average salary for the last 12 months', () => {
    expect(getAverageSalary(salaries, year0, 5)).toBe(1880)
    expect(getAverageSalary(salaries, year0, 11)).toBe(4100)
    expect(getAverageSalary(salaries, year1, 5)).toBe(3970)
    expect(getAverageSalary(salaries, year1, 11)).toBe(3980)
  })
})
