import { roundTo10 } from '@app/utils/roundTo10'

export function getTotalSalary(
  selectedYears: number[],
  salaries: Record<string, number[]>,
  date: Date = new Date(),
) {
  const curYear = date.getFullYear()
  let nYears = 0
  let nMonths = 0
  let nTotal = 0

  selectedYears.forEach((year) => {
    const isCurYear = year === curYear
    nYears++
    nMonths += isCurYear ? date.getMonth() + 1 : 12
    nTotal += salaries[year].reduce((acc, val) => acc + val, 0)
  })

  const yearlyAverage = roundTo10(nTotal / nYears) || 0
  const monthlyAverage = roundTo10(nTotal / nMonths) || 0

  return {
    totalSalary: nTotal || 0,
    yearlyAverage: yearlyAverage || 0,
    monthlyAverage: monthlyAverage || 0,
  }
}
