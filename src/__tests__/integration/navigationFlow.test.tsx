// @ts-nocheck
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import RootNavigator from '../../navigation/RootNavigator';
import { LocationService } from '../../services/locationService';
import { Animated } from 'react-native';

jest.mock('../../services/locationService', () => ({
  LocationService: {
    requestPermissions: jest.fn().mockResolvedValue(true),
    getCurrentLocation: jest.fn().mockResolvedValue({ coords: { latitude: 37.78825, longitude: -122.4324 } }),
  },
}));

jest.mock('expo-haptics', () => ({
  impactAsync: jest.fn(),
  notificationAsync: jest.fn(),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium' },
  NotificationFeedbackType: { Warning: 'warning' },
}));

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(Animated, 'timing').mockImplementation(() => ({ start: (cb) => { if (cb) cb({ finished: true }); } }));
});

afterEach(() => {
  jest.useRealTimers();
  (Animated.timing as jest.Mock).mockRestore?.();
  jest.resetAllMocks();
});

test('full navigation flow from Home -> RouteSelection -> Navigation -> End', async () => {
  const utils = render(<RootNavigator />);
  const { findByTestId, queryByText, getByAccessibilityLabel, getByLabelText } = utils;
  const getByA11yLabel = (label: string) => (getByAccessibilityLabel ? getByAccessibilityLabel(label) : getByLabelText(label));

  // Wait for Home loading to finish
  await waitFor(() => expect(queryByText('Getting your location...')).toBeNull());

  const searchButton = getByA11yLabel('Search for destination');
  fireEvent.press(searchButton);

  // Advance timers to allow RouteSelection to finish calculating routes
  await act(async () => {
    jest.advanceTimersByTime(1500);
  });

  const startButton = await findByTestId('start-navigation-button');
  fireEvent.press(startButton);

  const endButton = await findByTestId('end-navigation');
  expect(endButton).toBeTruthy();

  fireEvent.press(endButton);

  // Back to home
  await waitFor(() => expect(getByA11yLabel('Search for destination')).toBeTruthy());
});
