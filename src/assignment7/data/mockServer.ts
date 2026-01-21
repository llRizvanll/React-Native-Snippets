/**
 * Mock GraphQL Server with Advanced Features
 * Supports optimistic updates, caching, and pagination
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

// Mock schema
const typeDefs = `
  type Task {
    id: ID!
    title: String!
    completed: Boolean!
    createdAt: String!
  }

  type DeleteResponse {
    id: ID!
    success: Boolean!
  }

  type Query {
    tasks(limit: Int, offset: Int): [Task!]!
    taskCount: Int!
  }

  type Mutation {
    createTask(title: String!): Task!
    toggleTask(id: ID!): Task!
    deleteTask(id: ID!): DeleteResponse!
  }
`;

// In-memory store for tasks
let tasksStore: Array<{
  id: string;
  title: string;
  completed: boolean;
  createdAt: string;
}> = [
  {
    id: '1',
    title: 'Learn GraphQL basics',
    completed: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '2',
    title: 'Implement optimistic updates',
    completed: false,
    createdAt: new Date(Date.now() - 43200000).toISOString(),
  },
  {
    id: '3',
    title: 'Master Apollo cache management',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

// Mock resolvers
const resolvers = {
  Query: {
    tasks: (_: any, { limit, offset }: { limit?: number; offset?: number }) => {
      let result = [...tasksStore];
      if (offset) {
        result = result.slice(offset);
      }
      if (limit) {
        result = result.slice(0, limit);
      }
      return result;
    },
    taskCount: () => tasksStore.length,
  },
  Mutation: {
    createTask: (_: any, { title }: { title: string }) => {
      // Simulate network delay
      const newTask = {
        id: String(Date.now()),
        title,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      tasksStore.push(newTask);
      return newTask;
    },
    toggleTask: (_: any, { id }: { id: string }) => {
      const task = tasksStore.find(t => t.id === id);
      if (!task) {
        throw new Error('Task not found');
      }
      task.completed = !task.completed;
      return task;
    },
    deleteTask: (_: any, { id }: { id: string }) => {
      const taskIndex = tasksStore.findIndex(t => t.id === id);
      if (taskIndex === -1) {
        throw new Error('Task not found');
      }
      tasksStore.splice(taskIndex, 1);
      return { id, success: true };
    },
  },
};

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Add mocks for fields not covered by resolvers
const schemaWithMocks = addMocksToSchema({ schema });

// Create Apollo Client with advanced cache configuration
export const mockApolloClient = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          tasks: {
            // Merge function for pagination
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            },
            // Read function for pagination
            read(existing = []) {
              return existing;
            },
          },
        },
      },
    },
  }),
  // Default options
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});
