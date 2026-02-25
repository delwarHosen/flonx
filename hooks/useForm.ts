import { FormErrors, validateForm } from '@/utils/validation';
import { useCallback, useState } from 'react';

interface UseFormProps<T> {
  initialValues: T;
  validationRules: Record<keyof T, (value: string) => string>;
  onSubmit: (values: T) => void | Promise<void>;
}

export const useForm = <T extends Record<string, string>>({
  initialValues,
  validationRules,
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialValues).reduce((acc, key) => ({
      ...acc,
      [key]: false,
    }), {} as Record<keyof T, boolean>)
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((field: keyof T, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as string]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const handleBlur = useCallback((field: keyof T) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field on blur
    const validateField = validationRules[field];
    if (validateField) {
      const error = validateField(values[field] || '');
      if (error) {
        setErrors(prev => ({ ...prev, [field]: error }));
      }
    }
  }, [values, validationRules]);

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = Object.keys(values).reduce((acc, key) => ({
      ...acc,
      [key]: true,
    }), {} as Record<keyof T, boolean>);
    
    setTouched(allTouched);
    
    // Validate all fields
    const validationErrors = validateForm(values, validationRules);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await onSubmit(values);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validationRules, onSubmit]);

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched(Object.keys(initialValues).reduce((acc, key) => ({
      ...acc,
      [key]: false,
    }), {} as Record<keyof T, boolean>));
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
};