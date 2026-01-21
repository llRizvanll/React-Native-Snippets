import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_TASKS, GET_TASK_COUNT } from '../../data/graphql/queries';
import { CREATE_TASK, TOGGLE_TASK, DELETE_TASK } from '../../data/graphql/mutations';
import { mockApolloClient } from '../../data/mockServer';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}

interface CreateTaskVariables {
  title: string;
}

/**
 * ViewModel for Tasks with Optimistic Updates and Advanced Caching
 * Demonstrates:
 * - Optimistic updates for instant UI feedback
 * - Manual cache updates
 * - Cache policies
 */
export const useTaskViewModel = () => {
  const [offset, setOffset] = useState(0);
  const limit = 10;

  // Fetch tasks with cache-and-network policy
  const { data, loading, fetchMore } = useQuery<{ tasks: Task[] }>(
    GET_TASKS,
    {
      client: mockApolloClient,
      variables: { limit, offset: 0 },
      fetchPolicy: 'cache-and-network', // Return cache immediately, then fetch fresh data
      notifyOnNetworkStatusChange: true,
    }
  );

  // Fetch task count
  const { data: countData } = useQuery<{ taskCount: number }>(
    GET_TASK_COUNT,
    {
      client: mockApolloClient,
      fetchPolicy: 'cache-first', // Use cache if available
    }
  );

  // Create task mutation with optimistic update
  const [createTask] = useMutation<{ createTask: Task }, CreateTaskVariables>(
    CREATE_TASK,
    {
      client: mockApolloClient,
      // Optimistic response - UI updates immediately
      optimisticResponse: (variables: CreateTaskVariables) => ({
        createTask: {
          id: `temp-${Date.now()}`,
          title: variables.title,
          completed: false,
          createdAt: new Date().toISOString(),
          __typename: 'Task',
        },
      }),
      // Update cache after mutation
      update: (cache: any, { data }: { data: { createTask: Task } }) => {
        if (!data) return;

        // Read existing tasks from cache
        const existingData = cache.readQuery({
          query: GET_TASKS,
          variables: { limit, offset: 0 },
        });

        if (existingData) {
          // Write updated tasks to cache
          cache.writeQuery({
            query: GET_TASKS,
            variables: { limit, offset: 0 },
            data: {
              tasks: [data.createTask, ...existingData.tasks],
            },
          });
        }

        // Update task count
        const countData = cache.readQuery({
          query: GET_TASK_COUNT,
        });

        if (countData) {
          cache.writeQuery({
            query: GET_TASK_COUNT,
            data: {
              taskCount: countData.taskCount + 1,
            },
          });
        }
      },
    }
  );

  // Toggle task mutation with optimistic update
  const [toggleTask] = useMutation<{ toggleTask: Task }, { id: string }>(
    TOGGLE_TASK,
    {
      client: mockApolloClient,
      // Optimistic response - find task from current data
      optimisticResponse: (variables: { id: string }) => {
        const task = data?.tasks.find((t: Task) => t.id === variables.id);
        if (!task) {
          // Fallback optimistic response
          return {
            toggleTask: {
              id: variables.id,
              title: '',
              completed: false,
              createdAt: new Date().toISOString(),
              __typename: 'Task',
            },
          };
        }

        return {
          toggleTask: {
            ...task,
            completed: !task.completed,
            __typename: 'Task',
          },
        };
      },
      update: (cache: any, { data }: { data: { toggleTask: Task } }) => {
        if (!data) return;

        // Update task in cache
        const existingData = cache.readQuery({
          query: GET_TASKS,
          variables: { limit, offset: 0 },
        });

        if (existingData) {
          cache.writeQuery({
            query: GET_TASKS,
            variables: { limit, offset: 0 },
            data: {
              tasks: existingData.tasks.map((task: Task) =>
                task.id === data.toggleTask.id ? data.toggleTask : task
              ),
            },
          });
        }
      },
    }
  );

  // Delete task mutation with optimistic update
  const [deleteTask] = useMutation<{ deleteTask: { id: string; success: boolean } }, { id: string }>(
    DELETE_TASK,
    {
      client: mockApolloClient,
      optimisticResponse: (variables: { id: string }) => ({
        deleteTask: {
          id: variables.id,
          success: true,
          __typename: 'DeleteResponse',
        },
      }),
      update: (cache: any, { data }: { data: { deleteTask: { id: string; success: boolean } } }) => {
        if (!data) return;

        // Remove task from cache
        const existingData = cache.readQuery({
          query: GET_TASKS,
          variables: { limit, offset: 0 },
        });

        if (existingData) {
          cache.writeQuery({
            query: GET_TASKS,
            variables: { limit, offset: 0 },
            data: {
              tasks: existingData.tasks.filter((task: Task) => task.id !== data.deleteTask.id),
            },
          });
        }

        // Update task count
        const countData = cache.readQuery({
          query: GET_TASK_COUNT,
        });

        if (countData) {
          cache.writeQuery({
            query: GET_TASK_COUNT,
            data: {
              taskCount: Math.max(0, countData.taskCount - 1),
            },
          });
        }
      },
    }
  );

  const handleCreateTask = async (title: string) => {
    try {
      await createTask({
        variables: { title },
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  const handleToggleTask = async (id: string) => {
    try {
      await toggleTask({ variables: { id } });
    } catch (error) {
      console.error('Failed to toggle task:', error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await deleteTask({ variables: { id } });
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return {
    tasks: data?.tasks || [],
    taskCount: countData?.taskCount || 0,
    loading,
    createTask: handleCreateTask,
    toggleTask: handleToggleTask,
    deleteTask: handleDeleteTask,
    loadMore: () => {
      const newOffset = offset + limit;
      setOffset(newOffset);
      fetchMore({
        variables: { limit, offset: newOffset },
      });
    },
  };
};
