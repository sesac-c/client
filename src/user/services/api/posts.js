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
