import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Theme } from '../../../shared/theme';
import { Typography } from '../atoms/Typography';
import { Tag } from '../atoms/Tag';

interface SkillInputProps {
  skills: string[];
  onAddSkill: (skill: string) => void;
  onRemoveSkill: (skill: string) => void;
}

export const SkillInput: React.FC<SkillInputProps> = ({
  skills,
  onAddSkill,
  onRemoveSkill,
}) => {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      onAddSkill(text.trim());
      setText('');
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="label">Skills</Typography>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a skill (e.g. React Native)"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAdd}
          placeholderTextColor={Theme.colors.placeholder}
        />
        <TouchableOpacity onPress={handleAdd} style={styles.addButton}>
          <Typography color="#fff" style={styles.addText}>Add</Typography>
        </TouchableOpacity>
      </View>
      <View style={styles.tagsContainer}>
        {skills.map((skill) => (
          <Tag 
            key={skill} 
            label={skill} 
            onRemove={() => onRemoveSkill(skill)} 
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Theme.spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: Theme.borderRadius.md,
    backgroundColor: Theme.colors.surface,
    paddingLeft: Theme.spacing.md,
    height: 52,
    marginBottom: Theme.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Theme.colors.text,
  },
  addButton: {
    height: '100%',
    paddingHorizontal: Theme.spacing.md,
    backgroundColor: Theme.colors.primary,
    borderTopRightRadius: Theme.borderRadius.md - 1,
    borderBottomRightRadius: Theme.borderRadius.md - 1,
    justifyContent: 'center',
  },
  addText: {
    fontWeight: 'bold',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
