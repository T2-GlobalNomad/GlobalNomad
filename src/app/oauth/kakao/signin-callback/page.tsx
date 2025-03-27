'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { kakaoSignIn } from '@/lib/auth-api';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/stores/useAuthStore';

export default function KakaoSignInCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const { setAuth } = useAuthStore();

  useEffect(() => {
    if (!code) {
      console.error('인가 코드가 없습니다.');
      return;
    }

    async function oauthSignIn() {
      try {
        const response = await kakaoSignIn(code!);
        if (response) {
          setAuth(response.user);
        }
        toast.success('로그인 성공');
        router.push('/');
      } catch (error) {
        console.error(error);
        toast.error('로그인 실패');
      }
    }

    // 비동기 함수 호출
    oauthSignIn();
  }, [code, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>로그인 처리 중...</p>
    </div>
  );
}
