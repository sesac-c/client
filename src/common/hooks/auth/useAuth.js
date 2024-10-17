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
 */export const useAuth = (requiredRole) => {
    const navigate = useNavigate();
    const { user, isAuthenticated, logout, refreshAccessToken } = useAuthStore();
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);

            if (isAuthenticated && user) {
                if (user.role === requiredRole) {
                    setIsAuthorized(true);
                } else {
                    let redirectPath = getRedirectPath(user.role, logout);
                    window.alert(UNAUTHORIZED_ACCESS);
                    navigate(redirectPath, { replace: true });
                }
            } else {
                // 토큰이 있는지 확인
                const { accessToken, refreshToken } = TokenUtil.getTokens();

                if (accessToken || refreshToken) {
                    try {
                        // 리프레시 토큰으로 사용자 정보 다시 로드 시도
                        const refreshed = await refreshAccessToken();
                        if (refreshed) {
                            // 리프레시 성공, 사용자 정보 업데이트됨
                            const updatedUser = useAuthStore.getState().user;
                            if (updatedUser.role === requiredRole) {
                                setIsAuthorized(true);
                            } else {
                                let redirectPath = getRedirectPath(updatedUser.role, logout);
                                window.alert(UNAUTHORIZED_ACCESS);
                                navigate(redirectPath, { replace: true });
                            }
                        } else {
                            // 리프레시 실패
                            throw new Error('Refresh failed');
                        }
                    } catch (error) {
                        console.error('Failed to refresh token:', error);
                        window.alert(LOGIN_REQUIRED);
                        navigate(LOGIN_PATH, { replace: true });
                    }
                } else {
                    // 토큰이 없음
                    window.alert(LOGIN_REQUIRED);
                    navigate(LOGIN_PATH, { replace: true });
                }
            }

            setIsLoading(false);
        };

        checkAuth();
    }, [isAuthenticated, user, navigate, requiredRole, logout, refreshAccessToken]);

    return { isAuthorized, isLoading };
};