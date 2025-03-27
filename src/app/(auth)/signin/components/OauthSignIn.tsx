import styles from '../../signup/components/OauthSignUp.module.css';
import Image from 'next/image';

export default function OauthSignIn() {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  const redirectUri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_SIGNIN_URI;
  // 카카오 인증 URL 구성 (인가 코드 받기 위한 URL)
  const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri ?? '',
  )}&response_type=code`;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.text}>SNS 계정으로 로그인하기</div>
      </div>
      <div>
        <a href={kakaoAuthUrl}>
          <Image
            src={'/images/logo_kakao.svg'}
            alt='카카오 로고 아이콘'
            width={72}
            height={72}
          />
        </a>
      </div>
    </div>
  );
}
