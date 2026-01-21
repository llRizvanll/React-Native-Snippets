import { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_MESSAGES } from '../../data/graphql/queries';
import { SEND_MESSAGE } from '../../data/graphql/mutations';
import { mockApolloClient, simulateSubscription } from '../../data/mockServer';

interface Message {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

interface SendMessageVariables {
  chatId: string;
  text: string;
  author: string;
}

/**
 * ViewModel for Chat with Real-time Subscriptions
 * Demonstrates:
 * - Real-time message updates via subscriptions (simulated with polling)
 * - Combining queries, mutations, and subscriptions
 * - Optimistic updates for instant feedback
 */
export const useChatViewModel = (chatId: string = '1', currentUser: string = 'You') => {
  // Fetch messages
  const { data, loading, refetch } = useQuery<{ messages: Message[] }>(
    GET_MESSAGES,
    {
      client: mockApolloClient,
      variables: { chatId },
      fetchPolicy: 'cache-and-network',
    }
  );

  // Send message mutation with optimistic update
  const [sendMessage] = useMutation<{ sendMessage: Message }, SendMessageVariables>(
    SEND_MESSAGE,
    {
      client: mockApolloClient,
      optimisticResponse: (variables: SendMessageVariables) => ({
        sendMessage: {
          id: `temp-${Date.now()}`,
          text: variables.text,
          author: variables.author,
          createdAt: new Date().toISOString(),
          __typename: 'Message',
        },
      }),
      update: (cache: any, { data }: { data: { sendMessage: Message } }) => {
        if (!data) return;

        // Read existing messages
        const existingData = cache.readQuery({
          query: GET_MESSAGES,
          variables: { chatId },
        });

        if (existingData) {
          // Check if message already exists (avoid duplicates)
          const messageExists = existingData.messages.some(
            (m: Message) => m.id === data.sendMessage.id
          );

          if (!messageExists) {
            cache.writeQuery({
              query: GET_MESSAGES,
              variables: { chatId },
              data: {
                messages: [...existingData.messages, data.sendMessage],
              },
            });
          }
        }
      },
    }
  );

  // Subscription simulation using polling
  useEffect(() => {
    const unsubscribe = simulateSubscription(chatId, (subscriptionData) => {
      // Update cache when new message arrives
      const newMessage = subscriptionData.data.messageAdded;
      
      const existingData = mockApolloClient.cache.readQuery<{ messages: Message[] }>({
        query: GET_MESSAGES,
        variables: { chatId },
      });

      if (existingData) {
        const messageExists = existingData.messages.some(m => m.id === newMessage.id);
        
        if (!messageExists) {
          mockApolloClient.cache.writeQuery({
            query: GET_MESSAGES,
            variables: { chatId },
            data: {
              messages: [...existingData.messages, newMessage],
            },
          });
        }
      }
    }, 2000); // Poll every 2 seconds

    return unsubscribe;
  }, [chatId]);

  const handleSendMessage = async (text: string) => {
    try {
      await sendMessage({
        variables: {
          chatId,
          text,
          author: currentUser,
        },
      });
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  };

  return {
    messages: data?.messages || [],
    loading,
    sendMessage: handleSendMessage,
    refetch,
  };
};
