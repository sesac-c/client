import axios from 'axios';
import { LOGIN_API_URL, REFRESH_API_URL, USER_INFO_API_URL } from '../../constants';


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
    getUserInfo: async () => {
        try {
            const response = await axios.get(USER_INFO_API_URL);

            const { data } = response;
            return data;
        } catch (error) {
            console.error(error);
            const message = '유저 정보를 가져오던 중 오류가 발생했습니다.\n다시 시도해주세요.';
            throw new RouteBaseError(500, message);
        }
    }
};


export default authRequest;