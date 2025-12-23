// Early setup to mock Expo "winter" internals before any modules load in Jest
// This runs before tests and before the environment is set up, preventing
// runtime import-meta checks from executing within node_modules/expo.

jest.mock('expo/src/winter/installGlobal', () => ({
  installGlobal: () => {},
  __ExpoImportMetaRegistry: {},
}));

jest.mock('expo/src/winter/runtime.native', () => ({}));

jest.mock('expo/src/winter/runtime', () => ({}));
