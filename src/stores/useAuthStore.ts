import { login } from '@/lib/auth-api';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { LoginData } from '@/lib/auth-types';
import { User } from '@/lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (loginData: LoginData) => Promise<void>;
  logout: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: async (loginData: LoginData) => {
        const data = await login(loginData);
        set({
          user: data.user,
          isAuthenticated: true,
        });
      },
      logout: () => {
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-store', // 로컬 스토리지에 저장될 key
    },
  ),
);

export default useAuthStore;
