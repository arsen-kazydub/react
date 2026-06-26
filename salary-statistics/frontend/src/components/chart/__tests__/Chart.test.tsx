import React from 'react'
import ChartJS from 'chart.js/auto'
import { screen } from '@testing-library/react'

import { settings } from '@app/settings'
import { renderComponent } from '@app/test-utils/renderComponent'
import { Chart } from '@app/components/chart/Chart'
import { setChartHeight } from '@app/components/chart/setChartHeight'

jest.mock('@app/components/chart/setChartHeight', () => ({
  setChartHeight: jest.fn(),
}))

const chartEl = <Chart />
const testId = 'test-chart'

// TEST
describe('Chart', () => {
  // timeline - month
  it('renders Timeline chart with Month units', () => {
    renderComponent(chartEl, { type: settings.type.values[1] })
    const canvas = screen.getByTestId(testId)
    expect(canvas).toBeInTheDocument()
    // additionally, check the presence of canvas element
    expect(canvas.nodeName).toBe('CANVAS')
  })

  // timeline - month with average
  it('renders Timeline chart with Month units and Average checkbox checked', () => {
    renderComponent(chartEl, { type: settings.type.values[1], average: true })
    const canvas = screen.getByTestId(testId)
    expect(canvas).toBeInTheDocument()
  })

  // timeline - year
  it('renders Timeline chart with Year units', () => {
    renderComponent(chartEl, { type: settings.type.values[1], unit: settings.unit.values[1] })
    //const canvas = screen.getByTestId(testId)
    const canvas = screen.getByTestId(testId) as HTMLCanvasElement
    const chartInstance = ChartJS.getChart(canvas)
    expect(canvas).toBeInTheDocument()
    expect((chartInstance?.config as { type: string }).type).toBe('bar')
  })

  // comparison - month
  it('renders Comparison chart with Month units', () => {
    renderComponent(chartEl, { type: settings.type.values[2] })
    const canvas = screen.getByTestId(testId)
    expect(canvas).toBeInTheDocument()
  })

  // comparison - year
  it('renders Comparison chart with Year units', () => {
    renderComponent(chartEl, { type: settings.type.values[2], unit: settings.unit.values[1] })
    const canvas = screen.getByTestId(testId) as HTMLCanvasElement
    const chartInstance = ChartJS.getChart(canvas)
    expect(canvas).toBeInTheDocument()
    expect((chartInstance?.config as { type: string }).type).toBe('pie')
  })

  // window resize
  it('changes the chart height on window resize', () => {
    jest.useFakeTimers()
    renderComponent(chartEl)
    window.dispatchEvent(new Event('resize'))
    jest.advanceTimersByTime(100)
    expect(setChartHeight).toHaveBeenCalled()
    jest.useRealTimers()
  })

  // label (tooltip)
  it('calls formatTooltipLabel when tooltip is triggered', async () => {
    renderComponent(chartEl, { type: settings.type.values[1] })
    const canvas = screen.getByTestId(testId) as HTMLCanvasElement

    const chartInstance = ChartJS.getChart(canvas)
    if (!chartInstance) throw new Error('Chart instance not found')

    // access the tooltip callback manually
    const tooltipLabelCallback = chartInstance.options.plugins?.tooltip?.callbacks?.label
    expect(tooltipLabelCallback).toBeDefined()

    const fakeThis = {
      opacity: 1,
      dataPoints: [],
      title: [],
      body: [],
    } as any

    const fakeTooltipItem = {
      datasetIndex: 0,
      dataIndex: 0,
      label: 'Jan 2024',
      raw: 5000,
      parsed: 5000,
    } as any

    // call the label formatter manually
    const label = tooltipLabelCallback!.call(fakeThis, fakeTooltipItem)

    // it should return something meaningful
    expect(label).toBeDefined()
    expect(label).toContain('$')
    expect(typeof label).toBe('string')
  })

  // no canvas found
  it('does not create a chart if canvas is missing', () => {
    const spy = jest.spyOn(document, 'getElementById')
    spy.mockReturnValueOnce(null)

    renderComponent(chartEl, { type: settings.type.values[1] })
    const canvas = screen.getByTestId(testId) as HTMLCanvasElement
    const chartInstance = ChartJS.getChart(canvas)
    expect(chartInstance).toBeUndefined() // no chart should be created

    spy.mockRestore()
  })
})
