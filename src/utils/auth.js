import {
    ACCESS_TOKEN_EXPIRED,
    ACCESS_TOKEN_EXPIRED_MESSAGE,
    ACCESS_TOKEN_KEY,
    MANAGER_ROLE,
    REFRESH_TOKEN_EXPIRED,
    REFRESH_TOKEN_EXPIRED_MESSAGE,
    REFRESH_TOKEN_KEY,
    UNEXPECTED_TOKEN_MESSAGE,
    USER_KEY,
    USER_ROLE,
} from '@/constants';
import {
    LOGIN_PATH,
    MANAGER_PATH,
    USER_PATH,
} from '@/routes/paths'

const TokenUtil = {
    setTokens: (accessToken, refreshToken) => {
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    },
    getTokens: () => ({
        accessToken: localStorage.getItem(ACCESS_TOKEN_KEY),
        refreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    }),
    clearTokens: () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
    },
};

export default TokenUtil;


export function getAuthErrorDetails(error) {
    const defaultErrorInfo = {
        code: "UNEXPECTED_TOKEN_MESSAGE",
        message: UNEXPECTED_TOKEN_MESSAGE,
        needsAccessTokenRefresh: false,
        status: undefined
    };

    if (!error.response) {
        return defaultErrorInfo;
    }

    const { status, data } = error.response;
    const { message, code } = data || {};

    if (status === 403) {
        switch (code) {
            case ACCESS_TOKEN_EXPIRED:
                return {
                    code,
                    message: message || ACCESS_TOKEN_EXPIRED_MESSAGE,
                    needsAccessTokenRefresh: true,
                    status
                };
            case REFRESH_TOKEN_EXPIRED:
                return {
                    code,
                    message: message || REFRESH_TOKEN_EXPIRED_MESSAGE,
                    needsAccessTokenRefresh: false,
                    status
                };
        }
    }

    return {
        code: code || defaultErrorInfo.code,
        message: message || defaultErrorInfo.message,
        needsAccessTokenRefresh: false, status
    };
}

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