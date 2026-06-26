import React from 'react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'

import { settings } from '@app/settings'
import { appReducer, AppState } from '@app/appSlice'

const testState: AppState = {
  type: settings.type.values[0],
  unit: settings.unit.values[0],
  average: false,
  years: { '2023': true },
  salaries: {
    '2023': [1000, 1100, 1200, 1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000, 2100],
  },
  status: 'success',
  errorMessage: null,
}

export function renderComponent(component: React.ReactElement, options?: Partial<AppState>) {
  const state: AppState = { ...testState, ...options }
  const store = configureStore({
    reducer: { app: appReducer },
    preloadedState: { app: state },
  })
  store.dispatch = jest.fn()
  render(<Provider store={store}>{component}</Provider>)
  return store
}
