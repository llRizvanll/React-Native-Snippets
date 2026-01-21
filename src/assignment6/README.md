# Assignment 6: GraphQL Mutations - Create/Update Posts (Intermediate Level)

## Problem Statement
Build a React Native app that allows users to create and update posts using GraphQL mutations. This assignment focuses on understanding mutations, form handling with GraphQL, and managing mutation states.

**Requirements:**
- Create a form to add new posts (title, content, author)
- Update existing posts
- Handle mutation loading states
- Show success/error feedback
- Refetch queries after mutations
- Use Apollo Client's `useMutation` hook

## Technical Details

### 1. GraphQL Mutations
Mutations are used to modify data on the server. Unlike queries (which are read-only), mutations can:
- Create new resources
- Update existing resources
- Delete resources
- Return the modified data in the response

### 2. Mutation Hook Pattern
Apollo Client's `useMutation` hook provides:
- **Execute function**: Call the mutation with variables
- **Loading state**: Track when mutation is in progress
- **Error handling**: Access mutation errors
- **Data**: Access the mutation response

### 3. Cache Updates
After a mutation, we need to update the Apollo cache:
- **Refetch queries**: Re-execute queries to get fresh data
- **Optimistic updates**: Update UI immediately before server responds
- **Cache modification**: Directly update cache using `update` function

### 4. Form State Management
Combining React form state with GraphQL mutations:
- Local state for form inputs
- Validation before mutation execution
- Reset form after successful mutation

## Key Learning Points
1. **Mutations vs Queries**: Understanding when to use mutations
2. **Cache Management**: Keeping Apollo cache in sync after mutations
3. **Error Handling**: Proper error messages for users
4. **Loading States**: Providing feedback during mutations
5. **Refetch Patterns**: Different strategies for updating data after mutations
