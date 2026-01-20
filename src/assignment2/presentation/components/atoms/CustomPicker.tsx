import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Theme } from '../../../shared/theme';
import { Typography } from './Typography';

interface CustomPickerProps {
  label: string;
  options: string[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export const CustomPicker: React.FC<CustomPickerProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  error,
}) => {
  return (
    <View style={styles.container}>
      <Typography variant="h2">{label}</Typography>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {options.map((option) => {
          const isSelected = selectedValue === option;
          return (
            <TouchableOpacity
              key={option}
              onPress={() => onValueChange(option)}
              style={[
                styles.option,
                isSelected && styles.optionSelected,
              ]}
              activeOpacity={0.7}
            >
              <Typography
                variant="body"
                color={isSelected ? '#fff' : Theme.colors.text}
                style={styles.optionText}
              >
                {option}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {error ? <Typography variant="error">{error}</Typography> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  optionsContainer: {
    paddingVertical: Theme.spacing.xs,
  },
  option: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginRight: Theme.spacing.sm,
  },
  optionSelected: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  optionText: {
    fontWeight: '500',
  },
});
