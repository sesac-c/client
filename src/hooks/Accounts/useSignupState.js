import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateSignupForm } from '../../utils/form';
import { LOGIN_PATH } from '../../constants/index';

export const STEP = {
    FIRST: 'first',
    SECOND: 'second',
    SUCCESS: 'success'
};

export const useSignupState = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        currentStep: STEP.FIRST,
        isError: false,
        formData: {
            name: '',
            birthdate: '',
            gender: '',
            email: '',
            password: '',
            confirmPassword: '',
            campus: '',
            course: ''
        },
        errors: {}
    });

    const handleStepChange = useCallback(step => {
        setState(prevState => ({ ...prevState, currentStep: step }));
    }, []);

    const handleError = useCallback(() => {
        setState(prevState => ({ ...prevState, isError: true }));
    }, []);

    const handleClose = useCallback(() => {
        navigate(LOGIN_PATH);
    }, [navigate]);

    const handleChange = useCallback((field, value) => {
        setState(prevState => ({
            ...prevState,
            formData: { ...prevState.formData, [field]: value },
            errors: { ...prevState.errors, [field]: '' }
        }));
    }, []);

    const handleValidate = useCallback(async (nextStep) => {
        const newErrors = await validateSignupForm(state.formData, state.currentStep === STEP.FIRST ? 'FIRST' : 'SECOND');
        setState(prevState => ({ ...prevState, errors: newErrors }));

        if (Object.keys(newErrors).length === 0) {
            handleStepChange(nextStep);
        }
    }, [state.formData, state.currentStep, handleStepChange]);

    const isButtonDisabled = useCallback(() => {
        const { formData, currentStep } = state;
        if (currentStep === STEP.FIRST) {
            return !(formData.name && formData.birthdate && formData.gender && formData.email && formData.password && formData.confirmPassword);
        } else {
            return formData.campus === '' || formData.course === '';
        }
    }, [state]);

    return {
        state,
        handleStepChange,
        handleError,
        handleClose,
        handleChange,
        handleValidate,
        isButtonDisabled
    };
};