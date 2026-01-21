import { gql } from '@apollo/client';

export const MESSAGE_ADDED = gql`
  subscription MessageAdded($chatId: ID!) {
    messageAdded(chatId: $chatId) {
      id
      text
      author
      createdAt
    }
  }
`;

export const USER_TYPING = gql`
  subscription UserTyping($chatId: ID!) {
    userTyping(chatId: $chatId) {
      userId
      username
      isTyping
    }
  }
`;

export const CHAT_UPDATED = gql`
  subscription ChatUpdated {
    chatUpdated {
      id
      name
      lastMessage
      updatedAt
    }
  }
`;
