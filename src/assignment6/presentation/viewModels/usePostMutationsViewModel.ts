import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { CREATE_POST, UPDATE_POST, DELETE_POST } from '../../data/graphql/mutations';
import { GET_POSTS } from '../../data/graphql/queries';
import { mockApolloClient } from '../../data/mockServer';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
}

interface CreatePostVariables {
  title: string;
  content: string;
  author: string;
}

interface UpdatePostVariables {
  id: string;
  title?: string;
  content?: string;
}

/**
 * ViewModel for Post Mutations
 * Handles create, update, and delete mutations with proper cache updates
 */
export const usePostMutationsViewModel = () => {
  // Fetch all posts
  const { data, loading: queryLoading, refetch } = useQuery<{ posts: Post[] }>(
    GET_POSTS,
    {
      client: mockApolloClient,
      fetchPolicy: 'cache-and-network',
    }
  );

  // Create post mutation
  const [createPost, { loading: createLoading, error: createError }] = useMutation<
    { createPost: Post },
    CreatePostVariables
  >(CREATE_POST, {
    client: mockApolloClient,
    onCompleted: () => {
      // Refetch posts after successful creation
      refetch();
    },
  });

  // Update post mutation
  const [updatePost, { loading: updateLoading, error: updateError }] = useMutation<
    { updatePost: Post },
    UpdatePostVariables
  >(UPDATE_POST, {
    client: mockApolloClient,
    onCompleted: () => {
      // Refetch posts after successful update
      refetch();
    },
  });

  // Delete post mutation
  const [deletePost, { loading: deleteLoading, error: deleteError }] = useMutation<
    { deletePost: { id: string; success: boolean } },
    { id: string }
  >(DELETE_POST, {
    client: mockApolloClient,
    onCompleted: () => {
      // Refetch posts after successful deletion
      refetch();
    },
  });

  const handleCreatePost = async (title: string, content: string, author: string) => {
    try {
      await createPost({
        variables: { title, content, author },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const handleUpdatePost = async (id: string, title?: string, content?: string) => {
    try {
      await updatePost({
        variables: { id, title, content },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  const handleDeletePost = async (id: string) => {
    try {
      await deletePost({
        variables: { id },
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  };

  return {
    posts: data?.posts || [],
    loading: queryLoading || createLoading || updateLoading || deleteLoading,
    error: createError?.message || updateError?.message || deleteError?.message || null,
    createPost: handleCreatePost,
    updatePost: handleUpdatePost,
    deletePost: handleDeletePost,
  };
};
