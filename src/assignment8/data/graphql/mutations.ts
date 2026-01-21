import { gql } from '@apollo/client';

export const SEND_MESSAGE = gql`
  mutation SendMessage($chatId: ID!, $text: String!, $author: String!) {
    sendMessage(chatId: $chatId, text: $text, author: $author) {
      id
      text
      author
      createdAt
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation CreateChat($name: String!) {
    createChat(name: $name) {
      id
      name
      lastMessage
      updatedAt
    }
  }
`;
