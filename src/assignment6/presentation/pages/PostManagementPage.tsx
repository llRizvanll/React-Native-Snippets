import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { usePostMutationsViewModel } from '../viewModels/usePostMutationsViewModel';
import { PostCard } from '../components/molecules/PostCard';
import { PostForm } from '../components/molecules/PostForm';

interface Props {
  onBack: () => void;
}

export const PostManagementPage: React.FC<Props> = ({ onBack }) => {
  const { posts, loading, error, createPost, updatePost, deletePost } = usePostMutationsViewModel();
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreatePost = async (title: string, content: string, author: string) => {
    setFormLoading(true);
    const result = await createPost(title, content, author);
    setFormLoading(false);
    if (result.success) {
      setShowForm(false);
    }
    return result;
  };

  const handleUpdatePost = async (title: string, content: string, author: string) => {
    if (!editingPost) return { success: false };
    setFormLoading(true);
    const result = await updatePost(editingPost.id, title, content);
    setFormLoading(false);
    if (result.success) {
      setShowForm(false);
      setEditingPost(null);
    }
    return result;
  };

  const handleDeletePost = async (id: string) => {
    await deletePost(id);
  };

  const handleEdit = (post: any) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Post Management</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setShowForm(true)}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>GraphQL Mutations Example</Text>
          <Text style={styles.sectionDescription}>
            This screen demonstrates GraphQL mutations (create, update, delete)
            using Apollo Client's useMutation hook with proper cache updates.
          </Text>
        </View>

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}

        {loading && posts.length === 0 ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#6200EE" />
            <Text style={styles.loadingText}>Loading posts...</Text>
          </View>
        ) : (
          <>
            {posts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDeletePost}
              />
            ))}
            {posts.length === 0 && (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No posts yet. Create your first post!</Text>
              </View>
            )}
          </>
        )}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Technical Details:</Text>
          <Text style={styles.infoText}>
            • Using Apollo Client's useMutation hook{'\n'}
            • Automatic cache updates via refetch{'\n'}
            • Form validation before mutation{'\n'}
            • Loading states during mutations{'\n'}
            • Error handling with user feedback
          </Text>
        </View>
      </ScrollView>

      <Modal
        visible={showForm}
        animationType="slide"
        transparent={true}
        onRequestClose={handleCloseForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </Text>
              <TouchableOpacity onPress={handleCloseForm}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <PostForm
              initialPost={editingPost}
              onSubmit={editingPost ? handleUpdatePost : handleCreatePost}
              onCancel={handleCloseForm}
              loading={formLoading}
            />
          </View>
        </View>
      </Modal>
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
  addButton: {
    padding: 8,
  },
  addButtonText: {
    fontSize: 24,
    color: '#6200EE',
    fontWeight: '600',
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
  errorBox: {
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
});