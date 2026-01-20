import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useRegistrationViewModel } from '../../viewModels/useRegistrationViewModel';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { CustomSwitch } from '../atoms/CustomSwitch';
import { CustomPicker } from '../atoms/CustomPicker';
import { Theme } from '../../../shared/theme';

export const RegistrationForm: React.FC = () => {
  const {
    form,
    errors,
    isSubmitting,
    isPasswordVisible,
    showDietaryRequirements,
    updateField,
    togglePasswordVisibility,
    handleSubmit,
  } = useRegistrationViewModel();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Typography variant="h1">Event Registration</Typography>
      <Typography variant="body" color={Theme.colors.textSecondary} style={styles.subtitle}>
        Fill in your details to secure your spot.
      </Typography>

      <Input
        label="Full Name"
        placeholder="John Doe"
        value={form.fullName}
        onChangeText={(text) => updateField('fullName', text)}
        error={errors.fullName}
      />

      <Input
        label="Phone Number"
        placeholder="(555) 000-0000"
        keyboardType="phone-pad"
        value={form.phoneNumber}
        onChangeText={(text) => updateField('phoneNumber', text)}
        error={errors.phoneNumber}
      />

      <Input
        label="Password"
        placeholder="••••••••"
        secureTextEntry={!isPasswordVisible}
        value={form.password}
        onChangeText={(text) => updateField('password', text)}
        error={errors.password}
        rightIcon={
          <Typography color={Theme.colors.primary} style={styles.toggleText}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Typography>
        }
        onRightIconPress={togglePasswordVisibility}
      />

      <CustomPicker
        label="Event Type"
        options={['Webinar', 'Workshop', 'Conference']}
        selectedValue={form.eventType}
        onValueChange={(val) => updateField('eventType', val as any)}
      />

      {showDietaryRequirements && (
        <Input
          label="Dietary Requirements"
          placeholder="e.g. Vegetarian, Nut Allergy"
          value={form.dietaryRequirements}
          onChangeText={(text) => updateField('dietaryRequirements', text)}
          error={errors.dietaryRequirements}
        />
      )}

      <CustomSwitch
        label="Receive Updates"
        description="Stay notified about event changes and future workshops."
        value={form.receiveUpdates}
        onValueChange={(val) => updateField('receiveUpdates', val)}
      />

      <Button
        title="Register Now"
        onPress={handleSubmit}
        loading={isSubmitting}
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: Theme.spacing.lg,
  },
  subtitle: {
    marginBottom: Theme.spacing.xl,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  button: {
    marginTop: Theme.spacing.lg,
    marginBottom: Theme.spacing.xl,
  },
});
