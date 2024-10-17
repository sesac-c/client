import axios from "axios";

export const feedLikes = async (apiUrl, feedId) => {
  try {
    const response = await axios.post(`${apiUrl}/${feedId}/like`);
    return response;
  } catch (error) {
    console.error('Failed to fetch likes: ', error);
  }
};

export const feedLikesCancel = async (apiUrl, feedId) => {
  try {
    const response = await axios.delete(`${apiUrl}/${feedId}/like`);
    return response;
  } catch (error) {
    console.error('Failed to fetch likes cancel: ', error);
  }
};