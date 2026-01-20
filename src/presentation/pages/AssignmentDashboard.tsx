import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';

interface AssignmentLink {
  id: string;
  title: string;
  description: string;
  keyFiles: string[];
  onPress: () => void;
}

interface Props {
  onSelectAssignment: (id: string) => void;
}

export const AssignmentDashboard: React.FC<Props> = ({ onSelectAssignment }) => {
  const assignments: AssignmentLink[] = [
    {
      id: 'assignment1',
      title: 'Assignment 1: Contact Form',
      description: 'A professional contact form with validation using Clean Architecture, MVVM, and Atomic Design.',
      keyFiles: [
        'src/assignment1/core/useCases/SubmitContactUseCase.ts',
        'src/assignment1/presentation/viewModels/useContactViewModel.ts',
        'src/assignment1/presentation/pages/ContactUsPage.tsx',
        'src/assignment1/README.md',
      ],
      onPress: () => onSelectAssignment('assignment1'),
    },
    {
      id: 'assignment2',
      title: 'Assignment 2: Event Registration',
      description: 'Interactive registration form with input masking, conditional fields, and async loading states.',
      keyFiles: [
        'src/assignment2/presentation/viewModels/useRegistrationViewModel.ts',
        'src/assignment2/presentation/components/organisms/RegistrationForm.tsx',
        'src/assignment2/presentation/pages/EventRegistrationPage.tsx',
        'src/assignment2/README.md',
      ],
      onPress: () => onSelectAssignment('assignment2'),
    },
    {
      id: 'assignment3',
      title: 'Assignment 3: Profile Wizard (Advanced)',
      description: 'Complexity study involving multi-step wizard, dynamic arrays, and local storage persistence.',
      keyFiles: [
        'src/assignment3/presentation/viewModels/useProfileViewModel.ts',
        'src/assignment3/presentation/pages/ProfileWizardPage.tsx',
        'src/assignment3/core/useCases/ProfileUseCases.ts',
        'src/assignment3/README.md',
      ],
      onPress: () => onSelectAssignment('assignment3'),
    },
    {
      id: 'assignment4',
      title: 'Assignment 4: High-Performance Feed',
      description: 'Optimization study for large lists, image caching, and optimistic UI updates for 60FPS scrolling.',
      keyFiles: [
        'src/assignment4/presentation/viewModels/SocialFeedViewModel.ts',
        'src/assignment4/presentation/pages/SocialFeedPage.tsx',
        'src/assignment4/presentation/components/organisms.tsx',
        'src/assignment4/README.md',
      ],
      onPress: () => onSelectAssignment('assignment4'),
    },
    {
      id: 'assignment5',
      title: 'Assignment 5: Advanced UI & Micro-interactions',
      description: 'Mastering Layout Animations and Gesture-based interactions.',
      keyFiles: [
        'src/assignment5/README.md',
      ],
      onPress: () => onSelectAssignment('assignment5'),
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Interview Practice Hub</Text>
          <Text style={styles.subtitle}>Select an assignment to view the implementation and execution.</Text>
        </View>

        {assignments.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>
            
            <View style={styles.fileSection}>
              <Text style={styles.fileHeader}>Key Files to Open:</Text>
              {item.keyFiles.map((file, index) => (
                <Text key={index} style={styles.filePath}>• {file}</Text>
              ))}
            </View>
            
            <View style={styles.viewBadge}>
              <Text style={styles.viewText}>Execute Output →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  container: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    lineHeight: 22,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#6200EE',
  },
  cardDescription: {
    fontSize: 14,
    color: '#444',
    marginTop: 10,
    lineHeight: 20,
  },
  fileSection: {
    marginTop: 16,
    backgroundColor: '#F0F0F0',
    padding: 12,
    borderRadius: 8,
  },
  fileHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  filePath: {
    fontSize: 12,
    color: '#555',
    fontFamily: 'Courier', // Using default system mono if available
    marginBottom: 2,
  },
  viewBadge: {
    marginTop: 20,
    alignSelf: 'flex-end',
    backgroundColor: '#6200EE',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  viewText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
