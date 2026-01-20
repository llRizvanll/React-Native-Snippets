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

function App() {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'assignment1'>('dashboard');

  return (
    <SafeAreaProvider>
      {currentPage === 'dashboard' ? (
        <AssignmentDashboard onSelectAssignment={() => setCurrentPage('assignment1')} />
      ) : (
        <ContactUsPage onBack={() => setCurrentPage('dashboard')} />
      )}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
