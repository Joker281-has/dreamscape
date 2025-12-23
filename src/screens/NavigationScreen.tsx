import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { colors, spacing, typography } from '../theme';
import { useNavigationStore } from '../store/navigationStore';
import * as Haptics from 'expo-haptics';

const NavigationScreen: React.FC = () => {
  const nav = useNavigation();
  const store = useNavigationStore();
  const route = store.selectedRoute;
  const [instructionIndex, setInstructionIndex] = useState(0);
  const [speed, setSpeed] = useState(35);

  const arrowScale = useRef(new Animated.Value(1)).current;
  const statsOpacity = useRef(new Animated.Value(1)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // mark navigation started when this screen mounts
    try { store.startNavigation(); } catch {}
    const id = setInterval(() => {
      setInstructionIndex((i) => Math.min(i + 1, (route?.instructions?.length || 1) - 1));
    }, 5000);
    return () => { clearInterval(id); try { store.stopNavigation(); } catch {} };
  }, [route]);

  // Start progress animation (fake) based on route.duration
  useEffect(() => {
    progress.setValue(0);
    const totalMs = (route?.duration ?? 1) * 60 * 1000; // minutes -> ms
    Animated.timing(progress, { toValue: 1, duration: Math.max(5000, Math.min(totalMs, 5 * 60 * 1000)), useNativeDriver: false }).start();
  }, [route]);

  // Pulse arrow when instruction changes
  useEffect(() => {
    Animated.sequence([
      Animated.timing(arrowScale, { toValue: 1.15, duration: 160, useNativeDriver: true }),
      Animated.timing(arrowScale, { toValue: 1.0, duration: 160, useNativeDriver: true }),
    ]).start();

    // Haptic for turn
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch {}

    // animate stats fade
    Animated.sequence([
      Animated.timing(statsOpacity, { toValue: 0.4, duration: 120, useNativeDriver: true }),
      Animated.timing(statsOpacity, { toValue: 1, duration: 160, useNativeDriver: true }),
    ]).start();
  }, [instructionIndex]);

  const handleEnd = () => {
    try { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch {}
    store.stopNavigation();
    nav.navigate('Home' as never);
  };

  if (!route) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}> 
        <Text style={{ color: colors.text.secondary }}>No active route</Text>
      </SafeAreaView>
    );
  }

  const instruction = route.instructions[instructionIndex] || { text: 'Continue', distance: 0 };

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.topArea}>
        <Animated.View testID="nav-arrow" style={[styles.arrowPlaceholder, { transform: [{ scale: arrowScale }] }] }>
          <Text style={styles.arrowText}>↑</Text>
        </Animated.View>
        <View style={styles.instructionCard}>
          <Text accessibilityLiveRegion="polite" style={styles.instructionText}>{instruction.text}</Text>
        </View>
      </View>

      <Animated.View style={[styles.statsBar, { opacity: statsOpacity }] }>
        <Text style={styles.statsText}>ETA: {route.duration} min</Text>
        <Text style={styles.statsText}>Remaining: {route.distance.toFixed(1)} mi</Text>
        <Text style={styles.statsText}>Speed: {speed} mph</Text>
      </Animated.View>

      <View style={styles.progressContainer}>
        <Animated.View testID="progress-bar" style={[styles.progressBar, { width: progress.interpolate({ inputRange: [0,1], outputRange: ['0%','100%'] }) }]} />
      </View>

      <View style={styles.bottomArea}>
        <TouchableOpacity testID="end-navigation" style={styles.endButton} onPress={handleEnd} accessible={true} accessibilityRole="button" accessibilityLabel="End navigation" accessibilityHint="Stops navigation and returns to home" hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.endText}>End Navigation</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary },
  topArea: { padding: spacing.lg, alignItems: 'center' },
  arrowPlaceholder: { width: 120, height: 120, borderRadius: 60, backgroundColor: colors.surface.card, alignItems: 'center', justifyContent: 'center', marginBottom: spacing.md },
  arrowText: { fontSize: 48, color: colors.text.primary },
  instructionCard: { padding: spacing.md, borderRadius: 12, backgroundColor: colors.surface.card },
  instructionText: { ...typography.h3, color: colors.text.primary },
  statsBar: { flexDirection: 'row', justifyContent: 'space-around', padding: spacing.md, borderTopWidth: 1, borderTopColor: colors.surface.border },
  statsText: { ...typography.caption, color: colors.text.secondary },
  bottomArea: { flex: 1, justifyContent: 'flex-end', padding: spacing.md },
  progressContainer: { height: 6, backgroundColor: 'rgba(255,255,255,0.04)', marginHorizontal: spacing.md, borderRadius: 6, overflow: 'hidden' },
  progressBar: { height: 6, backgroundColor: colors.accent.blue, width: '0%' },
  endButton: { backgroundColor: colors.accent.red, padding: spacing.md, borderRadius: 8, alignItems: 'center' },
  endText: { color: colors.text.primary, ...typography.body, fontWeight: '600' },
});

export default NavigationScreen;
