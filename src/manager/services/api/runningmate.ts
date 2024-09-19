import axios from 'axios';
import { MANAGER_RUNNINGMATE_LIST_API_URL } from '../../../common/constants';
import { RunningmateListRequest } from '../../types';

export const runningmateListRequest = async (params: RunningmateListRequest) => {
  try {
    const response = await axios.get(MANAGER_RUNNINGMATE_LIST_API_URL, {
      params
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch runningmate list:', error);
    throw error;
  }
};
