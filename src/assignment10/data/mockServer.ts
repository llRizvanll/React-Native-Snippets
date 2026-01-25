/**
 * Mock GraphQL Server for User List and Search
 * Simulates a GraphQL API with users data and search functionality
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';

// User interface
interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  createdAt: string;
}

// In-memory store for users
const usersStore: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'Software Engineer',
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'Product Manager',
    createdAt: new Date(Date.now() - 86400000 * 25).toISOString(),
  },
  {
    id: '3',
    name: 'Michael Johnson',
    email: 'michael.j@example.com',
    avatar: 'https://i.pravatar.cc/150?img=3',
    role: 'Designer',
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@example.com',
    avatar: 'https://i.pravatar.cc/150?img=4',
    role: 'Developer',
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david.brown@example.com',
    avatar: 'https://i.pravatar.cc/150?img=5',
    role: 'QA Engineer',
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
  {
    id: '6',
    name: 'Emily Davis',
    email: 'emily.davis@example.com',
    avatar: 'https://i.pravatar.cc/150?img=6',
    role: 'DevOps Engineer',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '7',
    name: 'Robert Wilson',
    email: 'robert.w@example.com',
    avatar: 'https://i.pravatar.cc/150?img=7',
    role: 'Backend Developer',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    avatar: 'https://i.pravatar.cc/150?img=8',
    role: 'Frontend Developer',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

// Mock schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    role: String!
    createdAt: String!
  }

  type Query {
    users: [User!]!
    searchUsers(query: String!): [User!]!
  }
`;

// Mock resolvers
const resolvers = {
  Query: {
    users: () => usersStore,
    searchUsers: (_: any, { query }: { query: string }) => {
      if (!query || query.trim() === '') {
        return [];
      }
      const searchTerm = query.toLowerCase();
      return usersStore.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm) ||
          user.role.toLowerCase().includes(searchTerm)
      );
    },
  },
};

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create Apollo Client with mock server
export const mockApolloClient = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache(),
});
