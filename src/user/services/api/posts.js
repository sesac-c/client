import axios from 'axios';

export const postsCampusList = async params => {
  try {
    const response = await axios.get('/posts/campus', {
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
    const response = await axios.post('/posts/campus', data);
    return response;
  } catch (error) {
    console.error('Failed to create post: ', error);
    throw error;
  }
};

export const postsCampusDetail = async postId => {
  try {
    const response = await axios.get(`/posts/campus/${postId}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch post detail: ', error);
  }
};

export const replyList = async postId => {
  try {
    const response = await axios.get(`/posts/campus/${postId}/replies`);
    return response;
  } catch (error) {
    console.error('Failed to fetch post detail: ', error);
  }
};
