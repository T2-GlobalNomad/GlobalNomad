'use client';

import {
  KakaoSignUpData,
  SignInData,
  SignInResponse,
  SignUpData,
} from '@/lib/auth-types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { kakaoSignIn, kakaoSignUp, signIn, signUp } from '@/lib/auth-api';
import { useAuthStore } from '@/stores/useAuthStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

// 일반 로그인 hook
function useSignInMutation() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: SignInData) => signIn(data),
    onSuccess: (response: SignInResponse) => {
      setAuth(response.user);
      // js-cookie에 토큰 저장. next action으로 하면 보안이 더좋음 추후논의.
      Cookies.set('accessToken', response.accessToken);
      Cookies.set('refreshToken', response.refreshToken);
      toast.success('로그인 성공!');
      router.push('/');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
}

// 일반 회원가입 hook
function useSignUpMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: (signUpData: SignUpData) => signUp(signUpData),
    onSuccess: () => {
      toast.success('회원가입 성공! \n 로그인 페이지로 이동합니다.');
      router.push('/signin');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
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
      if (!response || !response.user) {
        toast.error('로그인 응답이 올바르지 않습니다.');
        return;
      }

      setAuth(response.user);
      Cookies.set('accessToken', response.accessToken);
      Cookies.set('refreshToken', response.refreshToken);
      Cookies.set('kakaoLogin', 'true');
      toast.success('로그인 성공!', { id: 'loginSuccess' });
      router.push('/');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error(error);
        toast.error(error.message);
      } else {
        toast.error('알 수 없는 오류가 발생했습니다.');
      }
    },
  });
}

// 카카오 회원가입 hook
function useKakaoSignUpMutation() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ code, nickname }: KakaoSignUpData) => {
      return kakaoSignUp(code, nickname);
    },
    onSuccess: () => {
      toast.success('카카오 회원가입 성공!\n로그인 페이지로 이동합니다.');
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        if (error.message === '잘못된 인가 코드입니다.') {
          toast.error(`${error.message} \n회원가입 페이지로 이동합니다.`);
          setTimeout(() => {
            router.push('/signup');
          }, 1000);
        } else if (error.message === '이미 등록된 사용자입니다.') {
          toast.error(`${error.message} \n로그인 페이지로 이동합니다.`);
          setTimeout(() => {
            router.push('/signin');
          }, 1500);
        } else {
          toast.error(`${error.message} \n회원가입 페이지로 이동합니다.`);
          setTimeout(() => {
            router.push('/signup');
          }, 1500);
        }
      } else {
        toast.error(
          '알 수 없는 오류가 발생했습니다. \n회원가입 페이지로 이동합니다.',
        );
        setTimeout(() => {
          router.push('/signup');
        }, 1500);
      }
    },
  });
}

export {
  useSignInMutation,
  useKakaoSignInMutation,
  useSignUpMutation,
  useKakaoSignUpMutation,
};
