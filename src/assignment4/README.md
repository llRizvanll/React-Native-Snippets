# Assignment 4: High-Performance Social Feed

## Problem Statement
Build a high-performance "Social Media Feed" that lists posts with images, text, and interactions (likes, comments). This assignment focuses on optimization techniques for large lists and handling complex UI states in React Native.

### Requirements:

#### 1. Data Handling
- **Mock Service**: Create a service that generates a list of 100+ posts.
- **Infinite Scroll**: Implement "Load More" functionality as the user scrolls to the bottom.
- **Pull-to-Refresh**: Allow users to refresh the feed.

#### 2. Performance Optimization
- **FlatList Optimization**: Use `memo`, `keyExtractor`, and `getItemLayout` (if fixed height) or `initialNumToRender` and `windowSize` to ensure 60fps scrolling.
- **Image Optimization**: Use a strategy for efficient image rendering (e.g., placeholder, caching, or resized images if using a real API).

#### 3. Features
- **Search & Filter**: Add a search bar to filter posts by username or content.
- **Post Interaction**: Implement "Like" and "Comment" buttons with immediate UI feedback (Optimistic updates).
- **Video Support**: (Optional/Bonus) Add support for video posts that auto-play when in view.

#### 4. Architecture
- **Clean Architecture**: Decouple the UI from the data fetching logic.
- **Performance Patterns**: Demonstrate the use of `useCallback` and `useMemo` to prevent unnecessary re-renders in list items.

## Technical Goals
- Mastering `FlatList` performance.
- Handling asynchronous data streams and pagination.
- Implementing robust search and filtering on the client-side.
- Managing complex state for individual list items.
