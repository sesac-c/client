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
    console.error('Failed to fetch post list:', error);
    throw error;
  }
};
