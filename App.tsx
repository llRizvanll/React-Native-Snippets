/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View, TouchableOpacity, Text } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssignmentDashboard } from './src/presentation/pages/AssignmentDashboard';
import { ContactUsPage } from './src/assignment1/presentation/pages/ContactUsPage';
import { EventRegistrationPage } from './src/assignment2/presentation/pages/EventRegistrationPage';
import { ProfileWizardPage } from './src/assignment3/presentation/pages/ProfileWizardPage';
import { SocialFeedPage } from './src/assignment4/presentation/pages/SocialFeedPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'assignment1' | 'assignment2' | 'assignment3' | 'assignment4' | 'assignment5'>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'assignment1':
        return <ContactUsPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment2':
        return <EventRegistrationPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment3':
        return <ProfileWizardPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment4':
        return <SocialFeedPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment5':
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Assignment 5</Text>
            <Text style={{ fontSize: 16, textAlign: 'center', color: '#666', marginBottom: 30 }}>
              Advanced UI & Micro-interactions implementation is coming soon!
            </Text>
            <TouchableOpacity 
              onPress={() => setCurrentPage('dashboard')}
              style={{ padding: 15, backgroundColor: '#6200EE', borderRadius: 8 }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>Back to Dashboard</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return <AssignmentDashboard onSelectAssignment={(id) => setCurrentPage(id as any)} />;
    }
  };

  return (
    <SafeAreaProvider>
      {renderPage()}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
