import { StatusCodes } from 'http-status-codes';
import {
    ACCESS_TOKEN_EXPIRED,
    ACCESS_TOKEN_EXPIRED_MESSAGE,
    ACCESS_TOKEN_KEY,
    LOGIN_PATH,
    MANAGER_PATH,
    MANAGER_ROLE,
    REFRESH_TOKEN_EXPIRED,
    REFRESH_TOKEN_EXPIRED_MESSAGE,
    REFRESH_TOKEN_KEY,
    UNEXPECTED_TOKEN_MESSAGE,
    USER_KEY,
    USER_PATH,
    USER_ROLE,
} from '../constants';

// 토큰 관리 함수들
export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const getTokens = () => {
    return {
        [ACCESS_TOKEN_KEY]: localStorage.getItem(ACCESS_TOKEN_KEY),
        [REFRESH_TOKEN_KEY]: localStorage.getItem(REFRESH_TOKEN_KEY),
    }
};

export const clearTokens = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};


export function getAuthErrorDetails(error) {
    const defaultErrorInfo = {
        message: UNEXPECTED_TOKEN_MESSAGE,
        needsAccessTokenRefresh: false
    };

    if (!error.response) {
        return defaultErrorInfo;
    }

    const { status, data } = error.response;
    const { message, code } = data || {};

    if (status === StatusCodes.FORBIDDEN) {
        switch (code) {
            case ACCESS_TOKEN_EXPIRED:
                return {
                    message: message || ACCESS_TOKEN_EXPIRED_MESSAGE,
                    needsAccessTokenRefresh: true
                };
            case REFRESH_TOKEN_EXPIRED:
                return {
                    message: message || REFRESH_TOKEN_EXPIRED_MESSAGE,
                    needsAccessTokenRefresh: false
                };
        }
    }

    return {
        message: message || defaultErrorInfo.message,
        needsAccessTokenRefresh: false
    };
}

// 리다이렉트 로직을 별도의 함수로 분리
export const getRedirectPath = (role, resetUser) => {
    switch (role) {
        case MANAGER_ROLE:
            return MANAGER_PATH;
        case USER_ROLE:
            return USER_PATH;
        default:
            resetUser();
            return LOGIN_PATH;
    }
};