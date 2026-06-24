module.exports = {
  testEnvironment: 'jsdom',
  clearMocks: true,
  testMatch: ['**/?(*.)+(test|integration).[tj]s?(x)'],
  transform: { '^.+\\.(ts|tsx|js|jsx)$': 'babel-jest' },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // resolve @app alias
    '^@app/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['jest-canvas-mock'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
}
