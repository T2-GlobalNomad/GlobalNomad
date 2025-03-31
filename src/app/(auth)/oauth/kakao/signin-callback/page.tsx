'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useKakaoSignInMutation } from '@/hooks/useAuth';

export default function KakaoSignInCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const code = searchParams.get('code');
  const kakaoSignIn = useKakaoSignInMutation();

  useEffect(() => {
    if (!code) {
      console.error('인가 코드가 없습니다.');
      return;
    }

    kakaoSignIn.mutate(code);
  }, [code, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>로그인 처리 중...</p>
    </div>
  );
}
