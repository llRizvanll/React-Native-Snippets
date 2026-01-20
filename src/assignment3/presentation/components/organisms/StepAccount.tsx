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

export const StepAccount: React.FC<StepProps> = ({ form, errors, updateField }) => {
  return (
    <View>
      <StepHeader 
        title="Account info" 
        subtitle="Secure your account and provide contact details."
        currentStep={1}
        totalSteps={4}
      />
      <Input
        label="Email Address"
        placeholder="your@email.com"
        keyboardType="email-address"
        autoCapitalize="none"
        value={form.email}
        onChangeText={(text) => updateField('email', text)}
        error={errors.email}
      />
      <Input
        label="Password"
        placeholder="Enter at least 8 characters"
        secureTextEntry
        value={form.password}
        onChangeText={(text) => updateField('password', text)}
        error={errors.password}
      />
    </View>
  );
};
