import * as React from 'react'
import { useEffect } from 'react'
import ChartJS from 'chart.js/auto'
import { useSelector } from 'react-redux'

import { RootState } from '@app/store'
import { getSelectedYears } from '@app/utils/getSelectedYears'
import { getTotalSalary } from '@app/utils/getTotalSalary'

import { setChartHeight } from '@app/components/chart/setChartHeight'
import { settings } from '@app/settings'
import { shortMonths } from '@app/utils/shortMonths'
import { getAverageSalary } from '@app/utils/getAverageSalary'
import { getChartColor } from '@app/components/chart/getChartColor'
import { formatCurrency } from '@app/utils/formatCurrency'
import { formatTooltipLabel } from '@app/components/chart/formatTooltipLabel'

export function Chart() {
  const chartWrapperId = 'graphic-chart-wrapper'
  const chartId = 'graphic-chart'
  const borderWidth = 3

  const appType = useSelector((state: RootState) => state.app.type)
  const appUnit = useSelector((state: RootState) => state.app.unit)
  const appAverage = useSelector((state: RootState) => state.app.average)
  const appYears = useSelector((state: RootState) => state.app.years)
  const appSalaries = useSelector((state: RootState) => state.app.salaries)

  const selectedYears = getSelectedYears(appYears)
  const { totalSalary } = getTotalSalary(selectedYears, appSalaries)

  let resizeTimer: ReturnType<typeof setTimeout>

  ChartJS.defaults.font = { size: 12, family: 'Roboto, Arial, sans-serif' }
  ChartJS.defaults.color = '#555'
  ChartJS.defaults.elements.line.borderWidth = borderWidth
  ChartJS.defaults.elements.line.fill = 'origin'

  // display chart after the component mounts
  useEffect(() => {
    // set height BEFORE creating the chart, otherwise the first animation will not be shown
    setChartHeight(appType, appUnit, chartWrapperId)
    const myChart = createChart()
    window.addEventListener('resize', windowResize)
    return () => {
      myChart?.destroy()
      window.removeEventListener('resize', windowResize)
    }
  }, [appType, appUnit, appAverage, appYears])

  function windowResize() {
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(() => setChartHeight(appType, appUnit, chartWrapperId), 100)
  }

  function createChart() {
    let chartType: 'line' | 'bar' | 'pie' | 'doughnut' = 'line' // default value
    let axisLabels: (string | number)[] = []
    let datasets: {
      label: string
      data: number[]
      borderColor?: string
      backgroundColor: string | string[]
    }[] = []

    const chartCanvas = document.getElementById(chartId) as HTMLCanvasElement
    if (!chartCanvas) return

    // Month unit
    if (appUnit === settings.unit.values[0]) {
      chartType = 'line'

      // Timeline type
      if (appType === settings.type.values[1]) {
        let dataMonthly: number[] = []
        let dataAverage: number[] = []

        selectedYears.map((year) => {
          appSalaries[year].map((monthlySalary, monthIdx) => {
            axisLabels.push(shortMonths[monthIdx] + " '" + (year + '').substring(2))
            dataMonthly.push(monthlySalary)
            if (appAverage) {
              let averageSalary = getAverageSalary(appSalaries, year, monthIdx)
              dataAverage.push(averageSalary)
            }
          })
        })

        datasets.push({
          label: 'Monthly Salary',
          data: dataMonthly,
          borderColor: getChartColor(0),
          backgroundColor: getChartColor(0, false),
        })

        if (appAverage) {
          datasets.push({
            label: 'Average Salary',
            data: dataAverage,
            borderColor: getChartColor(1),
            backgroundColor: getChartColor(1, false),
          })
        }
      }

      // Comparison type
      else if (appType === settings.type.values[2]) {
        axisLabels = shortMonths
        selectedYears.map((year, idx) => {
          datasets.push({
            label: year.toString(),
            data: appSalaries[year],
            borderColor: getChartColor(idx),
            backgroundColor: getChartColor(idx, false),
          })
        })
      }
    }

    // Year unit (for both Timeline and Comparison types)
    // (full condition was shortened for the test coverage)
    // else if (appUnit === settings.unit.values[1]) {
    else {
      let dataBgColor: string | string[] = ''

      switch (appType) {
        case settings.type.values[1]:
          chartType = 'bar'
          dataBgColor = getChartColor(0)
          break

        case settings.type.values[2]:
          chartType = 'pie'
          dataBgColor = selectedYears.map((_el, idx) => getChartColor(idx))
          break
      }

      axisLabels = selectedYears

      const dataYearly = selectedYears.map((year) => {
        return appSalaries[year].reduce((acc, val) => acc + val, 0)
      })

      datasets.push({
        label: 'Yearly Salary',
        data: dataYearly,
        backgroundColor: dataBgColor,
      })
    }

    return new ChartJS(chartCanvas, {
      type: chartType,
      data: {
        labels: axisLabels,
        datasets: datasets,
      },
      options: {
        scales:
          // to use doughnut chart, add: || chartType === 'doughnut'
          chartType === 'pie'
            ? undefined
            : {
                y: {
                  beginAtZero: true,
                  ticks: {
                    callback: (value) => formatCurrency(value as number),
                  },
                },
              },
        plugins: {
          tooltip: {
            callbacks: {
              label: (TooltipItem) => formatTooltipLabel(TooltipItem, chartType, totalSalary),
            },
          },
        },
      },
    })
  }

  return (
    <div id={chartWrapperId} aria-hidden='true'>
      <canvas id={chartId} data-testid='test-chart'></canvas>
    </div>
  )
}
