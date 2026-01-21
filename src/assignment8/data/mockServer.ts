/**
 * Mock GraphQL Server with Subscriptions Support
 * Simulates real-time features using polling mechanism for React Native
 * Note: In production, use WebSocket-based subscriptions
 */

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { SchemaLink } from '@apollo/client/link/schema';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { GET_MESSAGES } from './graphql/queries';

// In-memory stores
let messagesStore: Record<string, Array<{
  id: string;
  text: string;
  author: string;
  createdAt: string;
}>> = {};

let chatsStore: Array<{
  id: string;
  name: string;
  lastMessage: string;
  updatedAt: string;
}> = [
  {
    id: '1',
    name: 'General Chat',
    lastMessage: 'Welcome to the chat!',
    updatedAt: new Date().toISOString(),
  },
];

// Initialize messages for default chat
messagesStore['1'] = [
  {
    id: '1',
    text: 'Welcome to the chat!',
    author: 'System',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
];

// Track last message ID for each chat (for subscription simulation)
let lastMessageIds: Record<string, string> = { '1': '1' };

// Mock schema
const typeDefs = `
  type Message {
    id: ID!
    text: String!
    author: String!
    createdAt: String!
  }

  type Chat {
    id: ID!
    name: String!
    lastMessage: String
    updatedAt: String!
  }

  type Query {
    messages(chatId: ID!): [Message!]!
    chats: [Chat!]!
    newMessages(chatId: ID!, afterId: ID): [Message!]!
  }

  type Mutation {
    sendMessage(chatId: ID!, text: String!, author: String!): Message!
    createChat(name: String!): Chat!
  }
`;

// Mock resolvers
const resolvers = {
  Query: {
    messages: (_: any, { chatId }: { chatId: string }) => {
      return messagesStore[chatId] || [];
    },
    chats: () => chatsStore,
    newMessages: (_: any, { chatId, afterId }: { chatId: string; afterId?: string }) => {
      const messages = messagesStore[chatId] || [];
      if (!afterId) {
        return messages;
      }
      const afterIndex = messages.findIndex(m => m.id === afterId);
      return afterIndex >= 0 ? messages.slice(afterIndex + 1) : [];
    },
  },
  Mutation: {
    sendMessage: (_: any, { chatId, text, author }: { chatId: string; text: string; author: string }) => {
      const message = {
        id: String(Date.now()),
        text,
        author,
        createdAt: new Date().toISOString(),
      };

      if (!messagesStore[chatId]) {
        messagesStore[chatId] = [];
      }
      messagesStore[chatId].push(message);
      lastMessageIds[chatId] = message.id;

      // Update chat
      const chat = chatsStore.find(c => c.id === chatId);
      if (chat) {
        chat.lastMessage = text;
        chat.updatedAt = new Date().toISOString();
      }

      return message;
    },
    createChat: (_: any, { name }: { name: string }) => {
      const chat = {
        id: String(Date.now()),
        name,
        lastMessage: null,
        updatedAt: new Date().toISOString(),
      };
      chatsStore.push(chat);
      messagesStore[chat.id] = [];
      lastMessageIds[chat.id] = '';
      return chat;
    },
  },
};

// Create executable schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create Apollo Client
export const mockApolloClient = new ApolloClient({
  link: new SchemaLink({ schema }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          messages: {
            merge(existing = [], incoming) {
              // Merge messages, avoiding duplicates
              const existingIds = new Set(existing.map((m: any) => m.id));
              const newMessages = incoming.filter((m: any) => !existingIds.has(m.id));
              return [...existing, ...newMessages];
            },
          },
        },
      },
    },
  }),
});

// Helper to simulate subscription by polling
export const simulateSubscription = (
  chatId: string,
  callback: (data: any) => void,
  interval: number = 2000
) => {
  let lastId = lastMessageIds[chatId] || '';
  
  const poll = async () => {
    try {
      const result = await mockApolloClient.query({
        query: GET_MESSAGES,
        variables: { chatId },
        fetchPolicy: 'network-only',
      });
      
      const messages = result.data.messages || [];
      const newMessages = messages.filter((m: any) => {
        if (!lastId) return false;
        const lastIndex = messages.findIndex((msg: any) => msg.id === lastId);
        return lastIndex >= 0 && messages.indexOf(m) > lastIndex;
      });
      
      if (newMessages.length > 0) {
        newMessages.forEach((msg: any) => {
          callback({ data: { messageAdded: msg } });
        });
        lastId = messages[messages.length - 1].id;
      }
    } catch (error) {
      console.error('Subscription polling error:', error);
    }
  };
  
  const intervalId = setInterval(poll, interval);
  poll(); // Initial poll
  
  return () => clearInterval(intervalId);
};
