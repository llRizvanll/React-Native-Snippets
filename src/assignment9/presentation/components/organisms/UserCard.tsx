import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { UserInfo } from '../molecules/UserInfo';
import { StatCard } from '../molecules/StatCard';
import { Badge } from '../atoms/Badge';
import { Typography } from '../atoms/Typography';
import { theme } from '../../../shared/theme';
import { ImageSourcePropType } from 'react-native';

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface UserCardProps {
  avatar: ImageSourcePropType | { uri: string };
  name: string;
  role: string;
  status: string;
  stats: UserStats;
  bio?: string;
  onPress?: () => void;
}

/**
 * Organism: UserCard
 * Complex component combining multiple molecules and atoms
 * Displays complete user profile information
 */
export const UserCard: React.FC<UserCardProps> = ({
  avatar,
  name,
  role,
  status,
  stats,
  bio,
  onPress,
}) => {
  const CardWrapper = onPress ? TouchableOpacity : View;

  return (
    <CardWrapper
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <UserInfo avatar={avatar} name={name} role={role} />
        <Badge label={status} variant="success" />
      </View>

      {bio && (
        <View style={styles.bioContainer}>
          <Typography variant="body" style={styles.bio}>
            {bio}
          </Typography>
        </View>
      )}

      <View style={styles.statsContainer}>
        <StatCard icon="star" label="Posts" value={stats.posts} />
        <View style={styles.statSpacer} />
        <StatCard icon="heart" label="Followers" value={stats.followers} />
        <View style={styles.statSpacer} />
        <StatCard icon="user" label="Following" value={stats.following} />
      </View>
    </CardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.xl,
    padding: theme.spacing.l,
    marginVertical: theme.spacing.m,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.m,
  },
  bioContainer: {
    marginBottom: theme.spacing.m,
    paddingTop: theme.spacing.m,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  bio: {
    color: theme.colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    marginTop: theme.spacing.m,
  },
  statSpacer: {
    width: theme.spacing.s,
  },
});
