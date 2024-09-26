import axios from 'axios';
import { POSTS_CAMPUS_API_URL } from '../../../common/constants';

export const postsCampusList = async params => {
  try {
    const response = await axios.get(POSTS_CAMPUS_API_URL, {
      params
    });
    return response;
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
    console.log('Failed to fetch likes: ', error);
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
