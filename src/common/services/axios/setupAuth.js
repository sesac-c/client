import axios from 'axios';
import { StatusCodes } from 'http-status-codes';

import { ACCESS_TOKEN_KEY, LOGIN_PATH, NO_REFRESH_TOKEN_MESSAGE, REFRESH_API_URL, REFRESH_TOKEN_KEY, USER_KEY } from '../../constants';
import { clearTokens, getAuthErrorDetails, setTokens } from '../../utils/auth';

/**
 * [setupAuthInterceptor]
 * Axios 요청과 응답을 가로채는 목적
 * 
 * 1) 요청 인터셉터: 모든 요청에 자동으로 액세스 토큰을 추가.
 * 2) 응답 인터셉터
 * - 인증 오류를 처리하고, 필요시 토큰을 갱신하며, 적절한 페이지로 리다이렉트
 * - 일반적인 상황에서, access token의 유효성에 대해 error가 발생하면 인증 오류 처리를 진행할 것임.
 * - 토큰 갱신 시도를 한 번만 하도록 _retry 플래그를 사용
 * 
 * 토큰 만료: 403 응답 코드와 EXPIRED 오류 코드로 리프레시 토큰을 갱신하고 요청을 재시도
 * 기타 인증 오류: 401 또는 403 응답 코드에 대한 오류 처리를 하고 로그인 페이지로 리다이렉트
 * 기타 오류: 네트워크 또는 예기치 않은 오류를 처리
 * 
 */

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// 리프레시 토큰 요청을 위한 별도의 axios 인스턴스
const refreshAxiosInstance = axios.create();

export const refreshTokenRequest = async (accessToken, refreshToken) => {
    try {
        const response = await refreshAxiosInstance.post(BASE_URL + REFRESH_API_URL,
            { accessToken, refreshToken },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Token refresh failed:', error.response?.data || error.message);
        throw new Error('토큰 갱신 실패');
    }
};

export const setupAuthInterceptor = () => {
    console.log('==========================요청/응답 인터셉트 셋팅 실행');

    axios.interceptors.request.use( // 요청 인터셉트
        (config) => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
            if (accessToken) { // 모든 요청헤더에 자동으로 액세스 토큰을 추가.
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    axios.interceptors.response.use( // 응답 인터셉트
        (response) => response, // 성공적인 응답은 그대로 반환

        async (error) => {
            const originalRequest = error.config;

            const { needsAccessTokenRefresh } = getAuthErrorDetails(error);

            if (needsAccessTokenRefresh && !originalRequest._retry) { // access token 만료의 상황. _retry 플래그
                originalRequest._retry = true;
                try {
                    const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
                    if (!refreshToken) { // 저장된 refreshToken 없음
                        throw new Error(NO_REFRESH_TOKEN_MESSAGE);
                    }

                    // token 갱신 요청
                    const { accessToken: newAccessToken, refreshToken: newRefreshToken } = await refreshTokenRequest(refreshToken);
                    setTokens(newAccessToken, newRefreshToken);

                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`; // header 재 셋팅

                    return axios(originalRequest); // 원래 요청 재 수행.
                } catch (refreshError) {
                    clearTokens();
                    return Promise.reject(refreshError); // refresh token이 없거나 만료된 상태이므로 clear (로그아웃)
                }
            }
            return Promise.reject(error);
        }
    );
};


export const setupAxiosDefaults = () => {
    console.log('==========================axios 기본 셋팅 실행');
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.timeout = 10000; // 10 seconds
    axios.defaults.headers.common['Content-Type'] = 'application/json';
};