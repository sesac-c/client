import { USER_COURSEINFO_API_URL } from '@/common/constants';
import { RouteBaseError } from '@/common/types';
import { UserCourseInfoResponse } from '@/user/type';
import axios from 'axios';

export const getUserCourseInfo = async (): Promise<UserCourseInfoResponse> => {
  try {
    const response = await axios.get(USER_COURSEINFO_API_URL);
    return response.data;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || '오류가 발생했습니다. 다시 시도해 주세요.';
    throw new RouteBaseError(status, message);
  }
};
