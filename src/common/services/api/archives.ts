import { UserPostResponse } from '@/common/types';
import { USER_POSTS_API_URL, USER_LIKE_POSTS_API_URL, USER_REPLY_POSTS_API_URL } from '@/common/constants';
import axios, { AxiosError } from 'axios';

interface FetchConfig {
  url: string;
  errorMessage: string;
  notFoundMessage: string;
}

const fetchPosts = async ({ url, errorMessage, notFoundMessage }: FetchConfig): Promise<UserPostResponse[]> => {
  try {
    const response = await axios.get<UserPostResponse[]>(url);
    return response.data;
  } catch (error) {
    console.error(errorMessage, error);
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 404) {
        throw new Error(notFoundMessage);
      }
    }
    throw new Error(errorMessage);
  }
};

export const getUserPosts = (userId: number): Promise<UserPostResponse[]> =>
  fetchPosts({
    url: USER_POSTS_API_URL(userId),
    errorMessage: '사용자 게시물을 가져오는 데 실패했습니다.',
    notFoundMessage: '사용자 게시물을 찾을 수 없습니다.'
  });

export const getUserLikePosts = (): Promise<UserPostResponse[]> =>
  fetchPosts({
    url: USER_LIKE_POSTS_API_URL,
    errorMessage: '사용자가 좋아요한 게시물을 가져오는 데 실패했습니다.',
    notFoundMessage: '사용자가 좋아요한 게시물을 찾을 수 없습니다.'
  });

export const getUserReplyPosts = (): Promise<UserPostResponse[]> =>
  fetchPosts({
    url: USER_REPLY_POSTS_API_URL,
    errorMessage: '사용자가 댓글을 단 게시물을 가져오는 데 실패했습니다.',
    notFoundMessage: '사용자가 댓글을 단 게시물을 찾을 수 없습니다.'
  });
