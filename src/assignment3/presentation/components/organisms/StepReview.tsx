import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Profile } from '../../../core/entities/Profile';
import { Typography } from '../atoms/Typography';
import { StepHeader } from '../molecules/StepHeader';
import { Tag } from '../atoms/Tag';
import { Theme } from '../../../shared/theme';

interface StepProps {
  form: Profile;
}

export const StepReview: React.FC<StepProps> = ({ form }) => {
  const renderRow = (label: string, value: string | undefined) => (
    <View style={styles.row}>
      <Typography variant="label" style={styles.rowLabel}>{label}</Typography>
      <Typography variant="body">{value || 'N/A'}</Typography>
    </View>
  );

  return (
    <View style={styles.container}>
      <StepHeader 
        title="Review & Submit" 
        subtitle="Double check your details before finishing."
        currentStep={3}
        totalSteps={4}
      />
      
      <View style={styles.section}>
        <Typography variant="h2" style={styles.sectionTitle}>Personal</Typography>
        {renderRow('First Name', form.firstName)}
        {renderRow('Last Name', form.lastName)}
        {renderRow('Date of Birth', form.dob)}
      </View>

      <View style={styles.section}>
        <Typography variant="h2" style={styles.sectionTitle}>Account</Typography>
        {renderRow('Email', form.email)}
      </View>

      <View style={styles.section}>
        <Typography variant="h2" style={styles.sectionTitle}>Professional</Typography>
        {renderRow('Occupation', form.occupation)}
        {form.occupation !== 'Student' && renderRow('Company', form.company)}
        
        <View style={styles.skillsSection}>
          <Typography variant="label" style={styles.rowLabel}>Skills</Typography>
          <View style={styles.tagsRow}>
            {form.skills.map((skill) => (
              <Tag key={skill} label={skill} />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: Theme.spacing.lg,
  },
  section: {
    backgroundColor: Theme.colors.surface,
    padding: Theme.spacing.md,
    borderRadius: Theme.borderRadius.lg,
    marginBottom: Theme.spacing.md,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  sectionTitle: {
    marginBottom: Theme.spacing.md,
    color: Theme.colors.primary,
  },
  row: {
    marginBottom: Theme.spacing.sm,
  },
  rowLabel: {
    fontSize: 12,
    marginBottom: 2,
  },
  skillsSection: {
    marginTop: Theme.spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: Theme.spacing.xs,
  },
});
