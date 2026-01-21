import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface Props {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete }) => {
  return (
    <View style={[styles.container, task.completed && styles.completedContainer]}>
      <TouchableOpacity
        style={styles.content}
        onPress={() => onToggle(task.id)}
        activeOpacity={0.7}
      >
        <View style={[styles.checkbox, task.completed && styles.checkboxChecked]}>
          {task.completed && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, task.completed && styles.completedTitle]}>
            {task.title}
          </Text>
          <Text style={styles.date}>
            {new Date(task.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => onDelete(task.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.deleteIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  completedContainer: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDD',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  completedTitle: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 20,
    color: '#D32F2F',
  },
});
