import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { settings } from '@app/settings'

interface AppState {
  type: string
  unit: string
  average: boolean
  years: Record<string, boolean>
  salaries: Record<string, number[]>
}

const initialState: AppState = {
  type: settings.type.values[0],
  unit: settings.unit.values[0],
  average: false,
  years: {},
  salaries: {},
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setType: (state, action: PayloadAction<string>) => {
      state.type = action.payload
    },
    setUnit: (state, action: PayloadAction<string>) => {
      state.unit = action.payload
    },
    setAverage: (state, action: PayloadAction<boolean>) => {
      state.average = action.payload
    },
    setYears: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.years = { ...state.years, ...action.payload }
    },
  },
})

export { AppState, initialState }
export const { setType, setUnit, setAverage, setYears } = appSlice.actions
export const appReducer = appSlice.reducer
