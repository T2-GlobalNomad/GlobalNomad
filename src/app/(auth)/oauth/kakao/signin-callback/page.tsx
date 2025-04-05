'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useKakaoSignInMutation } from '@/hooks/useAuth';

export default function KakaoSignInCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const kakaoSignIn = useKakaoSignInMutation();
  const [isProcessed, setIsProcessed] = useState(false);
  const [code, setCode] = useState<string | null>(null);

  useEffect(() => {
    const paramsCode = searchParams.get('code');
    if (paramsCode && !code) {
      setCode(paramsCode);
    }
  }, [searchParams, code]);

  useEffect(() => {
    if (!code) {
      setTimeout(() => {
        router.push('/signin');
      }, 1500);
      return;
    }
    if (isProcessed) return;
    setIsProcessed(true);

    kakaoSignIn.mutate(code);
  }, [code, router, kakaoSignIn, isProcessed]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>로그인 처리 중...</p>
    </div>
  );
}
