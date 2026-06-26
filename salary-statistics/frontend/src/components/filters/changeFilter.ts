import { Dispatch } from 'redux'

import * as Type from '@app/shared.types'
import { settings } from '@app/settings'
import { setType, setUnit, setAverage, setYears } from '@app/appSlice'

export function changeFilter(e: Type.eChange, dispatch: Dispatch) {
  const action = getFilterAction(e)
  if (action) dispatch(action)
}

export function getFilterAction(e: Type.eChange) {
  const el = e.target

  if (el instanceof HTMLSelectElement) {
    if (el.id === settings.type.id) {
      return setType(el.value)
    } else if (el.id === settings.unit.id) {
      return setUnit(el.value)
    }
  } else if (el instanceof HTMLInputElement) {
    if (el.id === settings.average.id) {
      return setAverage(el.checked)
    } else if (el.dataset.id === settings.years.id) {
      return setYears({ [el.value]: el.checked })
    }
  }

  return null
}
