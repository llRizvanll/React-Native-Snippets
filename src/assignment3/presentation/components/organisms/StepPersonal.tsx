import React from 'react';
import { View } from 'react-native';
import { Profile } from '../../../core/entities/Profile';
import { Input } from '../atoms/Input';
import { StepHeader } from '../molecules/StepHeader';

interface StepProps {
  form: Profile;
  errors: any;
  updateField: (field: keyof Profile, value: any) => void;
}

export const StepPersonal: React.FC<StepProps> = ({ form, errors, updateField }) => {
  return (
    <View>
      <StepHeader 
        title="Personal info" 
        subtitle="Let's start with the basics about who you are."
        currentStep={0}
        totalSteps={4}
      />
      <Input
        label="First Name"
        placeholder="Enter first name"
        value={form.firstName}
        onChangeText={(text) => updateField('firstName', text)}
        error={errors.firstName}
      />
      <Input
        label="Last Name"
        placeholder="Enter last name"
        value={form.lastName}
        onChangeText={(text) => updateField('lastName', text)}
        error={errors.lastName}
      />
      <Input
        label="Date of Birth"
        placeholder="YYYY-MM-DD"
        value={form.dob}
        onChangeText={(text) => updateField('dob', text)}
        error={errors.dob}
      />
    </View>
  );
};
