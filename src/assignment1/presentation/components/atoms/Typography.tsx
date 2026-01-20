import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../../shared/theme';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption';
  children: React.ReactNode;
  style?: TextStyle;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  children,
  style,
}) => {
  return (
    <Text style={[styles[variant], style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 28,
    fontWeight: '800',
    color: theme.colors.text,
    lineHeight: 34,
  },
  h2: {
    fontSize: 22,
    fontWeight: '700',
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
    fontSize: 12,
    fontWeight: '400',
    color: theme.colors.textSecondary,
    lineHeight: 18,
  },
});
