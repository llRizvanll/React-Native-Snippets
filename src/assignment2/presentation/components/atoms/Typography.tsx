import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { Theme } from '../../../shared/theme';

interface TypographyProps extends TextProps {
  variant?: 'h1' | 'h2' | 'body' | 'caption' | 'error';
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Theme.spacing.sm,
  },
  h2: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: Theme.spacing.xs,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  caption: {
    fontSize: 12,
    color: Theme.colors.textSecondary,
  },
  error: {
    fontSize: 12,
    color: Theme.colors.error,
    marginTop: 4,
  },
});
