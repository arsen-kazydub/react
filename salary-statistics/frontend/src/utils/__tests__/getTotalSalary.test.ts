import { getTotalSalary } from '@app/utils/getTotalSalary'

describe('getTotalSalary', () => {
  const oDate = new Date()
  const year2 = oDate.getFullYear()
  const year1 = year2 - 1
  const year0 = year1 - 1
  const curMonth = oDate.getMonth()

  const salaries = {
    [year0]: [5200, 2500, 2200, 3600, 5400, 3700, 3300, 4400, 3200, 4700, 5600, 5400], // 49 200
    [year1]: [4000, 3400, 3200, 5200, 2000, 3200, 5000, 4800, 4300, 4600, 4800, 3200], // 47 700
    [year2]: [3000, 3800, 5600, 4300, 4800, 2500, 5000, 3200, 4600, 4000, 5400, 4700].filter(
      (_v, i) => i <= curMonth,
    ),
  }

  // no years
  it('returns 0 when all years are not selected', () => {
    expect(getTotalSalary([], salaries)).toStrictEqual({
      totalSalary: 0,
      yearlyAverage: 0,
      monthlyAverage: 0,
    })
  })

  // single year
  it('calculates values for a single year', () => {
    expect(getTotalSalary([year0], salaries)).toStrictEqual({
      totalSalary: 49200,
      yearlyAverage: 49200,
      monthlyAverage: 4100,
    })
  })

  // multiple years
  it('calculates values for multiple years', () => {
    expect(getTotalSalary([year0, year1], salaries)).toStrictEqual({
      totalSalary: 96900,
      yearlyAverage: 48450,
      monthlyAverage: 4040,
    })
  })

  // current year
  it('calculates values for the current year', () => {
    const totalSalary = salaries[year2].reduce((acc, val) => acc + val, 0)
    const monthlyAverage = Math.round(totalSalary / (curMonth + 1) / 10) * 10
    expect(getTotalSalary([year2], salaries)).toStrictEqual({
      totalSalary: totalSalary,
      yearlyAverage: totalSalary,
      monthlyAverage: monthlyAverage,
    })
  })

  // multiple years + current year
  it('calculates values for multiple years including current year', () => {
    const totalCurYearSalary = salaries[year2].reduce((acc, val) => acc + val, 0)
    const totalSalary = 49200 + totalCurYearSalary
    const monthlyAverage = Math.round(totalSalary / (12 + curMonth + 1) / 10) * 10
    expect(getTotalSalary([year0, year2], salaries)).toStrictEqual({
      totalSalary: totalSalary,
      yearlyAverage: totalSalary / 2,
      monthlyAverage: monthlyAverage,
    })
  })
})
