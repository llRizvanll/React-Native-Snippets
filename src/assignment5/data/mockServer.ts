/**
 * Mock GraphQL Server
 * This simulates a GraphQL API for development/testing purposes
 * In production, replace Apollo Client link with actual server endpoint
 */

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

// Mock schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
    email: String!
    avatar: String
    bio: String
    createdAt: String!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
  }
`;

// Mock resolvers with realistic data
const mocks = {
  User: () => ({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Software engineer passionate about React Native and GraphQL. Love building scalable mobile applications.',
    createdAt: new Date().toISOString(),
  }),
  Query: () => ({
    user: () => ({
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      bio: 'Software engineer passionate about React Native and GraphQL. Love building scalable mobile applications.',
      createdAt: new Date().toISOString(),
    }),
  }),
};

// Create executable schema
const schema = makeExecutableSchema({ typeDefs });

// Add mocks to schema
const schemaWithMocks = addMocksToSchema({ schema, mocks });

// Create Apollo Client with mock server
export const mockApolloClient = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache(),
});
