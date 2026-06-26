import * as Type from '@app/shared.types'
import { toggleAllYears } from '@app/components/filters/toggleAllYears'
import { setYears } from '@app/appSlice'

jest.mock('@app/appSlice', () => ({
  setYears: jest.fn(),
}))

// FUNCTION toggleAllYears
describe('toggleAllYears', () => {
  const dispatch = jest.fn()

  beforeEach(jest.clearAllMocks)

  // dispatch
  it('dispatches setYears with all values set to true', () => {
    const initialYears = {
      '2021': false,
      '2022': false,
      '2023': false,
    }
    const expectedYears = {
      '2021': true,
      '2022': true,
      '2023': true,
    }
    const inputEl = Object.assign(document.createElement('input'), {
      type: 'checkbox',
      checked: true,
    })
    const event = { target: inputEl } as unknown as Type.eChange
    toggleAllYears(event, dispatch, initialYears)
    expect(dispatch).toHaveBeenCalledWith(setYears(expectedYears))
  })

  // no dispatch
  it('does not dispatch anything if target is not an input element', () => {
    const event = {} as Type.eChange
    toggleAllYears(event, dispatch, { '2021': true })
    expect(dispatch).not.toHaveBeenCalled()
  })
})
