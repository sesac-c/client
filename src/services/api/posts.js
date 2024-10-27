import axios from 'axios';
import { FEED_ROOT_API_URL, FEED_TYPE, POST_TYPE } from '@/constants';

export const fetchPosts = async (params, url) => {
  try {
    const response = await axios.get(url, {
      params
    });

    const { content, last } = response.data;

    return {
      newPosts: content.map(post => ({
        ...post,
        nickname: post.writer,
        hashtags: post.tags
      })),
      last
    };
  } catch (error) {
    console.error('Failed to fetch post list:', error);
    throw error;
  }
};

export const postsCampusCreate = async (data, feedType) => {
  try {
    const response = await axios.post(`posts/${feedType}`, data);
    return response;
  } catch (error) {
    console.error('Failed to create post: ', error);
    throw error;
  }
};

export const fetchPopular = async () => {
  try {
    return axios.get(`${FEED_ROOT_API_URL(FEED_TYPE.POST, POST_TYPE.CAMPUS)}/popular`);
  } catch (error) {
    console.error('Failed to fetch: ', error);
  }
};
