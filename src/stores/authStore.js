import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { NO_REFRESH_TOKEN_MESSAGE, USER_KEY } from '@/constants';
import TokenUtil from '@/utils/auth';
import authRequest from '@/services/api/auth';

const useAuthStore = create(
    persist(
        (set, get) => ({
            isAuthenticated: false,
            user: null,
            profileImage: null,

            setUser: (user) => set({ isAuthenticated: true, user }),
            setProfileImage: (profileImage) => set({ profileImage }),
            resetUser: () => {
                TokenUtil.clearTokens();
                set({ isAuthenticated: false, user: null, profileImage: null });
            },
            login: async (email, password) => {
                try {
                    const { accessToken, refreshToken, nickname, role, profileImage } = await authRequest.login(email, password);
                    TokenUtil.setTokens(accessToken, refreshToken);
                    set({
                        isAuthenticated: true,
                        user: { nickname, role },
                        profileImage
                    });
                    return { success: true, user: { nickname, role } };
                } catch (error) {
                    console.error('로그인 실패');
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
                        role: newRole,
                        profileImage: newProfileImage
                    } = await authRequest.refreshToken(accessToken, refreshToken);

                    TokenUtil.setTokens(newAccessToken, newRefreshToken);

                    set({
                        isAuthenticated: true,
                        user: {
                            nickname: newNickname,
                            role: newRole
                        },
                        profileImage: newProfileImage
                    });
                    return true;
                } catch (error) {
                    console.error("리프레쉬 토큰 에러: ", error);
                    get().logout();
                    return false;
                }
            },
            fetchUserInfo: async () => {
                try {
                    const { nickname, role, profileImage } = await authRequest.getUserInfo();

                    set({
                        user: { nickname, role },
                        profileImage
                    });
                    return true;
                } catch (error) {
                    console.error('유저 정보 로드 중 오류: ', error);
                    return false;
                }
            }
        }),
        {
            name: USER_KEY,
        }
    )
);

export default useAuthStore;