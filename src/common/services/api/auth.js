import axios from 'axios';
import { getAuthErrorDetails } from '../../utils/auth';
import { LOGIN_API_URL, REFRESH_API_URL } from '../../constants';

export const loginRequest = async (email, password) => {
    try {
        const response = await axios.post(LOGIN_API_URL, { email, password });
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error('Login failed:', error.response.data);              // 서버가 2xx 범위를 벗어난 상태 코드로 응답한 경우
            throw new Error(error.response.data.message || 'Login failed');
        } else if (error.request) {
            console.error('No response received:', error.request);            // 요청이 전송되었지만 응답을 받지 못한 경우
            throw new Error('No response from server');
        } else {
            console.error('Error setting up request:', error.message);        // 요청 설정 중에 오류가 발생한 경우
            throw new Error('Error setting up request');
        }
    }
};