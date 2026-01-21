import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages($chatId: ID!) {
    messages(chatId: $chatId) {
      id
      text
      author
      createdAt
    }
  }
`;

export const GET_CHATS = gql`
  query GetChats {
    chats {
      id
      name
      lastMessage
      updatedAt
    }
  }
`;
