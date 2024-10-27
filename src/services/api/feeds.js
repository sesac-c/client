import axios from "axios";

export const fetchFeed = async (feedId, url) => {
    try {
        return axios.get(`${url}/${feedId}`);
    } catch (error) {
        console.error('Failed to fetch notice detail: ', error);
    }
};

export const feedCreate = async (data, apiUrl) => {
    try {
        const response = await axios.post(apiUrl, data);
        return response;
    } catch (error) {
        console.error('Failed to create feed: ', error);
        throw error;
    }
};

export const feedUpdate = async ({ apiUrl, data, feedId }) => {
    try {
        const response = await axios.put(`${apiUrl}/${feedId}`, data);
        return response;
    } catch (error) {
        console.error('Failed to update feed: ', error);
        throw error;
    }
};

export const feedDelete = async (apiUrl, feedId) => {
    try {
        const response = await axios.delete(`${apiUrl}/${feedId}`);
        return response;
    } catch (error) {
        console.error('Failed to delete feed: ', error);
        throw error;
    }
};