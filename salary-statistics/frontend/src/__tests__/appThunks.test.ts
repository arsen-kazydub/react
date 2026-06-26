import { config } from '@app/config'

import { fetchSalaries } from '@app/appThunks'

globalThis.fetch = jest.fn()

describe('appThunks', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'location', {
      value: { search: '' },
    })
    jest.clearAllMocks()
  })

  // successful request without token
  it('fetches salaries successfully without token', async () => {
    ;(globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ 2023: [100, 200] }),
    })

    const result = await fetchSalaries()(jest.fn(), jest.fn(), undefined)

    expect(globalThis.fetch).toHaveBeenCalledWith(config.salariesUrl)
    expect(result.type).toBe('app/fetchSalaries/fulfilled')
    expect(result.payload).toEqual({ 2023: [100, 200] })
  })

  // adding token to the URL (without sending the request)
  it('adds token when present in URL', async () => {
    window.location.search = '?token=abc123'
    ;(globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    })

    await fetchSalaries()(jest.fn(), jest.fn(), undefined)

    expect(globalThis.fetch).toHaveBeenCalledWith(config.salariesUrl + '?token=abc123')
  })

  // wrong request
  it('throws error when response is not ok', async () => {
    ;(globalThis.fetch as jest.Mock).mockResolvedValue({
      ok: false,
    })

    const result = await fetchSalaries()(jest.fn(), jest.fn(), undefined)

    expect(result.type).toBe('app/fetchSalaries/rejected')
    expect(result.payload).toBeUndefined()
  })
})
