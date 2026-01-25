import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar } from '../atoms/Avatar';
import { Typography } from '../atoms/Typography';
import { theme } from '../../../shared/theme';
import { ImageSourcePropType } from 'react-native';

interface UserInfoProps {
  avatar: ImageSourcePropType | { uri: string };
  name: string;
  role?: string;
  avatarSize?: number;
}

/**
 * Molecule: UserInfo
 * Combination of Avatar and Typography atoms
 * Displays user profile information
 */
export const UserInfo: React.FC<UserInfoProps> = ({
  avatar,
  name,
  role,
  avatarSize = 64,
}) => {
  return (
    <View style={styles.container}>
      <Avatar source={avatar} size={avatarSize} />
      <View style={styles.textContainer}>
        <Typography variant="h3" style={styles.name}>
          {name}
        </Typography>
        {role && (
          <Typography variant="caption" style={styles.role}>
            {role}
          </Typography>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: theme.spacing.m,
    flex: 1,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  role: {
    marginTop: 0,
  },
});
