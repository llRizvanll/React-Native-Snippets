import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../../shared/theme';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

/**
 * Atom: Icon
 * Basic building block for displaying icons (using emoji for simplicity)
 * In a real app, you'd use react-native-vector-icons or similar
 */
export const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  color = theme.colors.primary,
  style,
}) => {
  // Simple emoji-based icon mapping for demonstration
  const iconMap: { [key: string]: string } = {
    user: '👤',
    email: '✉️',
    phone: '📞',
    location: '📍',
    star: '⭐',
    heart: '❤️',
    message: '💬',
    settings: '⚙️',
  };

  return (
    <View style={[styles.container, { width: size, height: size }, style]}>
      <Text style={[styles.icon, { fontSize: size, color }]}>
        {iconMap[name] || '•'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    textAlign: 'center',
  },
});
