module.exports = {
  preset: 'jest-expo',
  transformIgnorePatterns: [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)",
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/types/**',
  ],
  setupFiles: ['<rootDir>/jest.setup.winter.js'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^expo$': '<rootDir>/__mocks__/expo.js',
    '^expo/src/winter/installGlobal$': '<rootDir>/__mocks__/expo_winter.js',
    '^expo/src/winter/runtime.native$': '<rootDir>/__mocks__/expo_winter.js',
    '^expo/src/winter/.*': '<rootDir>/__mocks__/expo_winter.js',
    '^react-native-worklets/plugin$': '<rootDir>/__mocks__/react-native-worklets-plugin.js',
  },

  // TODO: Increase thresholds as we add more tests
  // Target: branches 70, functions 75, lines 80, statements 80
  // Updated after adding HomeScreen and RouteSelectionScreen tests
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 65,
      lines: 65,
      statements: 65,
    },
  },
};
