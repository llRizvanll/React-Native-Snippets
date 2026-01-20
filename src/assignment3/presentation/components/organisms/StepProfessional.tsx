import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Profile, Occupation } from '../../../core/entities/Profile';
import { Input } from '../atoms/Input';
import { Typography } from '../atoms/Typography';
import { StepHeader } from '../molecules/StepHeader';
import { SkillInput } from '../molecules/SkillInput';
import { Theme } from '../../../shared/theme';

interface StepProps {
  form: Profile;
  errors: any;
  updateField: (field: keyof Profile, value: any) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
}

export const StepProfessional: React.FC<StepProps> = ({ 
  form, 
  errors, 
  updateField, 
  addSkill, 
  removeSkill 
}) => {
  const occupations: Occupation[] = ['Developer', 'Designer', 'Student', 'Other'];

  return (
    <View>
      <StepHeader 
        title="Professional info" 
        subtitle="Tell us about your work and skills."
        currentStep={2}
        totalSteps={4}
      />
      
      <Typography variant="label">Occupation</Typography>
      <View style={styles.occupationContainer}>
        {occupations.map((occ) => {
          const isSelected = form.occupation === occ;
          return (
            <TouchableOpacity
              key={occ}
              onPress={() => updateField('occupation', occ)}
              style={[
                styles.occChip,
                isSelected && styles.occChipSelected,
              ]}
              activeOpacity={0.7}
            >
              <Typography
                variant="body"
                color={isSelected ? '#fff' : Theme.colors.text}
                style={styles.occText}
              >
                {occ}
              </Typography>
            </TouchableOpacity>
          );
        })}
      </View>

      {form.occupation !== 'Student' && (
        <Input
          label="Company Name"
          placeholder="Where do you work?"
          value={form.company}
          onChangeText={(text) => updateField('company', text)}
          error={errors.company}
        />
      )}

      <SkillInput
        skills={form.skills}
        onAddSkill={addSkill}
        onRemoveSkill={removeSkill}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  occupationContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: Theme.spacing.md,
  },
  occChip: {
    paddingHorizontal: Theme.spacing.md,
    paddingVertical: Theme.spacing.sm,
    borderRadius: Theme.borderRadius.full,
    backgroundColor: Theme.colors.surface,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    marginRight: Theme.spacing.sm,
    marginBottom: Theme.spacing.sm,
  },
  occChipSelected: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  occText: {
    fontWeight: '500',
  },
});
