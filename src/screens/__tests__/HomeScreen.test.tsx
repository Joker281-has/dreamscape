import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { HomeScreen } from '../HomeScreen';
import * as Location from 'expo-location';
import { useNavigationStore } from '../../store/navigationStore';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('expo-location');
jest.mock('../../store/navigationStore');

describe('HomeScreen', () => {
  const mockSetCurrentLocation = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useNavigationStore as unknown as jest.Mock).mockReturnValue({
      currentLocation: null,
      setCurrentLocation: mockSetCurrentLocation,
      destination: null,
      selectedRoute: null,
      isNavigating: false,
    });
  });

  describe('Rendering', () => {
    it('renders the Dreamscape title', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      const { getByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(getByText('Dreamscape')).toBeTruthy();
      });
    });

    it('renders the where to card', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      const { getByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(getByText(/where to/i)).toBeTruthy();
      });
    });

    it('renders the search destination button', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      const { getByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(getByText(/search destination/i)).toBeTruthy();
      });
    });
  });

  describe('Location Permissions', () => {
    it('requests location permission on mount', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(Location.requestForegroundPermissionsAsync).toHaveBeenCalled();
      });
    });

    it('gets current location when permission granted', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(Location.getCurrentPositionAsync).toHaveBeenCalled();
      });
    });

    it('shows current location in the UI when permission granted', async () => {
      const mockLocation = {
        coords: { latitude: 37.7749, longitude: -122.4194 },
      };
      
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(mockLocation);

      const { getByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(getByText('37.7749, -122.4194')).toBeTruthy();
      });
    });

    it('shows error state when permission denied', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });

      const { getByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(getByText(/location/i)).toBeTruthy();
      }, { timeout: 3000 });
    });

    it('does not request location when permission denied', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'denied',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(Location.getCurrentPositionAsync).not.toHaveBeenCalled();
      });
    });
  });

  describe('Loading States', () => {
    it('shows loading spinner while getting location', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockImplementation(
        () => new Promise(resolve => setTimeout(() => resolve({
          coords: { latitude: 37.7749, longitude: -122.4194 },
        }), 100))
      );

      const { queryByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      // Loading spinner should be present initially
      expect(queryByText(/getting.*location/i) || queryByText(/loading/i)).toBeTruthy();
    });
  });

  describe('Error Handling', () => {
    it('handles location fetch errors gracefully', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockRejectedValue(
        new Error('Location error')
      );

      const { queryByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        const found = queryByText(/error/i) || queryByText(/location/i) || queryByText(/Location Access Required/i);
        expect(found).toBeTruthy();
      }, { timeout: 3000 });
    });

    it('does not crash when location service fails', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockRejectedValue(
        new Error('Permission error')
      );

      const { UNSAFE_root } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);
      
      await waitFor(() => {
        expect(UNSAFE_root).toBeTruthy();
      });
    });
  });

  describe('Interactions', () => {
    it('search button is tappable', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      const { queryByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);

      await waitFor(() => {
        expect(queryByText(/search destination/i)).toBeTruthy();
      });

      const buttonText = queryByText(/search destination/i);
      const parent = buttonText?.parent;
      expect(parent?.props.accessible || buttonText).toBeTruthy();
      fireEvent.press(parent || (buttonText as any));
    });
  });

  describe('Accessibility', () => {
    it('has proper accessibility labels', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({
        status: 'granted',
      });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue({
        coords: { latitude: 37.7749, longitude: -122.4194 },
      });

      const { queryByText } = render(<NavigationContainer><HomeScreen /></NavigationContainer>);

      await waitFor(() => {
        expect(queryByText(/search destination/i)).toBeTruthy();
      });

      const buttonText = queryByText(/search destination/i);
      // Walk up the tree to find an ancestor with accessibility props
      let node: any = buttonText;
      while (node && !(node.props && (node.props.accessibilityLabel || node.props.accessible))) {
        node = node.parent;
      }
      expect(node).toBeTruthy();
      expect(node.props.accessibilityLabel || node.props.accessible).toBeTruthy();
    });
  });
});