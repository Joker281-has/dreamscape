import React, { useCallback } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, spacing, typography } from '../theme';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
};

export const Button: React.FC<ButtonProps> = ({ title, onPress, variant = 'primary', style, textStyle, loading = false, disabled = false, accessibilityLabel, accessibilityHint }) => {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isDisabled = disabled || loading;

  const handlePress = useCallback(() => {
    if (isDisabled) return;
    try { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); } catch {}
    onPress && onPress();
  }, [isDisabled, onPress]);

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[styles.base, isPrimary && styles.primary, isSecondary && styles.secondary, isDisabled && styles.disabled, style]}
      activeOpacity={isDisabled ? 1 : 0.85}
      accessibilityRole="button"
      accessible={true}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator size="small" color={isPrimary ? colors.text.primary : colors.accent.blue} />
      ) : (
        <Text style={[styles.text, isPrimary && styles.textPrimary, isSecondary && styles.textSecondary, textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    height: 52,
    minHeight: 52,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  primary: {
    backgroundColor: colors.accent.blue,
    shadowColor: colors.accent.blue,
    shadowOpacity: 0.16,
    shadowRadius: 12,
    elevation: 3,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent.blue,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...typography.body,
  },
  textPrimary: {
    color: colors.text.primary,
    fontWeight: '600',
  },
  textSecondary: {
    color: colors.accent.blue,
  },
});
