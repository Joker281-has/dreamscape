import * as Location from 'expo-location';
import { LocationService } from '../locationService';

jest.mock('expo-location');

describe('LocationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('requestPermissions', () => {
    it('returns true when permission granted', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
      const result = await LocationService.requestPermissions();
      expect(result).toBe(true);
    });

    it('returns false when permission denied', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });
      const result = await LocationService.requestPermissions();
      expect(result).toBe(false);
    });
  });

  describe('getCurrentLocation', () => {
    it('returns location when permission granted', async () => {
      const mockLocation = { coords: { latitude: 37.7749, longitude: -122.4194 } };
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
      (Location.getCurrentPositionAsync as jest.Mock).mockResolvedValue(mockLocation);
      const result = await LocationService.getCurrentLocation();
      expect(result).toEqual(mockLocation);
    });

    it('returns null when permission denied', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'denied' });
      const result = await LocationService.getCurrentLocation();
      expect(result).toBeNull();
    });

    it('returns null on error', async () => {
      (Location.requestForegroundPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
      (Location.getCurrentPositionAsync as jest.Mock).mockRejectedValue(new Error('Location error'));
      const result = await LocationService.getCurrentLocation();
      expect(result).toBeNull();
    });
  });
});
