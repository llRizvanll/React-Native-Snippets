import React from 'react';
import { View, Switch, StyleSheet } from 'react-native';
import { Theme } from '../../../shared/theme';
import { Typography } from './Typography';

interface CustomSwitchProps {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  description?: string;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  value,
  onValueChange,
  description,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Typography variant="h2">{label}</Typography>
        {description ? (
          <Typography variant="caption">{description}</Typography>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: Theme.colors.border, true: Theme.colors.primary }}
        thumbColor={Theme.colors.surface}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Theme.spacing.sm,
    marginBottom: Theme.spacing.md,
  },
  textContainer: {
    flex: 1,
    marginRight: Theme.spacing.md,
  },
});
