import { useState, useCallback, useEffect } from 'react';
import { RestaurantFormState, UseRestaurantRegisterReturn, restaurantError } from '@/types';
import { validateRestaurantForm } from '@/utils/manager';

export const useRestaurantRegister = (): UseRestaurantRegisterReturn => {
  const [state, setState] = useState<RestaurantFormState>({
    name: '',
    category: '',
    address: '',
    type: ''
  });

  const [errors, setErrors] = useState<restaurantError>({});
  const [touched, setTouched] = useState<Record<keyof RestaurantFormState, boolean>>({
    name: false,
    category: false,
    address: false,
    type: false
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = useCallback(
    (field: keyof RestaurantFormState, value: string) => {
      const fieldError = validateRestaurantForm({ ...state, [field]: value })[field];
      return fieldError || '';
    },
    [state]
  );

  const handleChange = useCallback(
    (field: keyof RestaurantFormState, value: string) => {
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
    const validationErrors = validateRestaurantForm(state);
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
      category: '',
      address: '',
      type: ''
    });
    setErrors({});
    setTouched({
      name: false,
      category: false,
      address: false,
      type: false
    });
    setIsFormValid(false);
  }, []);

  const getVisibleErrors = useCallback(() => {
    return Object.keys(errors).reduce((visibleErrors, key) => {
      const field = key as keyof RestaurantFormState;
      if (touched[field]) {
        visibleErrors[field] = errors[field];
      }
      return visibleErrors;
    }, {} as restaurantError);
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
