import axios from 'axios';

import { LOGIN_PATH } from '@/routes/paths';
import { LOGIN_API_URL, LOGIN_REQUIRED, } from '@/constants';
import TokenUtil, { getAuthErrorDetails } from '@/utils/auth';
import useAuthStore from '@/stores/modalStore';

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

export const setupAxiosDefaults = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
    axios.defaults.timeout = 10000; //10초
    axios.defaults.headers.common['Content-Type'] = 'application/json';
};

export const setupAuthInterceptor = () => {
    axios.interceptors.request.use(
        (config) => {
            const { accessToken } = TokenUtil.getTokens();
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );


    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            const { status, needsAccessTokenRefresh } = getAuthErrorDetails(error);

            const isLoginRequest = originalRequest.url.includes(LOGIN_API_URL);

            if (!isLoginRequest) {
                if (needsAccessTokenRefresh && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const refreshed = await useAuthStore.getState().refreshAccessToken();
                        if (refreshed) {
                            const { accessToken } = TokenUtil.getTokens();
                            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                            return axios(originalRequest);
                        }
                    } catch (refreshError) {
                        useAuthStore.getState().logout();
                        window.alert(LOGIN_REQUIRED);
                        window.location.href = LOGIN_PATH;
                        return Promise.reject(refreshError);
                    }
                }

                if (status === 401 || status === 403) {
                    useAuthStore.getState().logout();

                    window.alert(LOGIN_REQUIRED);
                    window.location.href = LOGIN_PATH;
                    return Promise.reject(refreshError);
                }

                return Promise.reject(error);

            } else {

                return Promise.reject(error);

            }
        }
    );
};

export const setUpAxios = () => {
    setupAxiosDefaults();
    setupAuthInterceptor();
}