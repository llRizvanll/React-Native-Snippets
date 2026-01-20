# Assignment 4: High-Performance Social Feed

## Problem Statement
Build a high-performance "Social Media Feed" that lists posts with images, text, and interactions (likes, comments). This assignment focuses on optimization techniques for large lists and handling complex UI states in React Native.

## Technical Explanation: How we achieved 60FPS

To maintain high performance in a heavy list like a social feed, we implemented the following strategies:

### 1. FlatList Configuration
- **`windowSize={5}`**: Reduces memory usage by keeping only a small number of screens (off-screen) rendered.
- **`initialNumToRender={5}`**: Ensures the first meaningful paint is fast.
- **`maxToRenderPerBatch={10}`**: Prevents the JS thread from being blocked by rendering too many items at once.
- **`getItemLayout`**: Bypasses dynamic layout measurement, which is expensive.
- **`removeClippedSubviews={true}`**: Helps in memory management by unmounting components that are completely off-screen.

### 2. Memoization Strategy
- **`React.memo` with custom comparison**: The `PostCard` component only re-renders if its specific data (likes, content) changes.
- **`useCallback`**: All event handlers (like `onLike`) are wrapped in `useCallback` to prevent property reference changes onEvery render.

### 3. State Management (MVVM)
- **ViewModel Logic**: Pagination and filtering are handled in `useSocialFeedViewModel`. 
- **Optimistic Updates**: When a user clicks "Like", the UI updates immediately before any "mock API" call completes, providing a snappy user experience.

---

## How to achieve this quickly?
1. **Reuse Pattern**: Consistently use the Atomic Design + MVVM pattern. Once established, adding new features (like comments) is just adding a new Atom/Molecule.
2. **Stable Keys**: Always use a unique, stable `id` for `keyExtractor`. Avoid using `index`.
3. **Avoid Inline Functions**: Never define arrow functions inside `renderItem`. Always use `useCallback`.

