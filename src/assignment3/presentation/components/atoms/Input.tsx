import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { Theme } from '../../../shared/theme';
import { Typography } from './Typography';

interface InputProps extends TextInputProps {
  label: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Typography variant="label">{label}</Typography>
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
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface,
    paddingHorizontal: Theme.spacing.md,
    height: 52,
    justifyContent: 'center',
  },
  input: {
    fontSize: 16,
    color: Theme.colors.text,
  },
  inputError: {
    borderColor: Theme.colors.error,
    backgroundColor: '#fff5f5',
  },
});
