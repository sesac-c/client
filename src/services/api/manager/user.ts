import axios from 'axios';
import { MANAGER_USER_LIST_API_URL } from '@/constants';
import { CourseResponse, UserListRequest } from '@/types';

export const userListRequest = async (params: UserListRequest) => {
  try {
    const response = await axios.get(MANAGER_USER_LIST_API_URL, {
      params
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch user list:', error);
    throw error;
  }
};

// 캠퍼스 비동기 요청 및 id->value, name->label로 매핑

export const courseOptionsRequest = async (campusId: number): Promise<CourseResponse[]> => {
  const response = await axios.get<CourseResponse[]>(`/campuses/${campusId}/courses`);
  return response.data;
};
