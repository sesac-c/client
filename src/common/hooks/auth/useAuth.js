import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/authStore";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, LOGIN_PATH, MANAGER_PATH, MANAGER_ROLE, USER_KEY, USER_PATH, USER_ROLE } from "../../constants";
import { useEffect, useState } from "react";
import { getRedirectPath, getTokens } from "../../utils/auth";

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
    console.log('====================useAuth: 접근 권한이 필요한 페이지를 검사하는 훅');
    const navigate = useNavigate();
    const { refreshAccessToken, logout } = useAuthStore();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const userData = localStorage.getItem(USER_KEY);
            const { accessToken, refreshToken } = getTokens();
            console.log('====================userData:', userData);

            let parsedUserData;
            try {
                parsedUserData = JSON.parse(userData);
            } catch (error) {
                console.log('====================JSON 파싱 실패:', error);
                parsedUserData = null;
            }

            if (parsedUserData && parsedUserData.state && parsedUserData.state.isAuthenticated && accessToken && refreshToken) {
                console.log('====================인증된 사용자:', parsedUserData.state.user);
                const { user } = parsedUserData.state;

                if (user.role === requiredRole) {
                    setIsAuthorized(true);
                } else {
                    let redirectPath = getRedirectPath(user.role, logout);
                    window.alert('잘못된 접근입니다');
                    navigate(redirectPath, { replace: true });
                }
            } else {
                console.log('====================인증된 사용자 정보가 없음 아님');
                const refreshed = await refreshAccessToken();
                if (!refreshed) {
                    console.log('====================토큰 갱신 실패');
                    window.alert('로그인이 필요합니다.');
                    navigate(LOGIN_PATH, { replace: true });
                } else {
                    console.log('====================토큰 갱신 성공');
                    setIsAuthorized(true);
                }
            }
        };

        checkAuth();
    }, [navigate, refreshAccessToken, requiredRole, logout]);

    return isAuthorized;
};