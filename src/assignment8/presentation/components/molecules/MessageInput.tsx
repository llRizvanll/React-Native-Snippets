import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

interface Props {
  onSubmit: (text: string) => Promise<{ success: boolean; error?: string }>;
  loading?: boolean;
}

export const MessageInput: React.FC<Props> = ({ onSubmit, loading }) => {
  const [text, setText] = useState('');

  const handleSubmit = async () => {
    if (!text.trim() || loading) return;

    const messageText = text.trim();
    setText('');
    await onSubmit(messageText);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor="#999"
        multiline
        maxLength={500}
        editable={!loading}
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity
        style={[styles.sendButton, (!text.trim() || loading) && styles.sendButtonDisabled]}
        onPress={handleSubmit}
        disabled={!text.trim() || loading}
      >
        {loading ? (
          <ActivityIndicator color="#FFFFFF" size="small" />
        ) : (
          <Text style={styles.sendButtonText}>Send</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    backgroundColor: '#F5F5F5',
  },
  sendButton: {
    backgroundColor: '#6200EE',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
