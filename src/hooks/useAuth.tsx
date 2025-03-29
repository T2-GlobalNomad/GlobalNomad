'use client';

import { SignInData, SignInResponse } from '@/lib/auth-types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { kakaoSignIn, signIn } from '@/lib/auth-api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// 일반 로그인 hook
function useSignInMutation() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: (response) => {
      setAuth(response.user);
      // js-cookie에 토큰 저장. next action으로 하면 보안이 더좋음 추후논의.
      Cookies.set('accessToken', response.accessToken);
      Cookies.set('refreshToken', response.refreshToken);
      toast.success('로그인 성공!');
      router.push('/');
    },
    onError: (error: any) => {
      console.error('로그인 오류', error);
      toast.error('로그인 실패');
    },
  });
}

// 카카오 로그인 hook
function useKakaoSignInMutation() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (code: string) => kakaoSignIn(code),
    onSuccess: (response) => {
      setAuth(response.user);
      Cookies.set('accessToken', response.accessToken);
      Cookies.set('refreshToken', response.refreshToken);
      router.push('/');
    },
    onError: (error: any) => {
      console.error('로그인 오류', error);
      toast.error('로그인 실패');
    },
  });
}

export { useSignInMutation, useKakaoSignInMutation };
