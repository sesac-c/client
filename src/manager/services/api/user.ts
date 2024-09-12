import axios from 'axios';
import { MANAGER_USER_LIST_API_URL } from '../../../common/constants';

export const userListRequest = async (sort?: string, name?: string, courseId?: number, statusCode?: number) => {
  try {
    const response = await axios.get(MANAGER_USER_LIST_API_URL, {
      params: {
        sort,
        name,
        courseId,
        statusCode
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch user list:', error);
    throw error;
  }
};
