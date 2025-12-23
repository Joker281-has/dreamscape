import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DreamMap } from '../components/DreamMap';
import { Card } from '../components/Card';
import { LocationService } from '../services/locationService';
import { colors, spacing, typography } from '../theme';
import { useNavigation } from '@react-navigation/native';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorState from '../components/ErrorState';
import * as Haptics from 'expo-haptics';

export const HomeScreen = () => {
  const navigation = useNavigation() as any;
  const [location, setLocation] = useState<any | null>(null);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    initializeLocation();
  }, []);

  const initializeLocation = async () => {
    setIsLoading(true);
    const currentLocation = await LocationService.getCurrentLocation();
    if (currentLocation) {
      setLocation(currentLocation);
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setPermissionDenied(false);
    } else {
      setPermissionDenied(true);
    }
    setIsLoading(false);
  };

  const handleSearch = () => {
    try { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch {}
    navigation.navigate('RouteSelection');
  };

  if (isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.primary, justifyContent: 'center' }}>
        <LoadingSpinner message="Getting your location..." />
      </SafeAreaView>
    );
  }

  if (permissionDenied) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background.primary, justifyContent: 'center' }}>
        <ErrorState title="Location Access Required" message="Dreamscape needs your location to navigate" actionLabel="Open Settings" onAction={() => { import('react-native').then(({ Linking }) => Linking.openSettings()); }} />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <DreamMap region={region} />

      <SafeAreaView style={styles.overlay} edges={['top', 'bottom']}>
        <View style={styles.topBar}>
          <Card style={styles.topBarCard}>
            <Text style={styles.title}>Dreamscape</Text>
          </Card>
        </View>

        <View style={styles.bottomContainer}>
          <Card>
            <Text style={styles.heading}>Where to?</Text>

            <TouchableOpacity style={styles.searchButton} onPress={handleSearch} accessible={true} accessibilityRole="button" accessibilityLabel="Search for destination" accessibilityHint="Opens route selection screen" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <Text style={styles.searchText}>Search destination</Text>
            </TouchableOpacity>

            {location && (
              <View style={styles.infoRow}>
                <Text style={styles.infoText}>
                  {location.coords.latitude.toFixed(4)}, {location.coords.longitude.toFixed(4)}
                </Text>
              </View>
            )}
          </Card>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  overlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'space-between' },
  topBar: { paddingHorizontal: spacing.md, paddingTop: spacing.sm },
  topBarCard: { paddingVertical: spacing.sm },
  title: { ...typography.h3, color: colors.text.primary, textAlign: 'center' },
  bottomContainer: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },
  heading: { ...typography.h2, color: colors.text.primary, marginBottom: spacing.md },
  searchButton: { backgroundColor: colors.accent.blue, padding: spacing.md, borderRadius: 8, alignItems: 'center' },
  searchText: { ...typography.body, color: colors.text.primary, fontWeight: '600' },
  infoRow: { marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.surface.border },
  infoText: { ...typography.caption, color: colors.text.tertiary },
});

export default HomeScreen;
