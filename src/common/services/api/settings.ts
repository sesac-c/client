import { UPDATE_PASSWORD_API_URL } from '@/common/constants';
import { RouteBaseError, UpdatePasswordRequest } from '@/common/types';
import axios from 'axios';

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
