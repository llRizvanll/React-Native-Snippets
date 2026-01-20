import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Theme } from '../../../shared/theme';
import { Typography } from './Typography';

interface TagProps {
  label: string;
  onRemove?: () => void;
}

export const Tag: React.FC<TagProps> = ({ label, onRemove }) => {
  return (
    <View style={styles.container}>
      <Typography variant="body" style={styles.text}>{label}</Typography>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} style={styles.removeButton}>
          <Typography color="#fff" style={styles.removeText}>×</Typography>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.colors.primary,
    borderRadius: Theme.borderRadius.full,
    paddingLeft: Theme.spacing.md,
    paddingRight: Theme.spacing.sm,
    paddingVertical: 6,
    marginRight: Theme.spacing.xs,
    marginBottom: Theme.spacing.xs,
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: 'bold',
  },
});
