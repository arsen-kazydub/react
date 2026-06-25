import { createAsyncThunk } from '@reduxjs/toolkit'

import { config } from '@app/config'

export const fetchSalaries = createAsyncThunk('app/fetchSalaries', async () => {
  const url = new URL(config.salariesUrl)

  const params = new URLSearchParams(window.location.search)
  const token = params.get('token')

  if (token) {
    url.searchParams.append('token', token)
  }

  const res = await fetch(url.toString())

  if (!res.ok) {
    throw new Error('Failed to load salaries')
  }

  return res.json()
})
