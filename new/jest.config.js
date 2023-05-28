module.exports = {
  moduleNameMapper: {
    '^@/(.*)': '<rootDir>/src/$1',
    '^.+\\.scss$': '<rootDir>/configs/scssModules.js'
  },
  transform: {
    '\\.tsx?$': ['babel-jest', { configFile: './configs/jest.babel.config.js' }]
  },
  setupFilesAfterEnv: ['<rootDir>/configs/jestSetup.ts'],
  testEnvironment: 'jsdom',
}
