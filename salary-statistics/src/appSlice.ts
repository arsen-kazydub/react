import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { settings } from '@app/settings'
import { fetchSalaries } from '@app/appThunks'
import { initialYearsState } from '@app/utils/initialYearsState'

interface AppState {
  type: string
  unit: string
  average: boolean
  years: Record<string, boolean>
  salaries: Record<string, number[]>
  status: 'loading' | 'error' | 'success'
  errorMessage: string | null
}

const initialState: AppState = {
  type: settings.type.values[0],
  unit: settings.unit.values[0],
  average: false,
  years: {},
  salaries: {},
  status: 'loading',
  errorMessage: null,
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
  extraReducers: (builder) => {
    builder
      .addCase(fetchSalaries.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSalaries.rejected, (state, action) => {
        state.status = 'error'
        state.errorMessage = action.error.message || 'Unknown error'
      })
      .addCase(fetchSalaries.fulfilled, (state, action) => {
        state.status = 'success'
        state.salaries = action.payload
        state.years = initialYearsState(action.payload)
      })
  },
})

export { AppState, initialState }
export const { setType, setUnit, setAverage, setYears } = appSlice.actions
export const appReducer = appSlice.reducer
