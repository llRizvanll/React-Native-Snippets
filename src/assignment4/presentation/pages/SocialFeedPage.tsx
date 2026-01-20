import React, { useCallback } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, SafeAreaView, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { useSocialFeedViewModel } from '../viewModels/SocialFeedViewModel';
import { PostCard } from '../components/organisms';
import { SearchBar } from '../components/molecules';
import { Post } from '../../data/models';

interface Props {
  onBack?: () => void;
}

export const SocialFeedPage: React.FC<Props> = ({ onBack }) => {
  const {
    posts,
    isLoading,
    isRefreshing,
    searchQuery,
    onRefresh,
    onLoadMore,
    handleSearch,
    toggleLike,
  } = useSocialFeedViewModel();

  // Optimized Render Item
  const renderItem = useCallback(({ item }: { item: Post }) => (
    <PostCard post={item} onLike={toggleLike} />
  ), [toggleLike]);

  // keyExtractor is crucial for performance
  const keyExtractor = useCallback((item: Post) => item.id, []);

  const ListFooter = () => (
    isLoading ? (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#0000ff" />
      </View>
    ) : null
  );

  const ListEmpty = () => (
    !isLoading ? (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No posts found matching "{searchQuery}"</Text>
      </View>
    ) : null
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>← Dashboard</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Social Feed</Text>
      </View>
      <SearchBar value={searchQuery} onChangeText={handleSearch} />
      
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        
        // --- PERFORMANCE PROPS ---
        initialNumToRender={5} // Render few items initially for fast startup
        maxToRenderPerBatch={10} // Control how many items are rendered per batch
        windowSize={5} // Reduce memory by only keeping items near current view
        removeClippedSubviews={true} // Unmount components off-screen
        getItemLayout={(data, index) => (
          // Use fixed height if items are roughly same height to avoid dynamic measurement
          { length: 450, offset: 450 * index, index }
        )}
        
        // --- INTERACTIONS ---
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        
        ListFooterComponent={ListFooter}
        ListEmptyComponent={ListEmpty}
        
        // Improve perceived performance
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f8f8' },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#fff', 
    borderBottomWidth: 1, 
    borderBottomColor: '#eee' 
  },
  backButton: { marginRight: 16 },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  footerLoader: { paddingVertical: 20, alignItems: 'center' },
  emptyContainer: { flex: 1, padding: 40, alignItems: 'center' },
  emptyText: { fontSize: 16, color: '#666', textAlign: 'center' },
});
