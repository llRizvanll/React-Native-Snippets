/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AssignmentDashboard } from './src/presentation/pages/AssignmentDashboard';
import { ContactUsPage } from './src/assignment1/presentation/pages/ContactUsPage';
import { EventRegistrationPage } from './src/assignment2/presentation/pages/EventRegistrationPage';
import { ProfileWizardPage } from './src/assignment3/presentation/pages/ProfileWizardPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'assignment1' | 'assignment2' | 'assignment3'>('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'assignment1':
        return <ContactUsPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment2':
        return <EventRegistrationPage onBack={() => setCurrentPage('dashboard')} />;
      case 'assignment3':
        return <ProfileWizardPage onBack={() => setCurrentPage('dashboard')} />;
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
