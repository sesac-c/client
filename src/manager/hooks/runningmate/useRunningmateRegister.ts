import React, { useState, useCallback, useEffect } from 'react';
import { RunningmateFormState, UseRunningmateRegisterReturn, runningmateError } from '../../types';
import { validateRunningmateForm } from '../../utils';

export const useRunningmateRegister = (): UseRunningmateRegisterReturn => {
  const [state, setState] = useState<RunningmateFormState>({
    name: '',
    subject: '',
    goal: '',
    courseId: ''
  });

  const [errors, setErrors] = useState<runningmateError>({});
  const [touched, setTouched] = useState<Record<keyof RunningmateFormState, boolean>>({
    name: false,
    subject: false,
    goal: false,
    courseId: false
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = useCallback(
    (field: keyof RunningmateFormState, value: string) => {
      const fieldError = validateRunningmateForm({ ...state, [field]: value })[field];
      return fieldError || '';
    },
    [state]
  );

  const handleChange = useCallback(
    (field: keyof RunningmateFormState, value: string) => {
      setState(prevState => ({
        ...prevState,
        [field]: value
      }));
      setTouched(prevTouched => ({
        ...prevTouched,
        [field]: true
      }));
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: validateField(field, value)
      }));
    },
    [validateField]
  );

  const validateForm = useCallback((): boolean => {
    const validationErrors = validateRunningmateForm(state);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [state]);

  useEffect(() => {
    const hasEmptyFields = Object.values(state).some(value => value === '');
    const isValid = validateForm();
    setIsFormValid(!hasEmptyFields && isValid);
  }, [state, validateForm]);

  const resetForm = useCallback(() => {
    setState({
      name: '',
      subject: '',
      goal: '',
      courseId: ''
    });
    setErrors({});
    setTouched({
      name: false,
      subject: false,
      goal: false,
      courseId: false
    });
    setIsFormValid(false);
  }, []);

  const getVisibleErrors = useCallback(() => {
    return Object.keys(errors).reduce((visibleErrors, key) => {
      const field = key as keyof RunningmateFormState;
      if (touched[field]) {
        visibleErrors[field] = errors[field];
      }
      return visibleErrors;
    }, {} as runningmateError);
  }, [errors, touched]);

  return {
    state,
    errors: getVisibleErrors(),
    isFormValid,
    handleChange,
    validateForm,
    resetForm
  };
};
