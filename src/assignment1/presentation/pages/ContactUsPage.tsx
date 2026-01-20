import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { ContactForm } from '../components/organisms/ContactForm';
import { theme } from '../../shared/theme';

import { View, Text, TouchableOpacity } from 'react-native';

interface Props {
  onBack: () => void;
}

export const ContactUsPage: React.FC<Props> = ({ onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <View style={styles.topNav}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Dashboard</Text>
        </TouchableOpacity>
      </View>
      <ContactForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  topNav: {
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.m,
  },
  backButton: {
    paddingVertical: theme.spacing.s,
  },
  backText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});
