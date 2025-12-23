import * as Location from 'expo-location';

export class LocationService {
  private static watchId: Location.LocationSubscription | null = null;

  static async requestPermissions(): Promise<boolean> {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  }

  static async getCurrentLocation(): Promise<Location.LocationObject | null> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) return null;

      const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      return location;
    } catch (error) {
      console.error('Error getting location:', error);
      return null;
    }
  }

  static async watchLocation(callback: (location: Location.LocationObject) => void): Promise<void> {
    const hasPermission = await this.requestPermissions();
    if (!hasPermission) return;

    this.watchId = await Location.watchPositionAsync({ accuracy: Location.Accuracy.High, distanceInterval: 10 }, callback);
  }

  static stopWatchingLocation(): void {
    if (this.watchId) {
      this.watchId.remove();
      this.watchId = null;
    }
  }
}
