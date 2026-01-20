import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Theme } from '../../../shared/theme';

interface ProgressBarProps {
  progress: number; // 0 to 1
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const width = progress * 100;
  
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${width}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: Theme.colors.progressBackground,
    borderRadius: Theme.borderRadius.full,
    overflow: 'hidden',
    marginVertical: Theme.spacing.md,
  },
  bar: {
    height: '100%',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
  },
});
