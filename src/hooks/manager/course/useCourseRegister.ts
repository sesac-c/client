import { useState, useCallback, useEffect } from 'react';
import { CourseFormState, UseCourseRegisterReturn, courseError } from '@/types';
import { validateCourseForm } from '@/utils/manager';

export const useCourseRegister = (): UseCourseRegisterReturn => {
  const [state, setState] = useState<CourseFormState>({
    name: '',
    classNumber: '',
    instructorName: '',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState<courseError>({});
  const [touched, setTouched] = useState<Record<keyof CourseFormState, boolean>>({
    name: false,
    classNumber: false,
    instructorName: false,
    startDate: false,
    endDate: false
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = useCallback(
    (field: keyof CourseFormState, value: string | number) => {
      const fieldError = validateCourseForm({ ...state, [field]: value })[field];
      return fieldError || '';
    },
    [state]
  );

  const handleChange = useCallback(
    (field: keyof CourseFormState, value: string | number) => {
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
    const validationErrors = validateCourseForm(state);
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
      classNumber: '',
      instructorName: '',
      startDate: '',
      endDate: ''
    });
    setErrors({});
    setTouched({
      name: false,
      classNumber: false,
      instructorName: false,
      startDate: false,
      endDate: false
    });
    setIsFormValid(false);
  }, []);

  const getVisibleErrors = useCallback(() => {
    return Object.keys(errors).reduce((visibleErrors, key) => {
      const field = key as keyof CourseFormState;
      if (touched[field]) {
        visibleErrors[field] = errors[field];
      }
      return visibleErrors;
    }, {} as courseError);
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
