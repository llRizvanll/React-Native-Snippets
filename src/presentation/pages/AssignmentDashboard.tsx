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
      title: 'Assignment 5: GraphQL Basics - User Profile Query',
      description: 'Basic GraphQL query implementation with Apollo Client. Learn to fetch and display user profile data with proper loading and error states.',
      keyFiles: [
        'src/assignment5/data/graphql/queries.ts',
        'src/assignment5/presentation/viewModels/useUserProfileViewModel.ts',
        'src/assignment5/presentation/pages/UserProfilePage.tsx',
        'src/assignment5/README.md',
      ],
      onPress: () => onSelectAssignment('assignment5'),
    },
    {
      id: 'assignment6',
      title: 'Assignment 6: GraphQL Mutations - Create/Update Posts',
      description: 'Intermediate level: Implement GraphQL mutations for creating and updating posts. Learn mutation patterns, cache updates, and form handling.',
      keyFiles: [
        'src/assignment6/data/graphql/mutations.ts',
        'src/assignment6/presentation/viewModels/usePostMutationsViewModel.ts',
        'src/assignment6/presentation/pages/PostManagementPage.tsx',
        'src/assignment6/README.md',
      ],
      onPress: () => onSelectAssignment('assignment6'),
    },
    {
      id: 'assignment7',
      title: 'Assignment 7: GraphQL Caching & Optimistic Updates',
      description: 'Advanced level: Master Apollo Client caching strategies, optimistic updates, and manual cache manipulation for instant UI feedback.',
      keyFiles: [
        'src/assignment7/presentation/viewModels/useTaskViewModel.ts',
        'src/assignment7/presentation/pages/TaskManagementPage.tsx',
        'src/assignment7/data/mockServer.ts',
        'src/assignment7/README.md',
      ],
      onPress: () => onSelectAssignment('assignment7'),
    },
    {
      id: 'assignment8',
      title: 'Assignment 8: GraphQL Subscriptions & Real-time Features',
      description: 'Expert level: Implement real-time features using GraphQL subscriptions. Build a live chat system with WebSocket-based updates.',
      keyFiles: [
        'src/assignment8/data/graphql/subscriptions.ts',
        'src/assignment8/presentation/viewModels/useChatViewModel.ts',
        'src/assignment8/presentation/pages/ChatPage.tsx',
        'src/assignment8/README.md',
      ],
      onPress: () => onSelectAssignment('assignment8'),
    },
    {
      id: 'assignment9',
      title: 'Assignment 9: Atomic Design Basics',
      description: 'Basic level: Learn the fundamentals of Atomic Design methodology. Build UI components in a hierarchical, reusable manner from atoms to templates.',
      keyFiles: [
        'src/assignment9/presentation/components/atoms/Avatar.tsx',
        'src/assignment9/presentation/components/molecules/UserInfo.tsx',
        'src/assignment9/presentation/components/organisms/UserCard.tsx',
        'src/assignment9/presentation/components/templates/UserProfileTemplate.tsx',
        'src/assignment9/presentation/pages/UserProfilePage.tsx',
        'src/assignment9/README.md',
      ],
      onPress: () => onSelectAssignment('assignment9'),
    },
    {
      id: 'assignment10',
      title: 'Assignment 10: GraphQL User List & Search',
      description: 'Intermediate level: Build a React Native screen that fetches users from GraphQL API, displays them in FlatList, and provides real-time search functionality with proper loading and error states.',
      keyFiles: [
        'src/assignment10/data/graphql/queries.ts',
        'src/assignment10/presentation/viewModels/useUserSearchViewModel.ts',
        'src/assignment10/presentation/pages/UserSearchPage.tsx',
        'src/assignment10/presentation/components/molecules/UserItem.tsx',
        'src/assignment10/README.md',
      ],
      onPress: () => onSelectAssignment('assignment10'),
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
