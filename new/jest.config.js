module.exports = {
  moduleNameMapper: {
    '^.+\\.scss$': '<rootDir>/configs/scssModules.js'
  },
  transform: {
    '\\.tsx?$': ['babel-jest'],
  },
  setupFilesAfterEnv: ['<rootDir>/configs/jestSetup.ts'],
  testEnvironment: 'jsdom',
}
