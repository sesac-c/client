import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ACCESS_TOKEN_KEY, NO_REFRESH_TOKEN_MESSAGE, REFRESH_TOKEN_KEY, USER_KEY } from '../constants';
import { clearTokens, getTokens, setTokens } from '../utils/auth';
import { loginRequest } from '../services/api/auth';
import { refreshTokenRequest } from '../services/axios/setupAuth';
import axios from 'axios';

const useAuthStore = create(
    persist(
        (set, get) => ({
            // 상태 
            isAuthenticated: false,
            user: {
                nickname: null,
                role: null
            },

            // 사용자 정보 설정 함수
            setUser: (nickname, role) => {
                set({
                    isAuthenticated: true,
                    user: {
                        nickname,
                        role
                    }
                });
            },

            // 상태 초기화(로그아웃 시 필요) 함수
            resetUser: () => {
                clearTokens();
                set({
                    isAuthenticated: false,
                    user: null
                });
            },

            // token 갱신 함수
            refreshAccessToken: async () => {
                try {
                    const { accessToken, refreshToken } = getTokens();
                    if (!refreshToken || !accessToken) {
                        throw new Error(NO_REFRESH_TOKEN_MESSAGE);
                    }

                    const {
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                        nickname: newNickname,
                        role: newRole
                    } = await refreshTokenRequest(accessToken, refreshToken);

                    setTokens(newAccessToken, newRefreshToken);
                    get().setUser(newNickname, newRole);
                    axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`; // header 재 셋팅

                    return true;
                } catch (error) {
                    console.error(error);
                    get().logout();
                    return false;
                }
            },

            // 로그인 함수 
            login: async (email, password) => {
                try {
                    const { accessToken, refreshToken, nickname, role } = await loginRequest(email, password);

                    setTokens(accessToken, refreshToken);
                    set({
                        isAuthenticated: true,
                        user: {
                            nickname: nickname,
                            role: role
                        }
                    });
                    return { success: true, user: { nickname, role } };
                } catch (error) {
                    console.error('Login failed:', error);
                    return { success: false, error };
                }
            },

            // 로그아웃 함수
            logout: () => {
                get().resetUser();
            }
        }),
        {
            name: USER_KEY, // 로컬 스토리지에 저장될 키 이름
        }
    )
);

export default useAuthStore;