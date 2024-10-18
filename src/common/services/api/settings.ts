import { ACCOUNT_INFO_API_URL, DELETE_ACCOUNT_API_URL, UPDATE_PASSWORD_API_URL } from '@/common/constants';
import { RouteBaseError, UpdatePasswordRequest } from '@/common/types';
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
