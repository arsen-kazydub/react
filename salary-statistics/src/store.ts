import { configureStore } from '@reduxjs/toolkit'

import { appReducer, initialState } from '@app/appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer,
  },
  preloadedState: {
    app: initialState,
  },
})

// store types
export type AppStore = typeof store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
