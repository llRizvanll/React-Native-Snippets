import { useQuery } from '@apollo/client/react';
import { GET_USER_PROFILE } from '../../data/graphql/queries';
import { mockApolloClient } from '../../data/mockServer';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
}

interface GetUserProfileData {
  user: UserProfile;
}

interface GetUserProfileVariables {
  userId: string;
}

/**
 * ViewModel for User Profile
 * Handles GraphQL query logic and state management
 */
export const useUserProfileViewModel = (userId: string = '1') => {
  const { data, loading, error, refetch } = useQuery<GetUserProfileData, GetUserProfileVariables>(
    GET_USER_PROFILE,
    {
      client: mockApolloClient, // Using mock client for demo
      variables: { userId },
      fetchPolicy: 'cache-and-network', // Fetch from cache first, then network
      errorPolicy: 'all', // Return partial data even if there are errors
    }
  );

  return {
    user: data?.user || null,
    loading,
    error: error ? error.message : null,
    refetch,
  };
};
