import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

// --- ATOMS ---

export const Avatar = memo(({ url }: { url: string }) => (
  <Image source={{ uri: url }} style={styles.avatar} />
));

export const PostImage = memo(({ url }: { url: string }) => (
  <Image source={{ uri: url }} style={styles.postImage} resizeMode="cover" />
));

export const IconButton = memo(({ name, icon, count, color, onPress }: any) => (
  <TouchableOpacity style={styles.iconButton} onPress={onPress}>
    <Text style={[styles.iconText, { color: color || '#666' }]}>{icon}</Text>
    {count !== undefined && <Text style={styles.countText}>{count}</Text>}
  </TouchableOpacity>
));

// --- MOLECULES ---

export const PostHeader = memo(({ username, avatarUrl, timestamp }: any) => (
  <View style={styles.header}>
    <Avatar url={avatarUrl} />
    <View style={styles.headerText}>
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.timestamp}>{new Date(timestamp).toLocaleTimeString()}</Text>
    </View>
  </View>
));

export const SearchBar = memo(({ value, onChangeText }: any) => (
  <View style={styles.searchContainer}>
    <TextInput
      style={styles.searchInput}
      placeholder="Search posts or users..."
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#999"
    />
  </View>
));

const styles = StyleSheet.create({
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#eee' },
  postImage: { width: '100%', aspectRatio: 3/2, backgroundColor: '#f0f0f0' },
  iconButton: { flexDirection: 'row', alignItems: 'center', marginRight: 20 },
  iconText: { fontSize: 20, marginRight: 4 },
  countText: { fontSize: 14, color: '#666' },
  header: { flexDirection: 'row', padding: 12, alignItems: 'center' },
  headerText: { marginLeft: 12 },
  username: { fontWeight: 'bold', fontSize: 16 },
  timestamp: { fontSize: 12, color: '#999' },
  searchContainer: { padding: 12, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  searchInput: { height: 40, backgroundColor: '#f5f5f5', borderRadius: 20, paddingHorizontal: 16, fontSize: 16 },
});
