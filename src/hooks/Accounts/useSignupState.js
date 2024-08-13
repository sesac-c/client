import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../../constants/routes';

export const STEP = {
    FIRST: 'first',
    SECOND: 'second',
    SUCCESS: 'success'
};
const useSignupState = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        currentStep: STEP.FIRST,
        isError: false
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

    return {
        state,
        handleStepChange,
        handleError,
        handleClose
    };
};

export default useSignupState;