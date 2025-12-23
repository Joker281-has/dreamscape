import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Card } from './Card';
import { spacing, typography, colors } from '../theme';
import { Route } from '../types/navigation';

type Props = {
  route: Route;
  selected?: boolean;
  onPress?: () => void;
};

export const RouteCard: React.FC<Props> = ({ route, selected = false, onPress }) => {
  const isHeavy = route.traffic === 'heavy';
  const trafficColor = isHeavy ? colors.accent.red : route.traffic === 'moderate' ? colors.accent.amber : colors.accent.green;

  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isHeavy) {
      const anim = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.2, duration: 700, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1.0, duration: 700, useNativeDriver: true }),
        ])
      );
      anim.start();
      return () => anim.stop();
    }
  }, [isHeavy, pulse]);

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.95} accessible={true} accessibilityRole="button" accessibilityLabel={`${route.name}, ${route.duration} minutes, ${route.distance.toFixed(1)} miles`} accessibilityHint="Double tap to start navigation" hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}>
      <Card style={[styles.card, selected && styles.selected]} intensity={40}>
        <View style={styles.row}>
          <View style={styles.left}>
            <View style={{flexDirection:'row',alignItems:'center'}}><Text style={styles.name}>{route.name}</Text>{route.aiConfidence >= 92 ? <View style={styles.recommend}><Text style={styles.recommendText}>Recommended</Text></View> : null}</View>
            <Text style={styles.meta}>{route.duration} min  {route.distance.toFixed(1)} mi</Text>
          </View>

          <View style={styles.right}>
            <Animated.View style={[styles.trafficDot, { backgroundColor: trafficColor, transform: [{ scale: pulse }] }]} />
            <Text style={styles.confidence}>{route.aiConfidence}%</Text>
          </View>
        </View>

        {/* Mini map preview placeholder */}
        <View style={styles.preview} pointerEvents='none'>
          <View style={styles.previewLine} />
          <View style={styles.previewMarkerStart} />
          <View style={styles.previewMarkerEnd} />
        </View>

      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  selected: {
    borderColor: colors.surface.borderStrong,
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {},
  name: {
    ...typography.h3,
    color: colors.text.primary,
  },
  meta: {
    ...typography.caption,
    color: colors.text.tertiary,
    marginTop: 6,
  },
  right: {
    alignItems: 'flex-end',
  },
  trafficDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 6,
  },
  confidence: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  recommend: {
    backgroundColor: 'rgba(0,120,212,0.12)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  recommendText: {
    ...typography.caption,
    color: colors.accent.blue,
    fontWeight: '600',
  },
  preview: {
    marginTop: spacing.sm,
    height: 48,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.03)',
    overflow: 'hidden',
    justifyContent: 'center',
  },
  previewLine: {
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    marginHorizontal: spacing.md,
  },
  previewMarkerStart: {
    position: 'absolute',
    left: spacing.md,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.green,
  },
  previewMarkerEnd: {
    position: 'absolute',
    right: spacing.md,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.accent.blue,
  },
});
