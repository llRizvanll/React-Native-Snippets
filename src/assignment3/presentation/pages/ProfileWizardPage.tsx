import React from 'react';
import { 
  SafeAreaView, 
  StyleSheet, 
  StatusBar, 
  View, 
  TouchableOpacity, 
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { useProfileViewModel } from '../viewModels/useProfileViewModel';
import { StepPersonal } from '../components/organisms/StepPersonal';
import { StepAccount } from '../components/organisms/StepAccount';
import { StepProfessional } from '../components/organisms/StepProfessional';
import { StepReview } from '../components/organisms/StepReview';
import { Button } from '../components/atoms/Button';
import { Typography } from '../components/atoms/Typography';
import { Theme } from '../../shared/theme';

interface Props {
  onBack: () => void;
}

export const ProfileWizardPage: React.FC<Props> = ({ onBack }) => {
  const {
    form,
    currentStep,
    errors,
    isSubmitting,
    isLoadingDraft,
    updateField,
    addSkill,
    removeSkill,
    goToNextStep,
    goToPrevStep,
    handleSubmit,
  } = useProfileViewModel();

  if (isLoadingDraft) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Theme.colors.primary} />
      </View>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepPersonal form={form} errors={errors} updateField={updateField} />;
      case 1:
        return <StepAccount form={form} errors={errors} updateField={updateField} />;
      case 2:
        return (
          <StepProfessional 
            form={form} 
            errors={errors} 
            updateField={updateField} 
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        );
      case 3:
        return <StepReview form={form} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === 3;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Theme.colors.background} />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Typography color={Theme.colors.primary} style={styles.backText}>← Dashboard</Typography>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderStep()}
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerButtons}>
          {currentStep > 0 && (
            <Button
              title="Back"
              variant="secondary"
              onPress={goToPrevStep}
              style={styles.navButton}
            />
          )}
          <Button
            title={isLastStep ? 'Finish' : 'Next Step'}
            onPress={isLastStep ? handleSubmit : goToNextStep}
            loading={isSubmitting}
            style={[styles.navButton, { flex: 2 }]}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: Theme.spacing.lg,
    paddingTop: Theme.spacing.md,
  },
  backButton: {
    paddingVertical: Theme.spacing.sm,
  },
  backText: {
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.spacing.lg,
  },
  footer: {
    padding: Theme.spacing.lg,
    backgroundColor: Theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: Theme.colors.border,
  },
  footerButtons: {
    flexDirection: 'row',
    gap: Theme.spacing.md,
  },
  navButton: {
    flex: 1,
  },
});
