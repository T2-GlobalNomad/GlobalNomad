// app/auth/kakao/callback/page.tsx
'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // URL에서 인가 코드 추출
    const code = searchParams.get('code');
    if (!code) {
      console.error('인가 코드가 없습니다.');
      return;
    }

    // 백엔드 API(아래에서 생성할 API 경로)를 호출하여 토큰 교환을 진행합니다.
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!);
    params.append('redirect_uri', process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!);
    params.append('code', code);
    params.append(
      'client_secret',
      process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET!,
    );

    fetch('https://kauth.kakao.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: params.toString(),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('토큰 교환 실패');
        }
        return res.json();
      })
      .then((data) => {
        // data에는 카카오 access token과 사용자 정보가 포함될 수 있음
        console.log('로그인 성공:', data);
        Cookies.set('accessToken', data.access_token);
        Cookies.set('refreshToken', data.refresh_token);
        router.replace('/');
      })
      .catch((error) => {
        console.error('로그인 오류:', error);
        // 오류 발생 시 로그인 실패 페이지 등으로 리다이렉트할 수 있음
      });
  }, [searchParams, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <p>로그인 처리 중...</p>
    </div>
  );
}
