import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, TouchableOpacity, Text } from 'react-native';
import { RegistrationForm } from '../components/organisms/RegistrationForm';
import { Theme } from '../../shared/theme';

interface Props {
  onBack: () => void;
}

export const EventRegistrationPage: React.FC<Props> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Dashboard</Text>
        </TouchableOpacity>
      </View>
      <RegistrationForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  topNav: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
  },
  backButton: {
    paddingVertical: Theme.spacing.sm,
  },
  backText: {
    color: Theme.colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});
