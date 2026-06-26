import { settings } from '@app/settings'
import { fetchSalaries } from '@app/appThunks'
import { appReducer, initialState, setType, setUnit, setAverage, setYears } from '@app/appSlice'

describe('appReducer', () => {
  it('sets type', () => {
    const nextState = appReducer(initialState, setType(settings.type.values[1]))
    expect(nextState.type).toBe(settings.type.values[1])
  })

  it('sets unit', () => {
    const nextState = appReducer(initialState, setUnit(settings.unit.values[1]))
    expect(nextState.unit).toBe(settings.unit.values[1])
  })

  it('sets average', () => {
    const nextState = appReducer(initialState, setAverage(true))
    expect(nextState.average).toBe(true)
  })

  it('merges single year into state', () => {
    const nextState = appReducer(initialState, setYears({ '2021': true }))
    expect(nextState.years).toEqual({ '2021': true })
  })

  it('merges multiple years without overwriting existing ones', () => {
    const state1 = appReducer(initialState, setYears({ '2021': true }))
    const state2 = appReducer(state1, setYears({ '2022': false }))
    expect(state2.years).toEqual({ '2021': true, '2022': false })
  })

  it('sets loading status while salaries are loading', () => {
    const nextState = appReducer(initialState, { type: fetchSalaries.pending.type })
    expect(nextState.status).toBe('loading')
  })

  it('sets error status and message when salaries request fails', () => {
    const nextState = appReducer(initialState, {
      type: fetchSalaries.rejected.type,
      error: { message: 'Failed to load salaries' },
    })
    expect(nextState.status).toBe('error')
    expect(nextState.errorMessage).toBe('Failed to load salaries')
  })

  it('uses fallback error message when none is provided', () => {
    const nextState = appReducer(initialState, {
      type: fetchSalaries.rejected.type,
      error: {},
    })
    expect(nextState.status).toBe('error')
    expect(nextState.errorMessage).toBe('Unknown error')
  })

  it('stores salaries and initializes years after successful request', () => {
    const salaries = {
      '2023': [100, 200],
      '2024': [300, 400],
    }
    const nextState = appReducer(initialState, {
      type: fetchSalaries.fulfilled.type,
      payload: salaries,
    })
    expect(nextState.status).toBe('success')
    expect(nextState.salaries).toEqual(salaries)
    expect(nextState.years).toEqual({
      '2023': false,
      '2024': true,
    })
  })
})
