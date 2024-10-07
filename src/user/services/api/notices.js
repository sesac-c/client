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

export const noticeLikes = async noticeId => {
  try {
    const response = await axios.post(`${NOTICES_ALL_API_URL}/${noticeId}/like`);
    return response;
  } catch (error) {
    console.error('Failed to fetch likes: ', error);
  }
};

export const noticeLikesCancel = async noticeId => {
  try {
    const response = await axios.delete(`${NOTICES_ALL_API_URL}/${noticeId}/like`);
    return response;
  } catch (error) {
    console.error('Failed to fetch likes cancel: ', error);
  }
};

export const fetchReplies = async (noticeId, url) => {
  try {
    return axios.get(`${url}/${noticeId}/replies`);
  } catch (error) {
    console.error('Failed to fetch replies: ', error);
  }
};

export const createReply = async (noticeId, url, data) => {
  try {
    return axios.post(`${url}/${noticeId}/replies`, data);
  } catch (error) {
    console.error('Failed to delete reply: ', error);
  }
};

export const deleteReply = async (noticeId, url, replyId) => {
  try {
    return axios.delete(`${url}/${noticeId}/replies/${replyId}`);
  } catch (error) {
    console.error('Failed to delete reply: ', error);
  }
};

export const updateReply = async (noticeId, url, replyId, data) => {
  try {
    return axios.patch(`${url}/${noticeId}/replies/${replyId}`, data);
  } catch (error) {
    console.error('Failed to update reply: ', error);
  }
};

export const importantNotice = async () => {
  try {
    return axios.get(`${NOTICES_ALL_API_URL}/important`);
  } catch (error) {
    console.error('Failed to important notice');
  }
}
