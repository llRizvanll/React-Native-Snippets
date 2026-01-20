import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { FormField } from '../molecules/FormField';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { useContactViewModel } from '../../viewModels/useContactViewModel';
import { theme } from '../../../shared/theme';

export const ContactForm: React.FC = () => {
  const { form, errors, isSubmitting, updateField, handleSubmit } = useContactViewModel();

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Typography variant="h1">Contact Us</Typography>
        <Typography variant="body" style={styles.subtitle}>
          We'd love to hear from you. Please fill out the form below.
        </Typography>
      </View>

      <View style={styles.form}>
        <FormField
          label="Name"
          value={form.name}
          onChangeText={text => updateField('name', text)}
          placeholder="Enter your name"
          error={errors.name}
        />

        <FormField
          label="Email"
          value={form.email}
          onChangeText={text => updateField('email', text)}
          placeholder="Enter your email"
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <FormField
          label="Message"
          value={form.message || ''}
          onChangeText={text => updateField('message', text)}
          placeholder="What's on your mind?"
          error={errors.message}
          multiline
          numberOfLines={4}
        />

        <Button
          title="Send Message"
          onPress={handleSubmit}
          loading={isSubmitting}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.l,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.s,
    color: theme.colors.textSecondary,
  },
  form: {
    gap: theme.spacing.m,
  },
  button: {
    marginTop: theme.spacing.l,
  },
});
