# Assignment 5: GraphQL Basics - User Profile Query (Basic Level)

## Problem Statement
Build a React Native app that displays a user profile by fetching data from a GraphQL API. This assignment introduces the fundamentals of GraphQL queries, Apollo Client setup, and TypeScript type generation.

**Requirements:**
- Set up Apollo Client with a GraphQL endpoint
- Create a GraphQL query to fetch user profile data (name, email, avatar, bio)
- Display the user profile in a clean UI
- Handle loading and error states
- Use TypeScript with generated types from GraphQL schema

## Technical Details

### 1. Apollo Client Setup
Apollo Client is the industry-standard GraphQL client for React. It provides:
- **Automatic caching**: Queries are cached by default, reducing network requests
- **Type safety**: With code generation, we get full TypeScript support
- **Loading/Error states**: Built-in handling for async operations

### 2. GraphQL Query Structure
Unlike REST APIs, GraphQL allows clients to request exactly the data they need:
```graphql
query GetUserProfile($userId: ID!) {
  user(id: $userId) {
    id
    name
    email
    avatar
    bio
  }
}
```

### 3. Code Generation
Using `@graphql-codegen`, we generate TypeScript types from our GraphQL schema, ensuring:
- Type safety at compile time
- Autocomplete in IDEs
- Refactoring safety

### 4. MVVM Pattern
- **View**: `UserProfileView.tsx` - Pure UI component
- **ViewModel**: `useUserProfileViewModel.ts` - Handles Apollo query hooks
- **Model**: Generated types from GraphQL schema

## Key Learning Points
1. **GraphQL vs REST**: Understand the benefits of GraphQL's flexible querying
2. **Apollo Client Hooks**: `useQuery` hook for fetching data
3. **Type Safety**: Generated types prevent runtime errors
4. **Error Handling**: Proper error boundaries and user feedback
