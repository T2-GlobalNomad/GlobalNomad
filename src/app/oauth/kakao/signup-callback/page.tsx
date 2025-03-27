'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { kakaoSignUp } from '@/lib/auth-api';
import KakaoSignUpForm from './components/KakaoSignUpForm';

export default function KakaoSignUpCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_SIGNUP_URI;

  useEffect(() => {
    if (!code) {
      console.error('인가 코드가 없습니다.');
      return;
    }
  }, [code, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <KakaoSignUpForm
        code={code as string}
        redirectUri={redirectUri as string}
      />
    </div>
  );
}
