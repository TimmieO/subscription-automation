import { useState, useCallback } from 'react';
import { z } from 'zod';

interface FormState<T> {
  values: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
}

type ValidationSchema<T> = z.ZodType<T>;

export function useForm<T extends Record<string, any>>(
  initialValues: T,
  validationSchema: ValidationSchema<T>,
  onSubmit: (values: T) => Promise<void>
) {
  const [state, setState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  const handleChange = useCallback((
    name: keyof T,
    value: any
  ) => {
    setState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [name]: value,
      },
      touched: {
        ...prev.touched,
        [name]: true,
      },
    }));
  }, []);

  const validateField = useCallback((
    name: keyof T,
    value: any
  ) => {
    try {
      validationSchema.shape[name].parse(value);
      return '';
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return 'Invalid value';
    }
  }, [validationSchema]);

  const validateForm = useCallback(() => {
    try {
      validationSchema.parse(state.values);
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: Partial<Record<keyof T, string>> = {};
        error.errors.forEach(err => {
          const path = err.path[0] as keyof T;
          errors[path] = err.message;
        });
        setState(prev => ({
          ...prev,
          errors,
          touched: Object.keys(state.values).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
          ),
        }));
      }
      return false;
    }
  }, [state.values, validationSchema]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit(state.values);
      setState(prev => ({
        ...prev,
        errors: {},
        touched: {},
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: {
          ...prev.errors,
          submit: error instanceof Error ? error.message : 'An error occurred',
        },
      }));
    } finally {
      setState(prev => ({ ...prev, isSubmitting: false }));
    }
  }, [state.values, validateForm, onSubmit]);

  const resetForm = useCallback(() => {
    setState({
      values: initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
    });
  }, [initialValues]);

  return {
    values: state.values,
    errors: state.errors,
    touched: state.touched,
    isSubmitting: state.isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    validateField,
    validateForm,
  };
} 