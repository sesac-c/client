import axios from 'axios';
import { MANAGER_RUNNINGMATE_LIST_API_URL, MANAGER_RUNNINGMATE_REGISTER_API_URL } from '@/constants';
import { RunningmateListRequest, RunningmateRegisterRequest } from '@/types';

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

export const registerRunningmate = async (data: RunningmateRegisterRequest) => {
  const response = await axios.post(MANAGER_RUNNINGMATE_REGISTER_API_URL, data);
  return response.data;
};
