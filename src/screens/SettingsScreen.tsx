import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing } from '../theme';

const SettingsScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <Text style={styles.hint}>Preferences will be here</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background.primary, padding: spacing.md },
  title: { ...typography.h2, color: colors.text.primary },
  hint: { ...typography.body, color: colors.text.tertiary, marginTop: spacing.md },
});

export default SettingsScreen;
