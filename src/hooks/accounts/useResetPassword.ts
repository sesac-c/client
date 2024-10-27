import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH, RESET_PASSWORD_PATH } from '@/routes/paths';
import { useCallback, useState } from 'react';
import { ResetPasswordForm, ResetPasswordRequest, ResetPasswordState, UseResetPasswordStateReturn } from '@/types';
import { validateConfirmPassword, validatePassword } from '@/utils/form';
import { resetPassword } from '@/services/api';

export const useResetPassword = (uuid: string): UseResetPasswordStateReturn => {
  const initialState = {
    password: '',
    confirmPassword: '',
    errors: {
      password: '',
      confirmPassword: ''
    },
    resetError: false,
    resetErrorMessage: '',
    resetSuccess: false
  };
  const [state, setState] = useState<ResetPasswordState>(initialState);

  const navigate = useNavigate();
  const handleSuccessModal = ()=>{navigate(LOGIN_PATH)}

  const isButtonDisabled = useCallback(() => {
    const { password, confirmPassword } = state;
    return !(password && confirmPassword);
  }, [state.password, state.confirmPassword]);

  const handleErrorModal = () => {
    navigate(RESET_PASSWORD_PATH(uuid));
    setState(initialState);
  };

  const handleChange = useCallback((field: keyof ResetPasswordForm, value: string) => {
    setState(prevState => ({
      ...prevState,
      [field]: value
    }));
  }, []);

  const handleSubmit = useCallback(async () => {
    const passwordError = validatePassword(state.password);
    if (passwordError) {
      setState(prevState => ({ ...prevState, errors: { ...state.errors, password: passwordError } }));
      return;
    }

    const confirmPasswordError = validateConfirmPassword(state.password, state.confirmPassword);
    if (confirmPasswordError) {
      setState(prevState => ({ ...prevState, errors: { ...state.errors, confirmPassword: confirmPasswordError } }));
      return;
    }

    try {
      const resetPasswordData: ResetPasswordRequest = {
        password: state.password,
        passwordConfirm: state.confirmPassword,
        uuid
      };

      await resetPassword(resetPasswordData);
      setState({ ...initialState, resetSuccess: true });
    } catch (error: any) {
      const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
      setState({ ...initialState, resetError: true, resetErrorMessage: message });
    }
  }, [state.password, state.confirmPassword, navigate]);

  return { state, handleChange, handleSubmit, handleErrorModal, handleSuccessModal, isButtonDisabled };
};
