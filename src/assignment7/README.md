# Assignment 7: GraphQL Caching & Optimistic Updates (Advanced Level)

## Problem Statement
Build a React Native app that demonstrates advanced Apollo Client features including intelligent caching strategies, optimistic updates, and cache manipulation. This assignment focuses on performance optimization and user experience enhancement.

**Requirements:**
- Implement optimistic updates for instant UI feedback
- Configure custom cache policies (cache-first, network-only, etc.)
- Manually update Apollo cache after mutations
- Implement pagination with cache management
- Handle cache invalidation strategies
- Use `update` function in mutations for precise cache control

## Technical Details

### 1. Optimistic Updates
Optimistic updates allow the UI to update immediately before the server responds:
- **User Experience**: Instant feedback makes the app feel faster
- **Rollback**: If mutation fails, Apollo automatically reverts the optimistic update
- **Implementation**: Provide `optimisticResponse` in mutation options

### 2. Cache Policies
Apollo Client provides different fetch policies:
- **cache-first**: Use cache if available, otherwise fetch from network
- **cache-and-network**: Return cached data immediately, then fetch fresh data
- **network-only**: Always fetch from network, update cache
- **no-cache**: Fetch from network, don't cache
- **cache-only**: Only read from cache, never network

### 3. Cache Updates
Manual cache updates using `update` function:
- **Direct cache writes**: Modify cache directly using `cache.writeQuery` or `cache.writeFragment`
- **Cache reads**: Read from cache using `cache.readQuery` or `cache.readFragment`
- **Cache eviction**: Remove items from cache using `cache.evict`

### 4. Pagination Strategies
- **Offset-based**: Traditional page/limit pagination
- **Cursor-based**: More efficient for large datasets
- **Infinite scroll**: Load more data as user scrolls
- **Cache merging**: Properly merge paginated results in cache

## Key Learning Points
1. **Performance**: Optimistic updates improve perceived performance
2. **Cache Control**: Understanding when to use different cache policies
3. **User Experience**: Instant feedback vs. waiting for server response
4. **Error Handling**: Rollback strategies for failed optimistic updates
5. **Cache Management**: Advanced techniques for complex data relationships
