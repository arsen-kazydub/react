import { settings } from '@app/settings'

export function setChartHeight(appType: string, appUnit: string, chartWrapperId: string) {
  // aspectRatio is 1 for doughnut and pie, 2 - for others
  const isComparisonType = appType === settings.type.values[2]
  const isYearUnit = appUnit === settings.unit.values[1]
  const aspectRatio = isComparisonType && isYearUnit ? 1 : 2

  const parentContainer = document.getElementById('content')
  if (!parentContainer) return

  const parent = parentContainer.children[0]
  const parentStyle = getComputedStyle(parent)

  const vPadding = parseFloat(parentStyle.paddingTop) + parseFloat(parentStyle.paddingBottom)
  const hPadding = parseFloat(parentStyle.paddingLeft) + parseFloat(parentStyle.paddingRight)

  const h1El = parent.querySelector('h1')
  const formEl = parent.querySelector('form')
  if (!h1El || !formEl) return

  const heading = parseFloat(getComputedStyle(h1El).height)
  const form = parseFloat(getComputedStyle(formEl).height)

  // init with minimum dimensions
  let chartHeight = 300
  let chartWidth = chartHeight * aspectRatio

  // get maximum dimensions
  const maxHeight = window.innerHeight - vPadding - heading - form
  const maxWidth = window.innerWidth - hPadding

  // expand if possible
  if (maxHeight > chartHeight) {
    // if the new width based on maxHeight fits within the maxWidth, set dimensions
    let newWidth = maxHeight * aspectRatio
    if (newWidth <= maxWidth) {
      chartWidth = newWidth
      chartHeight = maxHeight
    } else {
      // the new height based on maxWidth is guaranteed to be <= maxHeight at this point;
      // the condition is left just for the reference
      let newHeight = maxWidth / aspectRatio
      //if (newHeight <= maxHeight) {
      chartWidth = maxWidth
      chartHeight = newHeight
      //}
    }
  }

  const chartWrapper = document.getElementById(chartWrapperId)
  if (!chartWrapper) return

  chartWrapper.style.height = chartHeight + 'px'
  chartWrapper.style.width = chartWidth + 'px'
}
