import axios from 'axios';
import { NOTICES_ALL_API_URL } from '@/common/constants';

export const fetchNotices = async params => {
  try {
    const response = await axios.get(NOTICES_ALL_API_URL, {
      params
    });

    const { content, last } = response.data;
    return {
      newNotices: content.map(notice => ({
        ...notice,
        nickname: notice.writer,
        hashtags: notice.tags
      })),
      last
    };
  } catch (error) {
    console.error('Failed to fetch notice list:', error);
    throw error;
  }
};

export const fetchNotice = async (noticeId, url) => {
  try {
    return axios.get(`${url}/${noticeId}`);
  } catch (error) {
    console.error('Failed to fetch notice detail: ', error);
  }
};
