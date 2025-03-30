'use client';

import styles from './index.module.css';
import SignInForm from './components/SignInForm';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OauthSignIn from './components/OauthSignIn';

export default function SignIn() {
  const router = useRouter();

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
      <OauthSignIn />
    </div>
  );
}
