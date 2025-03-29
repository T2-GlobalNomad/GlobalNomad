'use client';

import instance from '@/lib/api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { useEffect } from 'react';

export default function Logout() {
  const { logout } = useAuthStore();

  useEffect(() => {
    const getUser = async () => {
      const response = await instance('/users/me');
      console.log(response.data);
    };
    getUser();
  }, []);

  return (
    <div>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}
