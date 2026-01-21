/**
 * Mock GraphQL Server for Mutations
 * Simulates a GraphQL API with mutations support
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { addMocksToSchema } from '@graphql-tools/mock';

// Mock schema with mutations
const typeDefs = `
  type Post {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
    updatedAt: String
  }

  type DeleteResponse {
    id: ID!
    success: Boolean!
  }

  type Query {
    posts: [Post!]!
    post(id: ID!): Post
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!): Post!
    updatePost(id: ID!, title: String, content: String): Post!
    deletePost(id: ID!): DeleteResponse!
  }
`;

// In-memory store for posts
let postsStore: Array<{
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}> = [
  {
    id: '1',
    title: 'Welcome to GraphQL',
    content: 'This is a sample post about GraphQL mutations.',
    author: 'John Doe',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'React Native Best Practices',
    content: 'Learn about React Native architecture and patterns.',
    author: 'Jane Smith',
    createdAt: new Date().toISOString(),
  },
];

// Mock resolvers with actual mutation logic
const resolvers = {
  Query: {
    posts: () => postsStore,
    post: (_: any, { id }: { id: string }) => postsStore.find(p => p.id === id),
  },
  Mutation: {
    createPost: (_: any, { title, content, author }: { title: string; content: string; author: string }) => {
      const newPost = {
        id: String(postsStore.length + 1),
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
      };
      postsStore.push(newPost);
      return newPost;
    },
    updatePost: (_: any, { id, title, content }: { id: string; title?: string; content?: string }) => {
      const postIndex = postsStore.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      const updatedPost = {
        ...postsStore[postIndex],
        ...(title && { title }),
        ...(content && { content }),
        updatedAt: new Date().toISOString(),
      };
      postsStore[postIndex] = updatedPost;
      return updatedPost;
    },
    deletePost: (_: any, { id }: { id: string }) => {
      const postIndex = postsStore.findIndex(p => p.id === id);
      if (postIndex === -1) {
        throw new Error('Post not found');
      }
      postsStore.splice(postIndex, 1);
      return { id, success: true };
    },
  },
};

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Add mocks only for fields not covered by resolvers
const schemaWithMocks = addMocksToSchema({ schema });

// Create Apollo Client with mock server
export const mockApolloClient = new ApolloClient({
  link: new SchemaLink({ schema: schemaWithMocks }),
  cache: new InMemoryCache(),
});
