import axios from 'axios';
import { MANAGER_CAMPUS_LIST_API_URL, MANAGER_CAMPUS_REGISTER_API_URL } from '../../../common/constants';
import { CampusRegisterRequest } from '../../types';

export const campusListRequest = async () => {
  try {
    const response = await axios.get(MANAGER_CAMPUS_LIST_API_URL);
    return response;
  } catch (error) {
    console.error('Failed to fetch campus list:', error);
    throw error;
  }
};

export const registerCampus = async (data: CampusRegisterRequest) => {
  const response = await axios.post(MANAGER_CAMPUS_REGISTER_API_URL, data);
  return response.data;
};
