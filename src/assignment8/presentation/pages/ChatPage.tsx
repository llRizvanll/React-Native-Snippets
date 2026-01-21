import React, { useRef, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useChatViewModel } from '../viewModels/useChatViewModel';
import { MessageBubble } from '../components/molecules/MessageBubble';
import { MessageInput } from '../components/molecules/MessageInput';

interface Props {
  onBack: () => void;
}

export const ChatPage: React.FC<Props> = ({ onBack }) => {
  const { messages, loading, sendMessage } = useChatViewModel('1', 'You');
  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages.length]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.title}>General Chat</Text>
          <Text style={styles.subtitle}>Real-time messaging</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Live</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.messagesContainer}>
          <View style={styles.infoBanner}>
            <Text style={styles.infoText}>
              💡 Messages update in real-time via GraphQL subscriptions
            </Text>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <MessageBubble
                message={item}
                isCurrentUser={item.author === 'You'}
              />
            )}
            contentContainerStyle={styles.messagesList}
            inverted={false}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                  {loading ? 'Loading messages...' : 'No messages yet. Start the conversation!'}
                </Text>
              </View>
            }
          />
        </View>

        <MessageInput onSubmit={sendMessage} loading={loading} />
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <View style={styles.techInfo}>
          <Text style={styles.techTitle}>Technical Details:</Text>
          <Text style={styles.techText}>
            • Real-time updates via GraphQL subscriptions (simulated with polling){'\n'}
            • Optimistic updates for instant message display{'\n'}
            • Automatic cache updates when new messages arrive{'\n'}
            • WebSocket-based subscriptions in production
          </Text>
        </View>
      </View>
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
  headerContent: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  infoBanner: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#BBDEFB',
  },
  infoText: {
    fontSize: 12,
    color: '#1976D2',
    textAlign: 'center',
  },
  messagesList: {
    paddingVertical: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  techInfo: {
    padding: 16,
    backgroundColor: '#FFF3E0',
  },
  techTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#E65100',
    marginBottom: 8,
  },
  techText: {
    fontSize: 12,
    color: '#424242',
    lineHeight: 18,
  },
});
