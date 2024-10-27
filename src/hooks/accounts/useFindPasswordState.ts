import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFindPasswordForm } from '@/utils/form';
import { checkEmailAndSendCode, verifyCode } from '@/services/api';
import { COUNTDOWN_TIME, EMAIL_REGEX, ERROR_EMAIL_INVALID } from '@/constants';
import { RESET_PASSWORD_PATH } from '@/routes/paths';
import { FindPasswordProcessStatus, FindPasswordState, UseFindPasswordStateReturn } from '@/types';

export const useFindPasswordState = (): UseFindPasswordStateReturn => {
  const [state, setState] = useState<FindPasswordState>({
    currentStep: FindPasswordProcessStatus.EMAIL,
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

  const handleEmailVerification = useCallback(async (email: string) => {
    try {
      const data = await checkEmailAndSendCode(email);

      if (data.success) {
        setState(prevState => ({
          ...prevState,
          email,
          isEmailValid: true,
          isCodeSent: true,
          emailHelperText: '인증코드가 발송되었습니다!',
          currentStep: FindPasswordProcessStatus.CODE,
          isTimerExpired: false,
          remainingTime: COUNTDOWN_TIME
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          emailHelperText: data.message
        }));
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isError: true
      }));
    }
  }, []);

  const handleEmailSubmit = useCallback(async () => {
    if (!EMAIL_REGEX.test(state.email)) {
      setState(prevState => ({
        ...prevState,
        emailHelperText: ERROR_EMAIL_INVALID
      }));
      return;
    }
    await handleEmailVerification(state.email);
  }, [state.email, handleEmailVerification]);

  const handleCodeSubmit = useCallback(async () => {
    try {
      const data = await verifyCode(state.email, state.verificationCode);
      if (data.success) {
        navigate(RESET_PASSWORD_PATH(data.uuid));
      } else {
        setState(prevState => ({
          ...prevState,
          codeHelperText: data.message
        }));
      }
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isError: true
      }));
    }
  }, [state.email, state.verificationCode, navigate]);

  const resendVerificationCode = useCallback(async () => {
    setState(prevState => ({
      ...prevState,
      isCodeSent: true,
      remainingTime: COUNTDOWN_TIME,
      isTimerExpired: false,
      codeHelperText: '인증코드가 재발송되었습니다!',
      verificationCode: ''
    }));

    await handleEmailVerification(state.email);
  }, [state.email, handleEmailVerification]);

  const handleButtonClick = useCallback(() => {
    if (state.currentStep === FindPasswordProcessStatus.EMAIL) {
      handleEmailSubmit();
    } else if (state.isTimerExpired) {
      resendVerificationCode();
    } else {
      handleCodeSubmit();
    }
  }, [state.currentStep, state.isTimerExpired, handleEmailSubmit, handleCodeSubmit, resendVerificationCode]);

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

  useEffect(() => {
    if (state.isCodeSent && !state.isTimerExpired) {
      const cleanupTimer = startCountdown();
      return cleanupTimer;
    }
  }, [state.isCodeSent, state.isTimerExpired, startCountdown]);

  const handleChange = useCallback((field: keyof FindPasswordState, value: string) => {
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
