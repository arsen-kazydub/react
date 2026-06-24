import { configureStore } from '@reduxjs/toolkit'

import { appReducer, initialState } from '@app/appSlice'
import { initialYearsState } from '@app/utils/initialYearsState'

// load initial data
const app = document.getElementById('salary') as HTMLElement
const data = app.dataset.salaries || ''
let salaries: Record<string, number[]> = {}

try {
  salaries = JSON.parse(data)
} catch (error) {}

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  preloadedState: {
    app: {
      type: initialState.type,
      unit: initialState.unit,
      average: initialState.average,
      years: initialYearsState(salaries),
      salaries: salaries,
    },
  },
})

// store types
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
