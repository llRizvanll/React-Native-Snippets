import { gql } from '@apollo/client';

export const CREATE_POST = gql`
  mutation CreatePost($title: String!, $content: String!, $author: String!) {
    createPost(title: $title, content: $content, author: $author) {
      id
      title
      content
      author
      createdAt
    }
  }
`;

export const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String, $content: String) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
      author
      updatedAt
    }
  }
`;

export const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
      success
    }
  }
`;
