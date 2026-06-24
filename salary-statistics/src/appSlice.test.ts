import { settings } from '@app/settings'
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
})
