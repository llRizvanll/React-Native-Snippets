import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { Registration, EventType } from '../../core/entities/Registration';
import { RegisterUserUseCase } from '../../core/useCases/RegisterUserUseCase';
import { RegistrationRepositoryImpl } from '../../data/repositories/RegistrationRepositoryImpl';

export const useRegistrationViewModel = () => {
  const [form, setForm] = useState<Registration>({
    fullName: '',
    phoneNumber: '',
    password: '',
    eventType: 'Webinar',
    receiveUpdates: false,
    dietaryRequirements: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Registration, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Dependency Injection
  const repository = useMemo(() => new RegistrationRepositoryImpl(), []);
  const registerUseCase = useMemo(() => new RegisterUserUseCase(repository), [repository]);

  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  const formatPhoneNumber = (text: string) => {
    // Remove all non-digits
    const cleaned = text.replace(/\D/g, '');
    
    // Limit to 10 digits
    const limited = cleaned.slice(0, 10);
    
    // Format: (XXX) XXX-XXXX
    let formatted = limited;
    if (limited.length > 6) {
      formatted = `(${limited.slice(0, 3)}) ${limited.slice(3, 6)}-${limited.slice(6)}`;
    } else if (limited.length > 3) {
      formatted = `(${limited.slice(0, 3)}) ${limited.slice(3)}`;
    } else if (limited.length > 0) {
      formatted = `(${limited}`;
    }
    
    return formatted;
  };

  const updateField = (field: keyof Registration, value: any) => {
    let finalValue = value;
    
    if (field === 'phoneNumber') {
      finalValue = formatPhoneNumber(value);
    }

    setForm(prev => ({ ...prev, [field]: finalValue }));
    
    // Clear field-specific error
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      await registerUseCase.execute(form);
      Alert.alert('Success', 'Registration completed successfully!');
      // Reset form or navigate away
    } catch (error: any) {
      const message = error.message.toLowerCase();
      // Map domain errors to form fields
      if (message.includes('full name')) {
        setErrors(prev => ({ ...prev, fullName: error.message }));
      } else if (message.includes('phone number')) {
        setErrors(prev => ({ ...prev, phoneNumber: error.message }));
      } else if (message.includes('password')) {
        setErrors(prev => ({ ...prev, password: error.message }));
      } else {
        Alert.alert('Error', error.message || 'Registration failed');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const showDietaryRequirements = form.eventType === 'Conference';

  return {
    form,
    errors,
    isSubmitting,
    isPasswordVisible,
    showDietaryRequirements,
    updateField,
    togglePasswordVisibility,
    handleSubmit,
  };
};
