import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { LOGIN_PATH, LOGIN_REQUIRED, UNAUTHORIZED_ACCESS, USER_KEY } from "../../constants";
import { useEffect, useState } from "react";
import TokenUtil, { getRedirectPath } from "../../utils/auth";

/**
 * [인증된 사용자인지 router 전, 검사하는 미들웨어]
 * 인증 프로세스
 * 1. localStorage에서 userData를 가져와 파싱 시도
 * 2. 파싱된 데이터가 있고 인증된 상태라면 role 확인
 * 3. 인증되지 않았거나 데이터가 없다면 refreshToken으로 인증 시도
 * 4. 모든 경우에 대해 적절한 처리 (인증, 리다이렉트, 에러 처리 등)
 * 
 * @param {string} requiredRole - 요구되는 사용자 역할
 * @returns {boolean} isAuthorized - 인증 상태
 */
export const useAuth = (requiredRole) => {
    console.log(requiredRole)
    const navigate = useNavigate();
    const { refreshAccessToken, logout, user } = useAuthStore();
    const [isAuthorized, setIsAuthorized] = useState(false);

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        setIsAuthorized(false);
        setIsLoading(false);
    }, [user]);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);
            const userData = localStorage.getItem(USER_KEY);
            const { accessToken, refreshToken } = TokenUtil.getTokens();

            let parsedUserData;
            try {
                parsedUserData = JSON.parse(userData);
            } catch (error) {
                parsedUserData = null;
            }

            if (parsedUserData && parsedUserData.state && parsedUserData.state.isAuthenticated && accessToken && refreshToken) {
                const { user } = parsedUserData.state;

                if (user.role === requiredRole) {
                    setIsAuthorized(true);
                } else {
                    let redirectPath = getRedirectPath(user.role, logout);
                    window.alert(UNAUTHORIZED_ACCESS);
                    navigate(redirectPath, { replace: true });
                }
            } else {
                const refreshed = await refreshAccessToken();
                if (!refreshed) {
                    window.alert(LOGIN_REQUIRED);
                    navigate(LOGIN_PATH, { replace: true });
                } else {
                    setIsAuthorized(true);
                }
            }
            setIsLoading(false);
        };

        checkAuth();
    }, [navigate, refreshAccessToken, requiredRole, logout]);


    return { isAuthorized, isLoading };
};