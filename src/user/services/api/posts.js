import axios from 'axios';
import { POSTS_CAMPUS_API_URL, POSTS_ALL_API_URL } from '../../../common/constants';

export const fetchCampusPosts = async params => {
  return fetchPosts(params, POSTS_CAMPUS_API_URL);
};

export const fetchAllPosts = async params => {
  return fetchPosts(params, POSTS_ALL_API_URL);
};

const fetchPosts = async (params, url) => {
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

export const postsCampusCreate = async data => {
  try {
    const response = await axios.post(POSTS_CAMPUS_API_URL, data);
    return response;
  } catch (error) {
    console.error('Failed to create post: ', error);
    throw error;
  }
};

export const postsCampusUpdate = async ({ data, postId }) => {
  try {
    const response = await axios.put(`${POSTS_CAMPUS_API_URL}/${postId}`, data);
    return response;
  } catch (error) {
    console.error('Failed to update post: ', error);
    throw error;
  }
};

export const postsCampusDelete = async postId => {
  try {
    const response = await axios.delete(`${POSTS_CAMPUS_API_URL}/${postId}`);
    return response;
  } catch (error) {
    console.error('Failed to delete post: ', error);
    throw error;
  }
};

export const postsCampusDetail = async postId => {
  try {
    const response = await axios.get(`${POSTS_CAMPUS_API_URL}/${postId}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch post detail: ', error);
  }
};

export const postLikes = async postId => {
  try {
    const response = await axios.post(`${POSTS_CAMPUS_API_URL}/${postId}/like`);
    return response;
  } catch (error) {
    console.error('Failed to fetch likes: ', error);
  }
};

export const postLikesCancel = async postId => {
  try {
    const response = await axios.delete(`${POSTS_CAMPUS_API_URL}/${postId}/like`);
    return response;
  } catch (error) {
    console.error('Failed to fetch likes cancel: ', error);
  }
};

export const replyList = async postId => {
  try {
    const response = await axios.get(`${POSTS_CAMPUS_API_URL}/${postId}/replies`);
    return response;
  } catch (error) {
    console.error('Failed to fetch post detail: ', error);
  }
};

export const uploadImage = async file => {
  try {
    // FormData 생성
    const formData = new FormData();
    formData.append('files', file);

    const response = await axios.post(`/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response;
  } catch (error) {
    console.error('Failed to upload: ', error);
  }
};
export const removeImage = async fileName => {
  try {
    const response = await axios.delete(`/remove/${fileName}`);
    return response;
  } catch (error) {
    console.error('Failed to upload: ', error);
  }
};
