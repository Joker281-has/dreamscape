import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '../theme';

type Props = {
  message?: string;
};

export const LoadingSpinner: React.FC<Props> = ({ message }) => {
  return (
    <View style={styles.container} accessible={true} accessibilityLabel={message || 'Loading'}>
      <ActivityIndicator size="large" color={colors.accent.blue} />
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl || 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    marginTop: spacing.md,
    ...typography.body,
    color: colors.text.secondary,
  },
});

export default LoadingSpinner;
