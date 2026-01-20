import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Theme } from '../../../shared/theme';
import { Typography } from './Typography';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  rightIcon,
  onRightIconPress,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Typography variant="h2">{label}</Typography>
      <View
        style={[
          styles.inputContainer,
          error ? styles.inputError : {},
          style,
        ]}
      >
        <TextInput
          style={styles.input}
          placeholderTextColor={Theme.colors.placeholder}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      {error ? <Typography variant="error">{error}</Typography> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: Theme.spacing.md,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Theme.colors.text,
    height: '100%',
  },
  inputError: {
    borderColor: Theme.colors.error,
  },
  iconContainer: {
    marginLeft: Theme.spacing.sm,
  },
});
