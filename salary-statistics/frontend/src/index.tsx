import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { store } from '@app/store'
import { App } from '@app/App'

const app = document.getElementById('salary') as HTMLElement
const root = createRoot(app)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
