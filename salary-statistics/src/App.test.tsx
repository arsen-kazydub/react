import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from '@app/test-utils/renderComponent'

import { settings } from '@app/settings'
import { App } from '@app/App'

const appEl = <App />

describe('App', () => {
  it('renders App with filtering options', () => {
    renderComponent(appEl)
    expect(screen.getByRole('heading', { name: /salary statistics/i })).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
  })

  it('renders Table when Type is default', () => {
    renderComponent(appEl)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders Chart when Type is different', () => {
    renderComponent(appEl, { type: settings.type.values[1] })
    expect(screen.getByTestId('test-chart')).toBeInTheDocument()
  })
})
