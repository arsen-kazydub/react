import { Dispatch } from 'redux'

import * as Type from '@app/shared.types'
import { setYears } from '@app/appSlice'

export function toggleAllYears(
  e: Type.eChange,
  dispatch: Dispatch,
  stateYears: Record<string, boolean>,
) {
  const el = e.target
  if (el instanceof HTMLInputElement) {
    let allYears: Record<string, boolean> = {}
    Object.keys(stateYears).forEach((v) => {
      allYears[v] = el.checked
    })
    dispatch(setYears(allYears))
  }
}
