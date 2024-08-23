import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { validateFindPasswordForm } from '../../utils/form'
import { checkEmailExists, verifyCode } from '../../services/api/findPassword';
import { RESET_PASSWORD_PATH, COUNTDOWN_TIME } from '../../constants';

export const FIND_PASSWORD_PROCESS_STATUS = {
    EMAIL: 'EMAIL',
    CODE: 'CODE'
};

export const useFindPasswordState = () => {
    const [state, setState] = useState({
        currentStep: FIND_PASSWORD_PROCESS_STATUS.EMAIL,
        isError: false,
        email: '',
        verificationCode: '',
        isEmailValid: false,
        isCodeSent: false,
        remainingTime: COUNTDOWN_TIME,
        emailHelperText: '',
        codeHelperText: '',
        isTimerExpired: false
    });

    const navigate = useNavigate();

    const handleEmailSubmit = useCallback(async () => {
        try {
            // const emailExists = await checkEmailExists(state.email);
            const emailExists = checkEmailExists(state.email);
            if (emailExists) {
                setState(prevState => ({
                    ...prevState,
                    isEmailValid: true,
                    isCodeSent: true,
                    emailHelperText: '인증코드가 발송되었습니다!',
                    currentStep: FIND_PASSWORD_PROCESS_STATUS.CODE,
                    isTimerExpired: false,
                    remainingTime: COUNTDOWN_TIME
                }));
            } else {
                setState(prevState => ({
                    ...prevState,
                    isError: true,
                    emailHelperText: '존재하지 않는 이메일입니다'
                }));
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                isError: true,
            }));
        }
    }, [state.email]);

    const handleCodeSubmit = useCallback(async () => {
        try {
            // const isCodeValid = await verifyCode(state.verificationCode);
            const isCodeValid = verifyCode(state.verificationCode);
            if (isCodeValid) {
                navigate(RESET_PASSWORD_PATH);
            } else {
                setState(prevState => ({
                    ...prevState,
                    codeHelperText: '인증번호가 일치하지 않습니다.'
                }));
            }
        } catch (error) {
            setState(prevState => ({
                ...prevState,
                isError: true,
            }));
        }
    }, [state.verificationCode, navigate]);

    const handleButtonClick = useCallback(() => {
        if (state.currentStep === FIND_PASSWORD_PROCESS_STATUS.EMAIL) {
            handleEmailSubmit();
        } else if (state.isTimerExpired) {
            resendVerificationCode();
        } else {
            handleCodeSubmit();
        }
    }, [state.currentStep, state.isTimerExpired, handleEmailSubmit, handleCodeSubmit]);

    const startCountdown = useCallback(() => {
        const timer = setInterval(() => {
            setState(prevState => {
                if (prevState.remainingTime <= 1) {
                    clearInterval(timer);
                    return {
                        ...prevState,
                        remainingTime: 0,
                        isCodeSent: false,
                        isTimerExpired: true,
                        codeHelperText: '인증 시간이 만료되었습니다. 인증번호를 재전송해주세요.'
                    };
                }
                return { ...prevState, remainingTime: prevState.remainingTime - 1 };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const resendVerificationCode = useCallback(() => {
        setState(prevState => ({
            ...prevState,
            isCodeSent: true,
            remainingTime: COUNTDOWN_TIME,
            isTimerExpired: false,
            codeHelperText: '인증코드가 재발송되었습니다!',
            verificationCode: ''
        }));
    }, []);

    useEffect(() => {
        if (state.isCodeSent && !state.isTimerExpired) {
            const cleanupTimer = startCountdown();
            return cleanupTimer;
        }
    }, [state.isCodeSent, state.isTimerExpired, startCountdown]);

    const handleChange = useCallback((field, value) => {
        setState(prevState => ({
            ...prevState,
            [field]: value,
            emailHelperText: field === 'email' ? '' : prevState.emailHelperText,
            codeHelperText: field === 'verificationCode' ? '' : prevState.codeHelperText
        }));
    }, []);

    const isButtonDisabled = useCallback(() => {
        if (state.isTimerExpired) return false;
        const errors = validateFindPasswordForm(
            { email: state.email, verificationCode: state.verificationCode },
            state.currentStep
        );
        return Object.keys(errors).length > 0;
    }, [state.email, state.verificationCode, state.currentStep, state.isTimerExpired]);

    return { state, handleChange, handleButtonClick, isButtonDisabled };
};