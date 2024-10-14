import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { NO_REFRESH_TOKEN_MESSAGE, REFRESH_TOKEN_EXPIRED, USER_KEY } from '../constants';
import TokenUtil, { getAuthErrorDetails } from '../utils/auth';
import authRequest from '../services/api/auth';

const useAuthStore = create(
    persist(
        (set, get) => ({
            // state
            isAuthenticated: false,
            user: null,

            // dispatch
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
                        user: {
                            nickname,
                            role,
                            profileImage
                        }
                    });
                    return { success: true, user: { nickname, role } };
                } catch (error) {
                    console.error('Login failed:', error);
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
                        user: {
                            nickname: newNickname,
                            role: newRole
                        }
                    });
                    return true;
                } catch (error) {
                    console.error('Token refresh failed:', error);

                    const { code } = error?.response?.data;
                    if (code === REFRESH_TOKEN_EXPIRED) throw error;

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