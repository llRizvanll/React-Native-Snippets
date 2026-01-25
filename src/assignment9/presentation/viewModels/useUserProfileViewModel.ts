import { useState, useCallback } from 'react';

interface UserStats {
  posts: number;
  followers: number;
  following: number;
}

interface UserProfile {
  avatar: { uri: string };
  name: string;
  role: string;
  status: string;
  stats: UserStats;
  bio: string;
}

/**
 * ViewModel: useUserProfileViewModel
 * Manages the state and logic for the user profile page
 */
export const useUserProfileViewModel = () => {
  const [user] = useState<UserProfile>({
    avatar: {
      uri: 'https://i.pravatar.cc/150?img=12',
    },
    name: 'Sarah Johnson',
    role: 'Senior Developer',
    status: 'Active',
    stats: {
      posts: 128,
      followers: 1240,
      following: 342,
    },
    bio: 'Passionate about building beautiful and functional mobile applications. Love sharing knowledge and learning from the community.',
  });

  const handleCardPress = useCallback(() => {
    console.log('User card pressed');
    // Handle card press logic here
  }, []);

  return {
    user,
    handleCardPress,
  };
};
