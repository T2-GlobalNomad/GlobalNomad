'use client';

import { useAuthStore } from '@/stores/useAuthStore';
import Cookies from 'js-cookie';

export default function Logout() {
  const { logout, user } = useAuthStore();
  console.log('유저데이터:', user);
  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
