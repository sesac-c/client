export enum SignupStep {
  FIRST = 'first',
  SECOND = 'second',
  SUCCESS = 'success'
}

export interface FormData {
  name: string;
  birthdate: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
  campus: string;
  course: string;
}

export interface SignupState {
  currentStep: SignupStep;
  isError: boolean;
  formData: FormData;
  errors: Partial<FormData>;
}

export interface UseSignupStateReturn {
  state: SignupState;
  handleStepChange: (step: SignupStep) => void;
  handleError: () => void;
  handleClose: () => void;
  handleChange: (field: keyof FormData, value: string) => void;
  handleSubmit: () => void;
  handleValidate: (nextStep: SignupStep) => Promise<void>;
  isButtonDisabled: () => boolean;
}

export interface BirthdateInputProps {
  birthdate: string;
  gender: string;
  onChange: (field: keyof Pick<FormData, 'birthdate' | 'gender'>, value: string) => void;
  errors: {
    birthdate?: string;
    gender?: string;
  };
}

export interface SignupSecondStepFieldProps {
  formData: FormData;
  onChange: (field: keyof FormData, value: string) => void;
  errors: Partial<FormData>;
}
