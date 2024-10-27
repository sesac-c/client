import { useState, useCallback, useEffect } from 'react';
import { CampusFormState, UseCampusRegisterReturn, campusError } from '@/types';
import { validateCampusForm } from '@/utils/manager';

export const useCampusRegister = (): UseCampusRegisterReturn => {
  const [state, setState] = useState<CampusFormState>({
    name: '',
    address: ''
  });

  const [errors, setErrors] = useState<campusError>({});
  const [touched, setTouched] = useState<Record<keyof CampusFormState, boolean>>({
    name: false,
    address: false
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = useCallback(
    (field: keyof CampusFormState, value: string) => {
      const fieldError = validateCampusForm({ ...state, [field]: value })[field];
      return fieldError || '';
    },
    [state]
  );

  const handleChange = useCallback(
    (field: keyof CampusFormState, value: string) => {
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
    const validationErrors = validateCampusForm(state);
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
      address: ''
    });
    setErrors({});
    setTouched({
      name: false,
      address: false
    });
    setIsFormValid(false);
  }, []);

  const getVisibleErrors = useCallback(() => {
    return Object.keys(errors).reduce((visibleErrors, key) => {
      const field = key as keyof CampusFormState;
      if (touched[field]) {
        visibleErrors[field] = errors[field];
      }
      return visibleErrors;
    }, {} as campusError);
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
