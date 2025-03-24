'use client';

import Cookies from 'js-cookie';

export default function Logout() {
  const clientId = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY;
  const logoutRedirectUri = `http://localhost:3000/signin`;
  const handleLogout = () => {
    if (!clientId) {
      console.error('Kakao REST API 키가 없습니다.');
      return;
    }

    const logoutUrl = `https://kauth.kakao.com/oauth/logout?client_id=${clientId}&logout_redirect_uri=${encodeURIComponent(
      logoutRedirectUri,
    )}`;

    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');

    window.location.href = logoutUrl;
  };
  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
}
