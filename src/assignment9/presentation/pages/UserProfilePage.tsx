import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Text } from 'react-native';
import { UserProfileTemplate } from '../components/templates/UserProfileTemplate';
import { useUserProfileViewModel } from '../viewModels/useUserProfileViewModel';
import { theme } from '../../shared/theme';

interface Props {
  onBack: () => void;
}

/**
 * Page: UserProfilePage
 * Specific instance of UserProfileTemplate with real data
 * This is what users actually see and interact with
 */
export const UserProfilePage: React.FC<Props> = ({ onBack }) => {
  const { user, handleCardPress } = useUserProfileViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Text style={styles.backText}>← Dashboard</Text>
      </TouchableOpacity>
      <UserProfileTemplate
        avatar={user.avatar}
        name={user.name}
        role={user.role}
        status={user.status}
        stats={user.stats}
        bio={user.bio}
        onCardPress={handleCardPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backButton: {
    paddingHorizontal: theme.spacing.l,
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.s,
  },
  backText: {
    color: theme.colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});
