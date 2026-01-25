import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../../shared/theme';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  children: React.ReactNode;
  style?: TextStyle;
  color?: string;
}

/**
 * Atom: Typography
 * Basic building block for all text elements
 */
export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  style,
  color,
}) => {
  return (
    <Text style={[styles[variant], color && { color }, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 32,
    fontWeight: '800',
    color: theme.colors.text,
    lineHeight: 40,
  },
  h2: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    lineHeight: 32,
  },
  h3: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: theme.colors.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: theme.colors.textSecondary,
    lineHeight: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    lineHeight: 16,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
