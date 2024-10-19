import { ResetPasswordState, UseResetPasswordStateReturn } from './findPassword';
import { UpdateProfileForm } from './request';

export interface UpdatePasswordState extends ResetPasswordState {}
export type UpdateProfileErrors = Record<keyof UpdateProfileForm, string>;
export interface UpdateProfileState {
  profileImage: string;
  nickname: string;
  removed: boolean;
  errors: UpdateProfileErrors;
  updateError: boolean;
  updateErrorMessage: string;
  isLoading: boolean;
}

export type UpdateProfileField = 'nickname' | 'profileImage';

export interface UserUpdatePasswordStateReturn extends UseResetPasswordStateReturn {}

export type HandleUpdateProfileFieldChange = (field: UpdateProfileField, value: string) => void;
export interface UseUpdateProfileStateReturn {
  state: UpdateProfileState;
  handleChange: HandleUpdateProfileFieldChange;
  handleFileChange: (file: File | null) => void;
  handleRemovedButtonClick: () => void;
  handleSubmit: () => void;
  isButtonDisabled: () => boolean;
  handleErrorModal: () => void;
  fileState: File | null;
}
