import { useState, useMemo, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { Profile, INITIAL_PROFILE } from '../../core/entities/Profile';
import { 
  SaveProfileDraftUseCase, 
  GetProfileDraftUseCase, 
  SubmitProfileUseCase 
} from '../../core/useCases/ProfileUseCases';
import { ProfileRepositoryImpl } from '../../data/repositories/ProfileRepositoryImpl';

export const useProfileViewModel = () => {
  const [form, setForm] = useState<Profile>(INITIAL_PROFILE);
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Partial<Record<keyof Profile, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingDraft, setIsLoadingDraft] = useState(true);

  // Dependency Injection
  const repository = useMemo(() => new ProfileRepositoryImpl(), []);
  const saveDraftUseCase = useMemo(() => new SaveProfileDraftUseCase(repository), [repository]);
  const getDraftUseCase = useMemo(() => new GetProfileDraftUseCase(repository), [repository]);
  const submitUseCase = useMemo(() => new SubmitProfileUseCase(repository), [repository]);

  // Load draft on mount
  useEffect(() => {
    const loadDraft = async () => {
      try {
        const draft = await getDraftUseCase.execute();
        if (draft) {
          setForm(draft);
        }
      } catch (error) {
        console.error('Failed to load draft:', error);
      } finally {
        setIsLoadingDraft(false);
      }
    };
    loadDraft();
  }, [getDraftUseCase]);

  // Save draft whenever form changes
  useEffect(() => {
    if (!isLoadingDraft) {
      saveDraftUseCase.execute(form);
    }
  }, [form, saveDraftUseCase, isLoadingDraft]);

  const updateField = useCallback((field: keyof Profile, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const addSkill = (skill: string) => {
    if (skill.trim() && !form.skills.includes(skill.trim())) {
      setForm(prev => ({ ...prev, skills: [...prev.skills, skill.trim()] }));
    }
  };

  const removeSkill = (skill: string) => {
    setForm(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skill) }));
  };

  const validateStep = (step: number): boolean => {
    const newErrors: any = {};
    let isValid = true;

    if (step === 0) {
      if (!form.firstName.trim()) {
        newErrors.firstName = 'First name is required';
        isValid = false;
      }
      if (!form.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
        isValid = false;
      }
    } else if (step === 1) {
      if (!form.email.includes('@')) {
        newErrors.email = 'Invalid email address';
        isValid = false;
      }
      if (form.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
        isValid = false;
      }
    } else if (step === 2) {
      if (form.occupation !== 'Student' && !form.company?.trim()) {
        newErrors.company = 'Company name is required';
        isValid = false;
      }
      if (form.skills.length === 0) {
        Alert.alert('Incomplete', 'Please add at least one skill');
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await submitUseCase.execute(form);
      Alert.alert('Success', 'Profile built successfully!', [
        { text: 'OK', onPress: () => {
          setForm(INITIAL_PROFILE);
          setCurrentStep(0);
        }}
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
};
