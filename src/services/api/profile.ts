import { FollowResponse, RouteBaseError } from '@/types';
import {
  FOLLOW_LIST_API_URL,
  FOLLOW_ROOT_API_URL,
  FOLLOWING_LIST_API_URL,
  USER_ID_API_URL,
  USER_PROFILE_API_URL
} from '@/constants';
import axios from 'axios';
import { isNumber } from '@/utils/form';
import { setUpAxios } from '@/services/setupAxios';

export const getProfile = async (userId: string) => {
  setUpAxios();
  try {
    if (!isNumber(userId)) {
      throw new Error();
    }
    const response = await axios.get(USER_PROFILE_API_URL(userId));

    const { data } = response;
    return data;
  } catch (error: any) {
    console.error(error);
    const status = error.response?.status;
    const message =
      !status || (status && status === 404)
        ? '해당 프로필 페이지를 찾을 수 없습니다'
        : error.response?.data?.message || '프로필 페이지를 로드 중에 오류가 발생했습니다.\n다시 시도해주세요.';
    throw new RouteBaseError(status || 500, message);
  }
};
export const getUserId = async () => {
  setUpAxios();
  try {
    const response = await axios.get(USER_ID_API_URL);

    const { data } = response;
    return data;
  } catch (error: any) {
    console.error(error);
    const message = '프로필 페이지를 로드 중에 오류가 발생했습니다.\n다시 시도해주세요.';
    throw new RouteBaseError(500, message);
  }
};

export const followUser = async (userId: number): Promise<void> => {
  try {
    await axios.post(FOLLOW_ROOT_API_URL(userId));
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export const unfollowUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(FOLLOW_ROOT_API_URL(userId));
  } catch (error) {
    console.error('Error unfollowing user:', error);
    throw error;
  }
};

export const deleteFollowingUser = async (userId: number): Promise<void> => {
  try {
    await axios.delete(FOLLOW_ROOT_API_URL(userId) + 'er');
  } catch (error) {
    console.error('Error deleting following user:', error);
    throw error;
  }
};

export const getFollows = async (userId: number): Promise<FollowResponse[]> => {
  try {
    const response = await axios.get<FollowResponse[]>(FOLLOW_LIST_API_URL(userId));
    return response.data;
  } catch (error) {
    console.error('Error getting follows:', error);
    throw error;
  }
};

export const getFollowings = async (userId: number): Promise<FollowResponse[]> => {
  try {
    const response = await axios.get<FollowResponse[]>(FOLLOWING_LIST_API_URL(userId));
    return response.data;
  } catch (error) {
    console.error('Error getting followings:', error);
    throw error;
  }
};
