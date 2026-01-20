import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Theme } from '../../../shared/theme';
import { Typography } from '../atoms/Typography';
import { ProgressBar } from '../atoms/ProgressBar';

interface StepHeaderProps {
  title: string;
  subtitle: string;
  currentStep: number;
  totalSteps: number;
}

export const StepHeader: React.FC<StepHeaderProps> = ({
  title,
  subtitle,
  currentStep,
  totalSteps,
}) => {
  const progress = (currentStep + 1) / totalSteps;

  return (
    <View style={styles.container}>
      <Typography variant="caption">Step {currentStep + 1} of {totalSteps}</Typography>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="body" color={Theme.colors.textSecondary} style={styles.subtitle}>
        {subtitle}
      </Typography>
      <ProgressBar progress={progress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.lg,
  },
  subtitle: {
    marginTop: Theme.spacing.xs,
  },
});
