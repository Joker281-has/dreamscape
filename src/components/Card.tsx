import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors, spacing } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: any;
  intensity?: number;
}

export const Card: React.FC<CardProps> = ({ children, style, intensity = 40 }) => {
  return (
    <BlurView intensity={intensity} style={[styles.container, style]}>
      <View style={styles.content}>{children}</View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    backgroundColor: colors.surface.card,
    borderWidth: 1,
    borderColor: colors.surface.border,
    padding: spacing.md,
  },
});
