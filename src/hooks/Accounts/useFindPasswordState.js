import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESET_PASSWORD_PATH } from '../../constants/routes';


export const FIND_PASSWORD_PROCESS_STATUS = {
    EMAIL: 'email',
    CODE: 'verificationCode',
    SUCCESS: 'success'
};

export const useFindPasswordState = () => {
    const [state, setState] = useState({
        currentStep: FIND_PASSWORD_PROCESS_STATUS.EMAIL,
        isError: false
    });

    const navigate = useNavigate();

    const handleButtonClick = useCallback(() => {
        if (state.currentStep === FIND_PASSWORD_PROCESS_STATUS.EMAIL) {
            setState(prevState => ({ ...prevState, currentStep: FIND_PASSWORD_PROCESS_STATUS.CODE }));
        } else {
            navigate(RESET_PASSWORD_PATH);
        }
    }, [state.currentStep, navigate]);

    return { state, handleButtonClick };
};