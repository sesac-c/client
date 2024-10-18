import { useNavigate } from 'react-router-dom';
import { USER_SETTING_CHILDREN_PATH, USER_SETTING_PATH } from '@/common/constants';
import { useCallback, useState } from 'react';
import {
  UpdatePasswordForm,
  UpdatePasswordRequest,
  UpdatePasswordState,
  UserUpdatePasswordStateReturn
} from '@/common/types';
import { validateConfirmPassword, validatePassword } from '@/common/utils';
import { updatePassword } from '@/common/services/api';

export const useUpdatePassword = (): UserUpdatePasswordStateReturn => {
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
  const [state, setState] = useState<UpdatePasswordState>(initialState);

  const navigate = useNavigate();
  const updatePasswordPath = `${USER_SETTING_PATH}/${USER_SETTING_CHILDREN_PATH.updatePassword}`;
  const handleSuccessModal = () => {
    navigate(updatePasswordPath);
    setState(initialState);
  };

  const isButtonDisabled = useCallback(() => {
    const { password, confirmPassword } = state;
    return !(password && confirmPassword);
  }, [state.password, state.confirmPassword]);

  const handleErrorModal = () => {
    navigate(updatePasswordPath);
    setState(initialState);
  };

  const handleChange = useCallback((field: keyof UpdatePasswordForm, value: string) => {
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
      const resetPasswordData: UpdatePasswordRequest = {
        password: state.password,
        passwordConfirm: state.confirmPassword
      };

      await updatePassword(resetPasswordData);
      setState({ ...initialState, resetSuccess: true });
    } catch (error: any) {
      const message = error?.data?.message || '오류가 발생했습니다. 잠시 뒤 시도해주세요.';
      setState({ ...initialState, resetError: true, resetErrorMessage: message });
    }
  }, [state.password, state.confirmPassword, navigate]);

  return { state, handleChange, handleSubmit, handleErrorModal, handleSuccessModal, isButtonDisabled };
};
