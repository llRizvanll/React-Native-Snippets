import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input } from '../atoms/Input';
import { theme } from '../../../shared/theme';

interface FormFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  multiline,
  numberOfLines,
  keyboardType,
  autoCapitalize,
}) => {
  return (
    <View style={styles.container}>
      <Input
        label={label}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        error={error}
        multiline={multiline}
        numberOfLines={numberOfLines}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        textAlignVertical={multiline ? 'top' : 'center'}
        style={multiline ? styles.multilineInput : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  multilineInput: {
    height: 120,
    paddingTop: theme.spacing.m,
  },
});
