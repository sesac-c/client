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
interface ImageData {
  uuid: string;
  fileName: string;
  link: string;
}

interface UploadResponse {
  data: ImageData[];
}

interface RemoveResponse {
  result: boolean;
}

export const uploadImage = async (file: File): Promise<UploadResponse> => {
  try {
    const formData = new FormData();
    formData.append('files', file);

    const response: UploadResponse = await axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error) {
    console.error('이미지 업로드 실패: ', error);
    throw error;
  }
};

export const removeImage = async (fileName: string): Promise<RemoveResponse> => {
  try {
    const response: AxiosResponse<RemoveResponse> = await axios.delete(`/remove/${fileName}`);
    return response.data;
  } catch (error) {
    console.error('이미지 제거 실패: ', error);
    throw error;
  }
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
