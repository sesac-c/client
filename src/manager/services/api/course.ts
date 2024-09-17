import axios from 'axios';
import { MANAGER_COURSE_LIST_API_URL } from '../../../common/constants';
import { CourseListRequest } from '@/manager/types';

export const courseListRequest = async (params: CourseListRequest) => {
  try {
    const response = await axios.get(MANAGER_COURSE_LIST_API_URL, {
      params
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch course list:', error);
    throw error;
  }
};
