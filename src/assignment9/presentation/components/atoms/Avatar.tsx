import React from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { theme } from '../../../shared/theme';

interface AvatarProps {
  source: ImageSourcePropType | { uri: string };
  size?: number;
  style?: object;
}

/**
 * Atom: Avatar
 * Basic building block for displaying user profile images
 */
export const Avatar: React.FC<AvatarProps> = ({
  source,
  size = 48,
  style,
}) => {
  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Image
        source={source}
        style={[styles.image, { width: size, height: size, borderRadius: size / 2 }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: theme.colors.border,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
