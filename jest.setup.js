import '@testing-library/jest-native/extend-expect';

// Mock expo to avoid runtime import issues (expo winter) in Jest
jest.mock('expo', () => ({
  __esModule: true,
  registerRootComponent: jest.fn(),
  Constants: { expoVersion: '1.0.0' },
}));

// Explicitly mock Expo "winter" submodules that access runtime import-meta
// This prevents Jest from executing native runtime checks in CI
jest.mock('expo/src/winter/installGlobal', () => ({
  installGlobal: () => {},
  __ExpoImportMetaRegistry: {},
}));

jest.mock('expo/src/winter/runtime.native', () => ({}));


// Mock expo-haptics
jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: {
    Light: 'light',
    Medium: 'medium',
    Heavy: 'heavy',
  },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

// Mock expo-location
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
  watchPositionAsync: jest.fn(),
  Accuracy: {
    High: 4,
  },
}));

// Mock expo-blur
jest.mock('expo-blur', () => ({
  BlurView: 'BlurView',
}));

// Mock react-native-maps
jest.mock('react-native-maps', () => {
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: View,
    Marker: View,
    Polyline: View,
    PROVIDER_DEFAULT: 'default',
  };
});
