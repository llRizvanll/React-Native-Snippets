export interface Post {
  id: string;
  username: string;
  avatarUrl: string;
  content: string;
  imageUrl: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  timestamp: string;
}

export const generateMockPosts = (count: number, startIndex: number = 0): Post[] => {
  return Array.from({ length: count }).map((_, index) => {
    const id = (startIndex + index).toString();
    return {
      id,
      username: `user_${id}`,
      avatarUrl: `https://i.pravatar.cc/150?u=${id}`,
      content: `This is post number ${id}. Exploring performance in React Native! #coding #reactnative`,
      imageUrl: `https://picsum.photos/id/${(parseInt(id) % 50) + 1}/600/400`,
      likes: Math.floor(Math.random() * 500),
      comments: Math.floor(Math.random() * 50),
      isLiked: false,
      timestamp: new Date().toISOString(),
    };
  });
};
