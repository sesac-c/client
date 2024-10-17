import axios from "axios";

export const fetchReplies = async (feedId, url) => {
    try {
        return axios.get(`${url}/${feedId}/replies`);
    } catch (error) {
        console.error('Failed to fetch replies: ', error);
    }
};

export const createReply = async (feedId, url, data) => {
    try {
        return axios.post(`${url}/${feedId}/replies`, data);
    } catch (error) {
        console.error('Failed to delete reply: ', error);
    }
};

export const deleteReply = async (feedId, url, replyId) => {
    try {
        return axios.delete(`${url}/${feedId}/replies/${replyId}`);
    } catch (error) {
        console.error('Failed to delete reply: ', error);
    }
};

export const updateReply = async (feedId, url, replyId, data) => {
    try {
        return axios.patch(`${url}/${feedId}/replies/${replyId}`, data);
    } catch (error) {
        console.error('Failed to update reply: ', error);
    }
};