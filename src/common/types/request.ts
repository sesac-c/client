export interface EmailCheckRequest {
  email: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  birthDate: string;
  gender: number;
  firstCourseId: number;
}

export interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}
export interface ResetPasswordRequest {
  password: string;
  passwordConfirm: string;
  uuid: string;
}

export interface UpdatePasswordForm extends ResetPasswordForm {}
export interface UpdatePasswordRequest {
  password: string;
  passwordConfirm: string;
}

export interface UpdateProfileForm {
  nickname: string;
  profileImage: string;
}
export interface UpdateProfileRequest {
  nickname?: string;
  profileImage?: string;
  removed: boolean;
}
export interface ManagerUpdateProfileRequest {
  profileImage: string;
  removed: boolean;
}
