import { ResetPasswordForm } from './request';

export enum FindPasswordProcessStatus {
  EMAIL = 'EMAIL',
  CODE = 'CODE'
}

export interface FindPasswordState {
  currentStep: FindPasswordProcessStatus;
  isError: boolean;
  email: string;
  verificationCode: string;
  isEmailValid: boolean;
  isCodeSent: boolean;
  remainingTime: number;
  emailHelperText: string;
  codeHelperText: string;
  isTimerExpired: boolean;
}
export interface ResetPasswordState {
  password: string;
  confirmPassword: string;
  errors: Record<keyof ResetPasswordForm, string>;
  resetError: boolean;
  resetErrorMessage: string;
  resetSuccess: boolean;
}
export interface UpdatePasswordState extends ResetPasswordState {}

export type FindPasswordField = 'email' | 'verificationCode';
export type ResetPasswordField = 'password' | 'confirmPassword';

export interface UseFindPasswordStateReturn {
  state: FindPasswordState;
  handleChange: (field: FindPasswordField, value: string) => void;
  handleButtonClick: () => void;
  isButtonDisabled: () => boolean;
}

export interface UseResetPasswordStateReturn {
  state: ResetPasswordState;
  handleChange: (field: ResetPasswordField, value: string) => void;
  handleSubmit: () => void;
  isButtonDisabled: () => boolean;
  handleSuccessModal: () => void;
  handleErrorModal: () => void;
}

export interface UserUpdatePasswordStateReturn extends UseResetPasswordStateReturn {}
export interface FindPasswordContentProps {
  title: string;
  state: FindPasswordState;
  handleChange: (field: FindPasswordField, value: string) => void;
  handleButtonClick: () => void;
  isButtonDisabled: () => boolean;
}

export interface VerificationCodeFieldProps {
  verificationCode: string;
  remainingTime: number;
  onChange: (field: FindPasswordField, value: string) => void;
  helperText: string;
  isDisabled: boolean;
}

export interface EmailInputFieldProps {
  email: string;
  isEmailValid: boolean;
  helperText: string;
  onChange: (field: FindPasswordField, value: string) => void;
}
