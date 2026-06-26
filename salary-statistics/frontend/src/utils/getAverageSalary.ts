/**
 * Calculate average salary for the last 12 months.
 * @param {number} curYear - Current year (the year containing required month).
 * @param {number} monthIdx - Month index (0 based) of the required month.
 * @return {number}
 */

import { roundTo10 } from '@app/utils/roundTo10'

export function getAverageSalary(
  salaries: Record<string, number[]>,
  curYear: number,
  monthIdx: number,
) {
  const prevYear = curYear - 1
  let sum = 0

  // for {curYear} show only past months
  salaries[curYear].forEach((val, idx) => {
    if (idx <= monthIdx) sum += val
  })

  // get the rest from the previous year
  if (salaries[prevYear]) {
    salaries[prevYear].forEach((val, idx) => {
      if (idx > monthIdx) sum += val
    })
  }

  return roundTo10(sum / 12)
}
