import { User } from '@/lib/types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import Cookies from 'js-cookie';

/**
 * @example
 * user {id,email,nickname,createdAt,updatedAt,profileImgUrl}을 얻을 수 있다.
 * const { user } = useAuthStore();
 * <p>{user.id}</p>
 *
 *
 * @author 남기연
 */

interface AuthState {
  user: User | null;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      setAuth: (user) => set({ user }),
      logout: () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        set({ user: null });
        // 카카오 로그아웃(카카오 계정과 함께 로그아웃하기)
        const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
        const logoutRedirectUri = `http://localhost:3000/signin`;

        const isKakaoLogin = Cookies.get('kakaoLogin');
        if (isKakaoLogin) {
          Cookies.remove('kakaoLogin');
          window.location.href = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${encodeURIComponent(
            logoutRedirectUri,
          )}`;
        } else {
          window.location.href = '/signin';
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
