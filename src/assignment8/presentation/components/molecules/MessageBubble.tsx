import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Message {
  id: string;
  text: string;
  author: string;
  createdAt: string;
}

interface Props {
  message: Message;
  isCurrentUser: boolean;
}

export const MessageBubble: React.FC<Props> = ({ message, isCurrentUser }) => {
  return (
    <View
      style={[
        styles.container,
        isCurrentUser ? styles.currentUserContainer : styles.otherUserContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isCurrentUser ? styles.currentUserBubble : styles.otherUserBubble,
        ]}
      >
        {!isCurrentUser && (
          <Text style={styles.author}>{message.author}</Text>
        )}
        <Text
          style={[
            styles.text,
            isCurrentUser ? styles.currentUserText : styles.otherUserText,
          ]}
        >
          {message.text}
        </Text>
        <Text
          style={[
            styles.timestamp,
            isCurrentUser ? styles.currentUserTimestamp : styles.otherUserTimestamp,
          ]}
        >
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  currentUserContainer: {
    alignItems: 'flex-end',
  },
  otherUserContainer: {
    alignItems: 'flex-start',
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  currentUserBubble: {
    backgroundColor: '#6200EE',
    borderBottomRightRadius: 4,
  },
  otherUserBubble: {
    backgroundColor: '#E0E0E0',
    borderBottomLeftRadius: 4,
  },
  author: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
  },
  currentUserText: {
    color: '#FFFFFF',
  },
  otherUserText: {
    color: '#1A1A1A',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 4,
  },
  currentUserTimestamp: {
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'right',
  },
  otherUserTimestamp: {
    color: '#999',
    textAlign: 'left',
  },
});
