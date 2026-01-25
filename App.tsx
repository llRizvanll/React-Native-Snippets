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
import { UserProfilePage } from './src/assignment5/presentation/pages/UserProfilePage';
import { PostManagementPage } from './src/assignment6/presentation/pages/PostManagementPage';
import { TaskManagementPage } from './src/assignment7/presentation/pages/TaskManagementPage';
import { ChatPage } from './src/assignment8/presentation/pages/ChatPage';
import { UserProfilePage as Assignment9UserProfilePage } from './src/assignment9/presentation/pages/UserProfilePage';
import { UserSearchPage } from './src/assignment10/presentation/pages/UserSearchPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'assignment1' | 'assignment2' | 'assignment3' | 'assignment4' | 'assignment5' | 'assignment6' | 'assignment7' | 'assignment8' | 'assignment9' | 'assignment10'>('dashboard');

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
        return <UserProfilePage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment6':
        return <PostManagementPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment7':
        return <TaskManagementPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment8':
        return <ChatPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment9':
        return <Assignment9UserProfilePage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment10':
        return <UserSearchPage onBack={() => setCurrentPage('dashboard')} />;
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
