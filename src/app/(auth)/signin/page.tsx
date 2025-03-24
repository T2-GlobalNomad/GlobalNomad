'use client';

import styles from './index.module.css';
import SignInForm from './components/SignInForm';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const router = useRouter();

  const clientId = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  // 카카오 인증 URL 구성 (인가 코드 받기 위한 URL)
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri ?? '',
  )}&response_type=code`;

  useEffect(() => {
    const token = Cookies.get('accessToken');

    if (token) {
      router.replace('/');
    }
  }, [router]);

  return (
    <div className={styles.container}>
      <SignInForm />
      <p>
        회원이 아니신가요?{' '}
        <Link href='/signup' className={styles.link}>
          회원가입하기
        </Link>
      </p>
      <a href={kakaoAuthUrl}>
        <button>카카오 로그인하기</button>
      </a>
    </div>
  );
}
