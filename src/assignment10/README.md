# Assignment 10: GraphQL User List & Search

## Problem Statement
Build a React Native screen that fetches a list of users from a dummy GraphQL API, displays them in a FlatList, and provides search functionality to filter users by name, email, or role.

**Requirements:**
- Fetch a list of users from a dummy GraphQL API
- Show appropriate loading and error components as needed
- Display the users in a FlatList
- Call the GraphQL API to search for users (query already provided)
- Display the search results

## Technical Details

### 1. GraphQL Queries
This assignment uses two GraphQL queries:

**Get All Users:**
```graphql
query GetUsers {
  users {
    id
    name
    email
    avatar
    role
    createdAt
  }
}
```

**Search Users:**
```graphql
query SearchUsers($query: String!) {
  searchUsers(query: $query) {
    id
    name
    email
    avatar
    role
    createdAt
  }
}
```

### 2. Apollo Client Setup
- Uses mock Apollo Client with SchemaLink
- In-memory cache for efficient data management
- Network-only fetch policy for search queries to ensure fresh results

### 3. State Management
The ViewModel (`useUserSearchViewModel`) handles:
- **User List State**: Fetches and manages the list of all users
- **Search State**: Manages search query and results
- **Loading States**: Separate loading states for list and search
- **Error Handling**: Proper error states for both operations

### 4. UI Components

#### LoadingComponent
- Displays a loading spinner with message
- Used during initial data fetch and search operations

#### ErrorComponent
- Shows error message with retry functionality
- Provides user-friendly error feedback

#### UserItem
- Displays individual user information
- Shows avatar, name, email, and role
- Styled card component

#### SearchBar
- Text input for search queries
- Clear button to reset search
- Real-time search as user types

### 5. FlatList Implementation
- Efficient rendering of user list
- Key extraction for optimal performance
- Empty state handling for both no users and no search results
- Pull-to-refresh capability (can be added)

### 6. Search Functionality
- Real-time search as user types
- Searches across name, email, and role fields
- Conditional query execution (skips when search is empty)
- Displays search result count

## Key Learning Points

1. **GraphQL Query Management**: Using multiple queries for different operations
2. **Conditional Queries**: Skipping queries based on state (empty search)
3. **Loading States**: Managing separate loading states for different operations
4. **Error Handling**: Proper error states and retry mechanisms
5. **FlatList Optimization**: Efficient list rendering in React Native
6. **Search UX**: Real-time search with proper feedback
7. **Empty States**: Handling various empty state scenarios

## File Structure

```
assignment10/
├── data/
│   ├── graphql/
│   │   └── queries.ts          # GraphQL queries
│   └── mockServer.ts           # Mock GraphQL server
├── presentation/
│   ├── components/
│   │   └── molecules/
│   │       ├── LoadingComponent.tsx
│   │       ├── ErrorComponent.tsx
│   │       ├── UserItem.tsx
│   │       └── SearchBar.tsx
│   ├── pages/
│   │   └── UserSearchPage.tsx   # Main page
│   └── viewModels/
│       └── useUserSearchViewModel.ts
└── README.md
```

## Usage

1. The page automatically fetches users on mount
2. Users are displayed in a scrollable FlatList
3. Type in the search bar to filter users
4. Search results update in real-time
5. Clear search to return to full user list

## Technical Highlights

- **MVVM Pattern**: Clear separation of concerns
- **Type Safety**: Full TypeScript support
- **Error Boundaries**: Comprehensive error handling
- **Performance**: Optimized FlatList rendering
- **UX**: Loading states, error states, and empty states
- **GraphQL Best Practices**: Proper query structure and caching
