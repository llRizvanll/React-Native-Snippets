import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// Mock GraphQL endpoint - In production, replace with your actual GraphQL API
const GRAPHQL_ENDPOINT = 'https://api.example.com/graphql';

// HTTP link for GraphQL queries
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

// Auth link (optional - for adding headers)
const authLink = setContext((_, { headers }) => {
  // Get authentication token from storage if available
  const token = null; // Replace with actual token retrieval
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create Apollo Client instance
export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    // Cache configuration
    typePolicies: {
      Query: {
        fields: {
          user: {
            // Cache policy for user queries
            merge(existing, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
  // Enable error handling
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  },
});
