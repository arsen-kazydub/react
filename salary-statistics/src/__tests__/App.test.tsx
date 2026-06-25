import React from 'react'
import { screen } from '@testing-library/react'
import { renderComponent } from '@app/test-utils/renderComponent'

import { settings } from '@app/settings'
import { App } from '@app/App'

const appEl = <App />

describe('App', () => {
  it('renders loader while data is loading', () => {
    renderComponent(appEl, { status: 'loading' })
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('renders error message when request fails', () => {
    renderComponent(appEl, { status: 'error', errorMessage: 'Failed to load salaries' })
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText('Error: Failed to load salaries')).toBeInTheDocument()
  })

  it('renders App with Filters and Table when request succeeds', () => {
    renderComponent(appEl, { status: 'success' })
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
  })

  it('renders App with Filters and Chart when request succeeds and Type is not default', () => {
    renderComponent(appEl, { status: 'success', type: settings.type.values[1] })
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByTestId('test-chart')).toBeInTheDocument()
  })
})
