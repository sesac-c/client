import { ResetPasswordState, UseResetPasswordStateReturn } from './findPassword';
import { CourseChangeRequestForm, UpdateProfileForm } from './request';

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
export interface CourseChangeRequestState {
  campusId?: string;
  courseId?: string;
  campusName: string;
  courseName: string;
  success: boolean;
  error: {
    isError: boolean;
    message: string;
  };
  fieldErrors: {
    campus: { isError: boolean; message: string };
    course: { isError: boolean; message: string };
  };
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

export type HandleCourseChangeRequestFieldChange = (
  field: keyof CourseChangeRequestForm,
  id: string,
  name: string
) => void;

export interface UseCourseChangeRequestReturn {
  state: CourseChangeRequestState;
  handleChange: HandleCourseChangeRequestFieldChange;
  handleSubmit: () => void;
  isButtonDisabled: () => boolean;
  handleCloseErrorModal: () => void;
  handleCloseSuccessModal: () => void;
}
