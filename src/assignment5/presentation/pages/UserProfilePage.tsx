import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useUserProfileViewModel } from '../viewModels/useUserProfileViewModel';
import { UserProfileCard } from '../components/molecules/UserProfileCard';

interface Props {
  onBack: () => void;
}

export const UserProfilePage: React.FC<Props> = ({ onBack }) => {
  const { user, loading, error, refetch } = useUserProfileViewModel('1');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>User Profile</Text>
        <TouchableOpacity onPress={() => refetch()} style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>↻</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GraphQL Query Example</Text>
          <Text style={styles.sectionDescription}>
            This screen demonstrates a basic GraphQL query using Apollo Client.
            The query fetches user profile data including name, email, avatar, and bio.
          </Text>
        </View>

        <UserProfileCard user={user} loading={loading} error={error} />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Technical Details:</Text>
          <Text style={styles.infoText}>
            • Using Apollo Client's useQuery hook{'\n'}
            • Mock GraphQL server for demonstration{'\n'}
            • Type-safe queries with TypeScript{'\n'}
            • Automatic loading and error state handling{'\n'}
            • Cache-first fetch policy
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#6200EE',
    fontWeight: '600',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  refreshButton: {
    padding: 8,
  },
  refreshButtonText: {
    fontSize: 20,
    color: '#6200EE',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  infoBox: {
    marginTop: 24,
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1976D2',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#424242',
    lineHeight: 20,
  },
});
