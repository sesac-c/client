import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NO_REFRESH_TOKEN_MESSAGE, REFRESH_TOKEN_EXPIRED, USER_KEY } from '../constants';
import TokenUtil, { getAuthErrorDetails } from '../utils/auth';
import authRequest from '../services/api/auth';

const useAuthStore = create(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,

            setUser: (user) => set({ isAuthenticated: true, user }),
            resetUser: () => {
                TokenUtil.clearTokens();
                set({ isAuthenticated: false, user: null });
            },
            login: async (email, password) => {
                try {
                    const { accessToken, refreshToken, nickname, role, profileImage } = await authRequest.login(email, password);
                    TokenUtil.setTokens(accessToken, refreshToken);
                    set({
                        isAuthenticated: true,
                        user: { nickname, role, profileImage }
                    });
                    return { success: true, user: { nickname, role } };
                } catch (error) {
                    console.error('로그인 실패: ', error);
                    return { success: false, error };
                }
            },
            logout: () => get().resetUser(),
            refreshAccessToken: async () => {
                try {
                    const { accessToken, refreshToken } = TokenUtil.getTokens();
                    if (!refreshToken || !accessToken) {
                        throw new Error(NO_REFRESH_TOKEN_MESSAGE);
                    }
                    const {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                        nickname: newNickname,
                        role: newRole
                    } = await authRequest.refreshToken(accessToken, refreshToken);

                    TokenUtil.setTokens(newAccessToken, newRefreshToken);

                    set({
                        isAuthenticated: true,
                        user: {
                            nickname: newNickname,
                            role: newRole
                        }
                    });
                    return true;
                } catch (error) {
                    console.error("리프레쉬 토큰 에러: ", error);
                    get().logout();
                    return false;
                }
            },
        }),
        {
            name: USER_KEY,
        }
    )
);

export default useAuthStore;