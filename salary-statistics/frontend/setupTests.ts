import '@testing-library/jest-dom'
import 'jest-canvas-mock'

// Mock ResizeObserver
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
