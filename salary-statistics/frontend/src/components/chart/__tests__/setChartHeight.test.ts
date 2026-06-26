import { settings } from '@app/settings'
import { setChartHeight } from '@app/components/chart/setChartHeight'

describe('setChartHeight', () => {
  const chartWrapperId = 'graphic-chart-wrapper'

  let parentContainer: HTMLDivElement,
    parentEl: HTMLDivElement,
    h1El: HTMLHeadingElement,
    formEl: HTMLFormElement,
    chartWrapper: HTMLDivElement

  // fixed width and height for testing
  function setWindowWidth(width: number) {
    Object.defineProperty(window, 'innerWidth', { value: width, writable: true })
  }
  function setWindowHeight(height: number) {
    Object.defineProperty(window, 'innerHeight', { value: height, writable: true })
  }

  // set up the DOM structure
  beforeEach(() => {
    parentContainer = document.createElement('div')
    parentContainer.id = 'content'
    document.body.appendChild(parentContainer)

    parentEl = document.createElement('div')
    parentContainer.appendChild(parentEl)

    h1El = document.createElement('h1')
    parentEl.appendChild(h1El)

    formEl = document.createElement('form')
    parentEl.appendChild(formEl)

    chartWrapper = document.createElement('div')
    chartWrapper.id = chartWrapperId
    parentEl.appendChild(chartWrapper)

    // Mock `getComputedStyle` to return custom padding and dimensions
    window.getComputedStyle = jest.fn((element: Element) => {
      let props: Partial<CSSStyleDeclaration> = {}
      // for `h1` element
      if (element === h1El) {
        props = { height: '50px' }
      }
      // for `form` element
      else if (element === formEl) {
        props = { height: '100px' }
      }
      // default (for parent container)
      props = {
        paddingTop: '10px',
        paddingBottom: '10px',
        paddingLeft: '15px',
        paddingRight: '15px',
        height: '100px',
      }
      return { ...props } as CSSStyleDeclaration
    })
  })

  // clean up the DOM after each test
  afterEach(() => {
    document.body.innerHTML = ''
  })

  // rectangle chart (default)
  it('sets chart dimensions to 2:1 ratio on wide screens for non-square types', () => {
    setWindowWidth(1920)
    setWindowHeight(1080)
    const chartWrapper = document.getElementById(chartWrapperId)
    setChartHeight(settings.type.values[1], settings.unit.values[0], chartWrapperId)
    expect(chartWrapper!.style.width).toBe('1720px')
    expect(chartWrapper!.style.height).toBe('860px')
  })

  // square chart
  it('sets chart dimensions to 1:1 ratio for doughnut and pie types', () => {
    setWindowWidth(1920)
    setWindowHeight(1080)
    const chartWrapper = document.getElementById(chartWrapperId)
    setChartHeight(settings.type.values[2], settings.unit.values[1], chartWrapperId)
    expect(chartWrapper!.style.width).toBe('860px')
    expect(chartWrapper!.style.height).toBe('860px')
  })

  // rectangle chart on narrow screen
  it('limits width and sets 2:1 ratio on narrow screens for non-square types', () => {
    setWindowWidth(800)
    setWindowHeight(1080)
    const chartWrapper = document.getElementById(chartWrapperId)
    setChartHeight(settings.type.values[1], settings.unit.values[0], chartWrapperId)
    expect(chartWrapper!.style.width).toBe('770px')
    expect(chartWrapper!.style.height).toBe('385px')
  })

  // no expansion of the chart
  it('does not expand chart if available height is less than minimum', () => {
    setWindowWidth(1920)
    setWindowHeight(300)
    const chartWrapper = document.getElementById(chartWrapperId)
    setChartHeight(settings.type.values[1], settings.unit.values[0], chartWrapperId)
    expect(chartWrapper!.style.width).toBe('600px')
    expect(chartWrapper!.style.height).toBe('300px')
  })

  // early return #1
  it('returns early if `parentContainer` is not found', () => {
    parentContainer.remove()
    setChartHeight(settings.type.values[1], settings.unit.values[0], chartWrapperId)
  })

  // early return #2
  it('returns early if `formEl` is not found', () => {
    formEl.remove()
    setChartHeight(settings.type.values[1], settings.unit.values[0], chartWrapperId)
  })

  // early return #3
  it('returns early if `chartWrapper` is not found', () => {
    chartWrapper.remove()
    setChartHeight(settings.type.values[1], settings.unit.values[0], chartWrapperId)
  })
})
