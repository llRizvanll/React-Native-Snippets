import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useUserSearchViewModel } from '../viewModels/useUserSearchViewModel';
import { LoadingComponent } from '../components/molecules/LoadingComponent';
import { ErrorComponent } from '../components/molecules/ErrorComponent';
import { UserItem } from '../components/molecules/UserItem';
import { SearchBar } from '../components/molecules/SearchBar';

interface Props {
  onBack: () => void;
}

export const UserSearchPage: React.FC<Props> = ({ onBack }) => {
  const {
    users,
    loading,
    error,
    searchQuery,
    isSearching,
    handleSearch,
    clearSearch,
    refetchUsers,
  } = useUserSearchViewModel();

  const renderUserItem = ({ item }: { item: any }) => <UserItem user={item} />;

  const renderEmptyState = () => {
    if (loading) {
      return <LoadingComponent message={isSearching ? 'Searching users...' : 'Loading users...'} />;
    }

    if (error) {
      return <ErrorComponent message={error} onRetry={isSearching ? undefined : refetchUsers} />;
    }

    if (isSearching && users.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🔍</Text>
          <Text style={styles.emptyTitle}>No users found</Text>
          <Text style={styles.emptyMessage}>
            Try searching with a different term
          </Text>
        </View>
      );
    }

    if (!isSearching && users.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>👥</Text>
          <Text style={styles.emptyTitle}>No users available</Text>
          <Text style={styles.emptyMessage}>
            There are no users to display at the moment
          </Text>
        </View>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>User Search</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={handleSearch}
          onClear={clearSearch}
          placeholder="Search by name, email, or role..."
        />

        {loading && !isSearching ? (
          <LoadingComponent message="Loading users..." />
        ) : error && !isSearching ? (
          <ErrorComponent message={error} onRetry={refetchUsers} />
        ) : (
          <FlatList
            data={users}
            renderItem={renderUserItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={renderEmptyState}
            showsVerticalScrollIndicator={false}
          />
        )}

        {isSearching && (
          <View style={styles.searchInfo}>
            <Text style={styles.searchInfoText}>
              {loading
                ? 'Searching...'
                : `Found ${users.length} ${users.length === 1 ? 'user' : 'users'}`}
            </Text>
          </View>
        )}
      </View>
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
  placeholder: {
    width: 60,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  listContent: {
    paddingBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  searchInfo: {
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginTop: 8,
  },
  searchInfoText: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
    fontWeight: '600',
  },
});
