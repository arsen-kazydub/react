import * as Type from '@app/shared.types'
import { settings } from '@app/settings'
import { setType, setUnit, setAverage, setYears } from '@app/appSlice'
import { changeFilter, getFilterAction } from '@app/components/filters/changeFilter'

jest.mock('@app/appSlice', () => ({
  setType: jest.fn(),
  setUnit: jest.fn(),
  setAverage: jest.fn(),
  setYears: jest.fn(),
}))

// FUNCTION changeFilter
describe('changeFilter', () => {
  const dispatch = jest.fn()

  beforeEach(jest.clearAllMocks)

  // dispatch an action
  it('dispatches the action returned by getFilterAction', () => {
    const id = settings.type.id
    const value = settings.type.values[0]
    const selectEl = Object.assign(document.createElement('select'), { id, value })

    const mockSetType = setType as unknown as jest.Mock
    const fakeAction = { type: 'SET_TYPE', payload: value }
    mockSetType.mockReturnValue(fakeAction)

    const event = { target: selectEl } as unknown as Type.eChange
    changeFilter(event, dispatch)
    expect(dispatch).toHaveBeenCalledWith(setType(value))
  })

  // no dispatch
  it('does not dispatch anything if getFilterAction returns null', () => {
    const event = {} as Type.eChange
    changeFilter(event, dispatch)
    expect(dispatch).not.toHaveBeenCalled()
  })
})

// FUNCTION getFilterAction
describe('getFilterAction', () => {
  // setType
  it('returns setType action for select element with settings.type.id', () => {
    const id = settings.type.id
    const value = settings.type.values[0]
    const selectEl = Object.assign(document.createElement('select'), { id, value })
    const event = { target: selectEl } as unknown as Type.eChange
    const result = getFilterAction(event)
    expect(result).toEqual(setType(value))
  })

  // setUnit
  it('returns setUnit action for select element with settings.unit.id', () => {
    const id = settings.unit.id
    const value = settings.unit.values[0]
    const selectEl = Object.assign(document.createElement('select'), { id, value })
    const event = { target: selectEl } as unknown as Type.eChange
    const result = getFilterAction(event)
    expect(result).toEqual(setUnit(value))
  })

  // setAverage
  it('returns setAverage action for input element with settings.average.id', () => {
    const id = settings.average.id
    const checked = true
    const inputEl = Object.assign(document.createElement('input'), {
      type: 'checkbox',
      id,
      checked,
    })
    const event = { target: inputEl } as unknown as Type.eChange
    const result = getFilterAction(event)
    expect(result).toEqual(setAverage(checked))
  })

  // setYears
  it('returns setYears action for input element with settings.years.id', () => {
    const id = settings.years.id
    const checked = true
    const value = '2021'
    const inputEl = Object.assign(document.createElement('input'), {
      type: 'checkbox',
      checked,
      value,
    })
    // data-id must be added with setAttribute, otherwise the test will fail
    inputEl.setAttribute('data-id', id)
    const event = { target: inputEl } as unknown as Type.eChange
    const result = getFilterAction(event)
    expect(result).toEqual(setYears({ [inputEl.value]: inputEl.checked }))
  })

  // a select with unrelated id
  it('returns null for select with unrelated id', () => {
    const selectEl = Object.assign(document.createElement('select'), {
      id: 'unrelated-id',
      value: 'some-value',
    })
    const event = { target: selectEl } as unknown as Type.eChange
    const result = getFilterAction(event)
    expect(result).toBeNull()
  })

  // an input with unrelated data-id
  it('returns null for input with unrelated id and dataset.id', () => {
    const inputEl = Object.assign(document.createElement('input'), {
      id: 'wrong-id',
      value: 'some-value',
      checked: true,
    })
    // don't set data-id at all!
    const event = { target: inputEl } as unknown as Type.eChange
    const result = getFilterAction(event)
    expect(result).toBeNull()
  })

  // no action
  it('returns null for an element with no matching id or dataset.id', () => {
    const event = {} as Type.eChange
    const result = getFilterAction(event)
    expect(result).toBeNull()
  })
})
