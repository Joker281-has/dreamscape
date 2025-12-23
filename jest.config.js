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
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^expo$': '<rootDir>/__mocks__/expo.js',
    '^expo/src/winter/.*': '<rootDir>/__mocks__/expo_winter.js',
    '^react-native-worklets/plugin$': '<rootDir>/__mocks__/react-native-worklets-plugin.js',
  },
};
