import { MEMBER_LIST_API_URL, USER_COURSEINFO_API_URL } from '@/constants';
import { RouteBaseError,StudentMemberResponse, UserCourseInfoResponse } from '@/types';
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

export const getCourseMember = async (courseId: number): Promise<StudentMemberResponse[]> => {
  try {
    const response = await axios.get(`${MEMBER_LIST_API_URL('course', courseId)}`);
    return response.data;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || '멤버 로드 중 오류가 발생했습니다. 다시 시도해 주세요.';
    throw new RouteBaseError(status, message);
  }
};
