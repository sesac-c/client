import axios, { AxiosResponse } from 'axios';
import {
  MANAGER_CAMPUS_POST_LIST_API_URL,
  MANAGER_ALL_POST_LIST_API_URL,
  MANAGER_ALL_NOTICE_LIST_API_URL,
  MANAGER_GROUP_NOTICE_LIST_API_URL,
  MANAGER_NOTICE_REGISTER_API_URL
} from '../../../common/constants';
import { FeedListRequest, NoticeRegisterRequest } from '../../types';

const feedListRequest = async (url: string, params: FeedListRequest) => {
  try {
    const response = await axios.get(url, {
      params
    });
    return response;
  } catch (error) {
    console.error('Failed to fetch feed list:', error);
    throw error;
  }
};

export const campusPostListRequest = async (params: FeedListRequest) => {
  return await feedListRequest(MANAGER_CAMPUS_POST_LIST_API_URL, params);
};
export const allPostListRequest = async (params: FeedListRequest) => {
  return await feedListRequest(MANAGER_ALL_POST_LIST_API_URL, params);
};

export const allNoticeListRequest = async (params: FeedListRequest) => {
  return await feedListRequest(MANAGER_ALL_NOTICE_LIST_API_URL, params);
};
export const groupNoticeListRequest = async (params: FeedListRequest) => {
  return await feedListRequest(MANAGER_GROUP_NOTICE_LIST_API_URL, params);
};

export const writeNotice = async (data: NoticeRegisterRequest) => {
  const type = data.type;
  try {
    const response = await axios.post(MANAGER_NOTICE_REGISTER_API_URL(type), data);
    return response;
  } catch (error) {
    console.error('공지 업로드 실패: ', error);
    throw error;
  }
};
