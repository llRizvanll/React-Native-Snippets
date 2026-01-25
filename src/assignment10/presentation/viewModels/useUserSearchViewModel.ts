import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_USERS, SEARCH_USERS } from '../../data/graphql/queries';
import { mockApolloClient } from '../../data/mockServer';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: string;
  createdAt: string;
}

interface GetUsersData {
  users: User[];
}

interface SearchUsersData {
  searchUsers: User[];
}

interface SearchUsersVariables {
  query: string;
}

/**
 * ViewModel for User Search
 * Handles:
 * - Fetching list of users
 * - Searching users by query
 * - Loading and error states
 */
export const useUserSearchViewModel = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch all users
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useQuery<GetUsersData>(GET_USERS, {
    client: mockApolloClient,
    fetchPolicy: 'cache-and-network',
  });

  // Search users query (only execute when searchQuery is not empty)
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useQuery<SearchUsersData, SearchUsersVariables>(SEARCH_USERS, {
    client: mockApolloClient,
    variables: { query: searchQuery },
    skip: !searchQuery || searchQuery.trim() === '', // Skip query if search is empty
    fetchPolicy: 'network-only', // Always fetch fresh results for search
  });

  // Determine which data to display
  const isSearching = searchQuery.trim() !== '';
  const users = isSearching ? searchData?.searchUsers || [] : usersData?.users || [];
  const loading = isSearching ? searchLoading : usersLoading;
  const error = isSearching ? searchError : usersError;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    users,
    loading,
    error: error ? error.message : null,
    searchQuery,
    isSearching,
    handleSearch,
    clearSearch,
    refetchUsers,
  };
};
