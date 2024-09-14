import axios from 'axios';
import { MANAGER_CAMPUS_LIST_API_URL } from '../../../common/constants';

export const campusListRequest = async () => {
  try {
    const response = await axios.get(MANAGER_CAMPUS_LIST_API_URL);
    return response;
  } catch (error) {
    console.error('Failed to fetch campus list:', error);
    throw error;
  }
};
