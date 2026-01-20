import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { Theme } from '../../../shared/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption' | 'error' | 'label';
  color?: string;
  align?: 'left' | 'center' | 'right';
}

export const Typography: React.FC<TypographyProps> = ({
  children,
  variant = 'body',
  color,
  align = 'left',
  style,
  ...props
}) => {
  return (
    <Text
      style={[
        styles.base,
        styles[variant],
        { textAlign: align },
        color ? { color } : {},
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    color: Theme.colors.text,
  },
  h1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.sm,
  },
  h2: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
    color: Theme.colors.textSecondary,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 13,
    color: Theme.colors.textSecondary,
  },
  error: {
    fontSize: 12,
    color: Theme.colors.error,
    marginTop: 4,
  },
});
