import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface Post {
  id?: string;
  title: string;
  content: string;
  author: string;
}

interface Props {
  initialPost?: Post | null;
  onSubmit: (title: string, content: string, author: string) => Promise<{ success: boolean; error?: string }>;
  onCancel: () => void;
  loading?: boolean;
}

export const PostForm: React.FC<Props> = ({ initialPost, onSubmit, onCancel, loading }) => {
  const [title, setTitle] = useState(initialPost?.title || '');
  const [content, setContent] = useState(initialPost?.content || '');
  const [author, setAuthor] = useState(initialPost?.author || '');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialPost) {
      setTitle(initialPost.title);
      setContent(initialPost.content);
      setAuthor(initialPost.author);
    }
  }, [initialPost]);

  const handleSubmit = async () => {
    // Validation
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError('All fields are required');
      return;
    }

    setError(null);
    const result = await onSubmit(title.trim(), content.trim(), author.trim());
    
    if (result.success) {
      // Reset form if creating new post
      if (!initialPost) {
        setTitle('');
        setContent('');
        setAuthor('');
      }
    } else {
      setError(result.error || 'Failed to save post');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter post title"
        editable={!loading}
      />

      <Text style={styles.label}>Content</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={content}
        onChangeText={setContent}
        placeholder="Enter post content"
        multiline
        numberOfLines={4}
        editable={!loading}
      />

      <Text style={styles.label}>Author</Text>
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Enter author name"
        editable={!loading}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={onCancel}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.submitButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>
              {initialPost ? 'Update' : 'Create'} Post
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 14,
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#DDD',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#6200EE',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
