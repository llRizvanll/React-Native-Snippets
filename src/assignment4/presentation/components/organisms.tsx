import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PostHeader, PostImage, IconButton } from './molecules';
import { Post } from '../../data/models';

interface PostCardProps {
  post: Post;
  onLike: (id: string) => void;
}

export const PostCard = memo(({ post, onLike }: PostCardProps) => {
  return (
    <View style={styles.card}>
      <PostHeader 
        username={post.username} 
        avatarUrl={post.avatarUrl} 
        timestamp={post.timestamp} 
      />
      <View style={styles.contentPadding}>
        <Text style={styles.content}>{post.content}</Text>
      </View>
      <PostImage url={post.imageUrl} />
      <View style={styles.actions}>
        <IconButton 
          icon={post.isLiked ? '❤️' : '🤍'} 
          count={post.likes} 
          color={post.isLiked ? '#ff4444' : '#666'}
          onPress={() => onLike(post.id)} 
        />
        <IconButton 
          icon="💬" 
          count={post.comments} 
        />
        <IconButton icon="✈️" />
      </View>
    </View>
  );
}, (prevProps, nextProps) => {
  // Only re-render if the post data itself changed (specifically likes or isLiked in this case)
  return (
    prevProps.post.id === nextProps.post.id &&
    prevProps.post.likes === nextProps.post.likes &&
    prevProps.post.isLiked === nextProps.post.isLiked &&
    prevProps.post.content === nextProps.post.content
  );
});

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', marginBottom: 12, borderTopWidth: 0.5, borderTopColor: '#f0f0f0' },
  contentPadding: { paddingHorizontal: 12, paddingBottom: 12 },
  content: { fontSize: 16, lineHeight: 22, color: '#333' },
  actions: { flexDirection: 'row', padding: 12 },
});
