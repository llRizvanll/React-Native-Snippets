import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../../shared/theme';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'success' | 'warning' | 'error';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

/**
 * Atom: Badge
 * Basic building block for displaying status labels or tags
 */
export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'primary',
  style,
  textStyle,
}) => {
  return (
    <View style={[styles.container, styles[variant], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], textStyle]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.s,
    paddingVertical: theme.spacing.xs,
    borderRadius: theme.borderRadius.m,
    alignSelf: 'flex-start',
  },
  primary: {
    backgroundColor: theme.colors.primary + '20',
  },
  success: {
    backgroundColor: theme.colors.success + '20',
  },
  warning: {
    backgroundColor: theme.colors.warning + '20',
  },
  error: {
    backgroundColor: theme.colors.error + '20',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
  primaryText: {
    color: theme.colors.primary,
  },
  successText: {
    color: theme.colors.success,
  },
  warningText: {
    color: theme.colors.warning,
  },
  errorText: {
    color: theme.colors.error,
  },
});
