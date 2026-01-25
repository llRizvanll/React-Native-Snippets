import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { UserCard } from '../organisms/UserCard';
import { Typography } from '../atoms/Typography';
import { theme } from '../../../shared/theme';
import { ImageSourcePropType } from 'react-native';

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface UserProfileTemplateProps {
  avatar: ImageSourcePropType | { uri: string };
  name: string;
  role: string;
  status: string;
  stats: UserStats;
  bio?: string;
  onCardPress?: () => void;
}

/**
 * Template: UserProfileTemplate
 * Page-level layout that arranges organisms
 * Defines the structure of the user profile page
 */
export const UserProfileTemplate: React.FC<UserProfileTemplateProps> = ({
  avatar,
  name,
  role,
  status,
  stats,
  bio,
  onCardPress,
}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <Typography variant="h1" style={styles.title}>
          User Profile
        </Typography>
        <Typography variant="caption" style={styles.subtitle}>
          Atomic Design Example
        </Typography>
      </View>

      <UserCard
        avatar={avatar}
        name={name}
        role={role}
        status={status}
        stats={stats}
        bio={bio}
        onPress={onCardPress}
      />

      <View style={styles.infoSection}>
        <Typography variant="h2" style={styles.sectionTitle}>
          Component Hierarchy
        </Typography>
        <Typography variant="body" style={styles.description}>
          This page demonstrates Atomic Design principles:
        </Typography>
        <View style={styles.hierarchy}>
          <Typography variant="caption" style={styles.hierarchyItem}>
            • Atoms: Avatar, Badge, Icon, Typography
          </Typography>
          <Typography variant="caption" style={styles.hierarchyItem}>
            • Molecules: UserInfo, StatCard
          </Typography>
          <Typography variant="caption" style={styles.hierarchyItem}>
            • Organisms: UserCard
          </Typography>
          <Typography variant="caption" style={styles.hierarchyItem}>
            • Templates: UserProfileTemplate
          </Typography>
          <Typography variant="caption" style={styles.hierarchyItem}>
            • Pages: UserProfilePage
          </Typography>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    padding: theme.spacing.l,
  },
  header: {
    marginBottom: theme.spacing.l,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
  },
  infoSection: {
    marginTop: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.l,
    borderRadius: theme.borderRadius.l,
  },
  sectionTitle: {
    marginBottom: theme.spacing.m,
  },
  description: {
    marginBottom: theme.spacing.m,
    color: theme.colors.textSecondary,
  },
  hierarchy: {
    marginTop: theme.spacing.s,
  },
  hierarchyItem: {
    marginBottom: theme.spacing.xs,
    color: theme.colors.text,
  },
});
