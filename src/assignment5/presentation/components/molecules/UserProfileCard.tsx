import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
}

interface Props {
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
}

export const UserProfileCard: React.FC<Props> = ({ user, loading, error }) => {
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#6200EE" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No user data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      {user.avatar && (
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
      )}
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
      <Text style={styles.createdAt}>
        Member since {new Date(user.createdAt).toLocaleDateString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    width: '100%',
    maxWidth: 400,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    backgroundColor: '#F0F0F0',
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  bio: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#D32F2F',
    textAlign: 'center',
  },
});
