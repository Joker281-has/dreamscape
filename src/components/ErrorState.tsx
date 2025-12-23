import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { colors, spacing, typography } from '../theme';

type Props = {
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
};

export const ErrorState: React.FC<Props> = ({ title, message, actionLabel, onAction }) => {
  return (
    <View style={styles.container} accessibilityRole="alert" accessible={true}>
      <Text style={styles.emoji}></Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
      {actionLabel && onAction ? (
        <View style={styles.action}><Button title={actionLabel} variant="secondary" onPress={onAction} accessibilityLabel={actionLabel} accessibilityHint={message} /></View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: spacing.lg, alignItems: 'center', justifyContent: 'center' },
  emoji: { fontSize: 36, marginBottom: spacing.sm },
  title: { ...typography.h2, color: colors.text.primary, textAlign: 'center' },
  message: { ...typography.body, color: colors.text.secondary, textAlign: 'center', marginTop: spacing.sm },
  action: { marginTop: spacing.md, width: '60%' },
});

export default ErrorState;
