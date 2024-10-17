import { RouteBaseError, UserPostResponse } from '@/common/types';
import { FEED_ROOT_API_URL, USER_INFO_API_URL, USER_POSTS_API_URL, USER_PROFILE_API_URL } from '@/common/constants';
import axios, { AxiosError } from 'axios';
import { isNumber } from '@/common/utils';
import { setUpAxios } from '../axios/setupAuth';

export const getUserPosts = async (userId: number): Promise<UserPostResponse[]> => {
  try {
    const response = await axios.get<UserPostResponse[]>(USER_POSTS_API_URL(userId));
    return response.data;
  } catch (error) {
    console.error('사용자 게시물 로딩 중 오류 발생:', error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error('사용자 게시물을 찾을 수 없습니다.');
      }
    }
    throw new Error('사용자 게시물을 가져오는 데 실패했습니다.');
  }
};

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
export const getUserInfo = async () => {
  setUpAxios();
  try {
    const response = await axios.get(USER_INFO_API_URL);

    const { data } = response;
    return data;
  } catch (error: any) {
    console.error(error);
    const message = '프로필 페이지를 로드 중에 오류가 발생했습니다.\n다시 시도해주세요.';
    throw new RouteBaseError(500, message);
  }
};
