import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { useTaskViewModel } from '../viewModels/useTaskViewModel';
import { TaskItem } from '../components/molecules/TaskItem';
import { TaskInput } from '../components/molecules/TaskInput';

interface Props {
  onBack: () => void;
}

export const TaskManagementPage: React.FC<Props> = ({ onBack }) => {
  const { tasks, taskCount, loading, createTask, toggleTask, deleteTask } = useTaskViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Task Manager</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{taskCount}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Optimistic Updates & Caching</Text>
          <Text style={styles.sectionDescription}>
            This screen demonstrates advanced Apollo Client features:
            optimistic updates for instant UI feedback, intelligent caching,
            and manual cache manipulation.
          </Text>
        </View>

        <TaskInput onSubmit={createTask} loading={loading} />

        <View style={styles.tasksHeader}>
          <Text style={styles.tasksTitle}>Tasks ({tasks.length})</Text>
          <Text style={styles.hintText}>
            Tap to toggle • Optimistic updates enabled
          </Text>
        </View>

        {tasks.length === 0 && !loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks yet. Add your first task!</Text>
          </View>
        ) : (
          <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onToggle={toggleTask}
                onDelete={deleteTask}
              />
            )}
            scrollEnabled={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Loading tasks...</Text>
              </View>
            }
          />
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Technical Details:</Text>
          <Text style={styles.infoText}>
            • Optimistic updates: UI updates instantly before server response{'\n'}
            • Cache policies: cache-and-network for queries{'\n'}
            • Manual cache updates: Direct cache manipulation in mutations{'\n'}
            • Automatic rollback: Failed mutations revert optimistic updates{'\n'}
            • Cache-first for counts: Reduces unnecessary network requests
          </Text>
        </View>

        <View style={styles.tipBox}>
          <Text style={styles.tipTitle}>💡 Try This:</Text>
          <Text style={styles.tipText}>
            Toggle a task and notice how it updates instantly (optimistic update).
            The UI feels snappy even with network latency!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6200EE',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  countBadge: {
    backgroundColor: '#6200EE',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    minWidth: 32,
    alignItems: 'center',
  },
  countText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tasksHeader: {
    marginBottom: 12,
  },
  tasksTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  hintText: {
    fontSize: 12,
    color: '#999',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  infoBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
  tipBox: {
    marginTop: 16,
    padding: 16,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});
