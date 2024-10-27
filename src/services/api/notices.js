import axios from 'axios';
import { FEED_ROOT_API_URL, FEED_TYPE, NOTICE_TYPE } from '@/constants';

export const fetchNotices = async (params, apiUrl) => {
  try {
    const response = await axios.get(apiUrl, {
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


export const importantNotice = async () => {
  try {
    return axios.get(`${FEED_ROOT_API_URL(FEED_TYPE.NOTICE, NOTICE_TYPE.CAMPUS)}/important`);
  } catch (error) {
    console.error('Failed to important notice');
  }
};
