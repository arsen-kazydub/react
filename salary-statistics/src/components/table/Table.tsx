import * as React from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@app/store'
import { formatCurrency } from '@app/utils/formatCurrency'
import { getAverageSalary } from '@app/utils/getAverageSalary'
import { getSelectedYears } from '@app/utils/getSelectedYears'
import { getTotalSalary } from '@app/utils/getTotalSalary'
import { shortMonths } from '@app/utils/shortMonths'

export function Table() {
  const appAverage = useSelector((state: RootState) => state.app.average)
  const appYears = useSelector((state: RootState) => state.app.years)
  const appSalaries = useSelector((state: RootState) => state.app.salaries)

  const selectedYears = getSelectedYears(appYears)
  const { totalSalary, yearlyAverage, monthlyAverage } = getTotalSalary(selectedYears, appSalaries)

  return (
    <div id='chart-table'>
      <table>
        <thead>
          <tr>
            <th>#</th>
            {shortMonths.map((month, idx) => (
              <th key={idx}>{month}</th>
            ))}
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {selectedYears.map((year) => (
            <tr key={'year-' + year}>
              <td className='th' scope='row'>
                {year}
              </td>
              {appSalaries[year].map((monthlySalary, idx) => (
                <td key={idx}>
                  <div className='salary'>{formatCurrency(monthlySalary, false)}</div>
                  {appAverage && (
                    <div className='average'>
                      {formatCurrency(getAverageSalary(appSalaries, year, idx), false)}
                    </div>
                  )}
                </td>
              ))}
              <td className='th'>
                {formatCurrency(appSalaries[year].reduce((acc, val) => acc + val, 0))}
              </td>
            </tr>
          ))}
          <tr className='summary'>
            <td />
            <td colSpan={4}>Total earnings: {formatCurrency(totalSalary)}</td>
            <td colSpan={4}>Yearly average: {formatCurrency(yearlyAverage)}</td>
            <td colSpan={4}>Monthly average: {formatCurrency(monthlyAverage)}</td>
            <td />
          </tr>
        </tbody>
      </table>
    </div>
  )
}
