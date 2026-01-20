import { useState, useCallback, useMemo, useEffect } from 'react';
import { Post, generateMockPosts } from '../../data/models';

export const useSocialFeedViewModel = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);

  const PAGE_SIZE = 20;

  const loadPosts = useCallback(async (isInitial = false) => {
    if (isLoading) return;
    
    setIsLoading(true);
    // Simulate API delay
    await new Promise(resolve => setTimeout(() => resolve(null), 1000));
    
    const newPosts = generateMockPosts(PAGE_SIZE, isInitial ? 0 : page * PAGE_SIZE);
    
    setAllPosts(prev => isInitial ? newPosts : [...prev, ...newPosts]);
    if (isInitial) setPage(1);
    else setPage(prev => prev + 1);
    
    setIsLoading(false);
  }, [page, isLoading]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    const newPosts = generateMockPosts(PAGE_SIZE, 0);
    setAllPosts(newPosts);
    setPage(1);
    setIsRefreshing(false);
  }, []);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Filter posts based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(allPosts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = allPosts.filter(
        post => 
          post.username.toLowerCase().includes(query) || 
          post.content.toLowerCase().includes(query)
      );
      setFilteredPosts(filtered);
    }
  }, [searchQuery, allPosts]);

  const toggleLike = useCallback((postId: string) => {
    // Optimistic Update
    setAllPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  }, []);

  useEffect(() => {
    loadPosts(true);
  }, []);

  return {
    posts: filteredPosts,
    isLoading,
    isRefreshing,
    searchQuery,
    onRefresh,
    onLoadMore: () => loadPosts(false),
    handleSearch,
    toggleLike,
  };
};
