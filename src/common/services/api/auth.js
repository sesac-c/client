import axios from 'axios';
import { LOGIN_API_URL, REFRESH_API_URL } from '../../constants';


const authRequest = {
    login: async (email, password) => {
        try {
            const response = await axios.post(LOGIN_API_URL, { email, password });
            return response.data;

        } catch (error) {
            throw error;
        }
    },
    refreshToken: async (accessToken, refreshToken) => {
        const response = await axios.post(REFRESH_API_URL, { accessToken, refreshToken });
        return response.data;
    },
};

export default authRequest;