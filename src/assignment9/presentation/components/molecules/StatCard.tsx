import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from '../atoms/Icon';
import { Typography } from '../atoms/Typography';
import { theme } from '../../../shared/theme';

interface StatCardProps {
  icon: string;
  label: string;
  value: string | number;
  iconColor?: string;
}

/**
 * Molecule: StatCard
 * Combination of Icon and Typography atoms
 * Displays a statistic with an icon
 */
export const StatCard: React.FC<StatCardProps> = ({
  icon,
  label,
  value,
  iconColor,
}) => {
  return (
    <View style={styles.container}>
      <Icon name={icon} size={24} color={iconColor || theme.colors.primary} />
      <View style={styles.textContainer}>
        <Typography variant="h3" style={styles.value}>
          {value}
        </Typography>
        <Typography variant="label" style={styles.label}>
          {label}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.m,
    borderRadius: theme.borderRadius.l,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    marginLeft: theme.spacing.m,
    flex: 1,
  },
  value: {
    marginBottom: theme.spacing.xs,
  },
  label: {
    marginTop: 0,
  },
});
