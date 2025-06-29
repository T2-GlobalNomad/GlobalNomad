'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useKakaoSignInMutation } from '@/hooks/mutation/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

export default function KakaoSignInCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kakaoSignIn = useKakaoSignInMutation();
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const paramsCode = searchParams.get('code');
    if (paramsCode && !code) {
      setCode(paramsCode);
    }
  }, [searchParams, code, kakaoSignIn]);

  useEffect(() => {
    if (!code) {
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
      return;
    }

    kakaoSignIn.mutate(code);
  }, [code, router, kakaoSignIn]);

  return <LoadingSpinner text='카카오 로그인 처리중입니다...' />;
}
