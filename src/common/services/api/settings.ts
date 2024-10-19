import {
  ACCOUNT_INFO_API_URL,
  DELETE_ACCOUNT_API_URL,
  NICKNAME_CHECK_API_URL,
  UPDATE_PASSWORD_API_URL,
  USER_PROFILE_FORM_API_URL
} from '@/common/constants';
import {
  ManagerUpdateProfileRequest,
  RouteBaseError,
  UpdatePasswordRequest,
  UpdateProfileRequest,
  UploadResponse,
  UserType
} from '@/common/types';
import axios from 'axios';
import { setUpAxios } from '../axios/setupAuth';

export const updatePassword = async (data: UpdatePasswordRequest) => {
  try {
    const response = await axios.patch(UPDATE_PASSWORD_API_URL, data);

    if (response.status === 200) {
      return;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { code, message } = error.response.data;
        throw new RouteBaseError(code, message);
      }
    }
    console.error('비밀번호 변경 중 오류 발생:', error);
    throw new RouteBaseError(500, '비밀번호 변경 처리 중 오류가 발생했습니다.');
  }
};

export const getAccountInfo = async () => {
  setUpAxios();
  try {
    const response = await axios.get(ACCOUNT_INFO_API_URL);
    return response.data;
  } catch (error: any) {
    const status = error.errorState || error.response?.status || 500;
    const message = error.data.message || error.response?.data?.message || '오류가 발생했습니다. 다시 시도해 주세요.';
    throw new RouteBaseError(status, message);
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axios.delete(DELETE_ACCOUNT_API_URL);

    if (response.status === 200) {
      return;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { code, message } = error.response.data;
        throw new RouteBaseError(code, message);
      }
    }
    console.error('회원 탈퇴 중 오류 발생:', error);
    throw new RouteBaseError(500, '회원 탈퇴 중 오류가 발생했습니다.');
  }
};

export const getUpdateProfileForm = async (userType: UserType) => {
  setUpAxios();
  try {
    const response = await axios.get(USER_PROFILE_FORM_API_URL(userType));
    return response.data;
  } catch (error: any) {
    const status = error.errorState || error.response?.status || 500;
    const message = error.data.message || error.response?.data?.message || '오류가 발생했습니다. 다시 시도해 주세요.';
    throw new RouteBaseError(status, message);
  }
};

export const checkNickname = async (nickname: string) => {
  try {
    const response = await axios.post(NICKNAME_CHECK_API_URL, { nickname });

    if (response.status === 200) {
      return response.data.exist;
    }
  } catch (error) {
    console.error('닉네임 중복 검사 중 오류 발생:', error);
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { code, message } = error.response.data;
        throw new RouteBaseError(code, message);
      }
    }
    throw new RouteBaseError(500, '닉네임 중복 검사 중 오류가 발생했습니다.');
  }
};

export const updateProfile = async (userType: UserType, data: UpdateProfileRequest | ManagerUpdateProfileRequest) => {
  try {
    const response = await axios.put(USER_PROFILE_FORM_API_URL(userType), data);

    if (response.status === 200) {
      return;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const { code, message } = error.response.data;
        throw new RouteBaseError(code, message);
      }
    }
    console.error('프로필 수정 중 오류 발생:', error);
    throw new RouteBaseError(500, '프로필 수정 중 오류가 발생했습니다.');
  }
};
