import React, { useMemo, useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RouteCard } from '../components/RouteCard';
import { generateMockRoutes } from '../utils/mockData';
import { spacing, typography, colors } from '../theme';
import { useNavigationStore } from '../store/navigationStore';
import type { RootStackParamList, Location } from '../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Haptics from 'expo-haptics';
import LoadingSpinner from '../components/LoadingSpinner';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'RouteSelection'>;

const RouteSelectionScreen: React.FC = () => {
  const nav = useNavigation<NavProp>();
  const store = useNavigationStore();
  const origin = (store.origin as Location) || { latitude: 37.78825, longitude: -122.4324 };
  const destination = (store.destination as Location) || { latitude: 37.781, longitude: -122.411 };

  const [isLoading, setIsLoading] = useState(true);
  const routes = useMemo(() => generateMockRoutes(origin, destination), [origin, destination]);
  const [selectedId, setSelectedId] = useState<string | null>(routes[0]?.id ?? null);

  useEffect(() => {
    setIsLoading(true);
    const t = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(t);
  }, []);

  const selectRoute = (route: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setSelectedId(route.id);
    store.selectRoute(route);
    // Navigate immediately to Navigation screen for quick start
    nav.navigate('Navigation', { route } as any);
  };

  const confirm = () => {
    const sel = routes.find((r) => r.id === selectedId);
    if (sel) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      store.setRoutes(routes);
      store.selectRoute(sel);
      store.startNavigation();
      nav.navigate('Navigation', { route: sel } as any);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => nav.goBack()} accessible={true} accessibilityRole="button" accessibilityLabel="Go back" accessibilityHint="Returns to previous screen" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} style={{ width: 44, height: 44, alignItems: 'flex-start', justifyContent: 'center' }}>
          <Text style={styles.back}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Select a route</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.destinationCard}>
        <Text style={styles.destLabel}>To</Text>
        <Text style={styles.destText}>Mock Destination</Text>
      </View>

      {isLoading ? (
        <LoadingSpinner message="Calculating routes..." />
      ) : (
        <ScrollView style={styles.list} contentContainerStyle={{ padding: spacing.md }}>
          {routes.map((r) => (
            <RouteCard key={r.id} route={r} selected={r.id === selectedId} onPress={() => selectRoute(r)} />
          ))}

          <TouchableOpacity style={styles.confirmButton} onPress={confirm} accessible={true} accessibilityRole="button" accessibilityLabel="Start navigation" accessibilityHint="Begin turn-by-turn navigation" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
            <Text style={styles.confirmText}>Start Navigation</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: spacing.md },
  back: { color: colors.accent.blue },
  title: { ...typography.h2, color: colors.text.primary },
  destinationCard: { marginHorizontal: spacing.md, marginBottom: spacing.md, padding: spacing.md, borderRadius: 12, backgroundColor: colors.surface.card },
  destLabel: { ...typography.caption, color: colors.text.tertiary },
  destText: { ...typography.h3, color: colors.text.primary },
  list: { flex: 1 },
  confirmButton: { marginTop: spacing.lg, backgroundColor: colors.accent.blue, padding: spacing.md, borderRadius: 8, alignItems: 'center', marginHorizontal: spacing.md },
  confirmText: { ...typography.body, color: colors.text.primary, fontWeight: '600' },
});

export default RouteSelectionScreen;
