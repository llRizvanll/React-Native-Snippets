import { useState, useMemo } from 'react';
import { Alert } from 'react-native';
import { SubmitContactUseCase } from '../../core/useCases/SubmitContactUseCase';
import { ContactRepository } from '../../data/repositories/ContactRepository';
import { Contact } from '../../core/entities/Contact';

export const useContactViewModel = () => {
  const [form, setForm] = useState<Contact>({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof Contact, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dependency Injection (simplified for this example)
  const contactRepository = useMemo(() => new ContactRepository(), []);
  const submitContactUseCase = useMemo(
    () => new SubmitContactUseCase(contactRepository),
    [contactRepository]
  );

  const updateField = (field: keyof Contact, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrors({});

    try {
      const success = await submitContactUseCase.execute(form);
      if (success) {
        Alert.alert('Success', 'Your message has been sent successfully!');
        setForm({ name: '', email: '', message: '' }); // Reset form
      }
    } catch (error: any) {
      // Map Use Case errors to UI fields
      const message = error.message.toLowerCase();
      if (message.includes('name')) {
        setErrors(prev => ({ ...prev, name: error.message }));
      } else if (message.includes('email')) {
        setErrors(prev => ({ ...prev, email: error.message }));
      } else if (message.includes('message')) {
        setErrors(prev => ({ ...prev, message: error.message }));
      } else {
        Alert.alert('Error', error.message || 'Something went wrong');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    errors,
    isSubmitting,
    updateField,
    handleSubmit,
  };
};
