import { AxiosError } from 'axios';
import instance from './api';
import { SignUpData, SignInData, SignInResponse } from './auth-types';

// 회원가입 api
export async function signUp(signUpData: SignUpData) {
  try {
    const response = await instance.post('/users', signUpData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data?.message || '회원가입에 실패했습니다.',
      );
    } else {
      throw error;
    }
  }
}

// 로그인 api
export async function signIn(loginData: SignInData): Promise<SignInResponse> {
  try {
    const response = await instance.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || '로그인에 실패했습니다.';
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
}

// 카카오 간편 회원가입 api
export async function kakaoSignUp(code: string, nickname: string) {
  if (!code) {
    console.error('인가 코드가 없습니다.');
    return;
  }
  try {
    const response = await instance.post('/oauth/sign-up/kakao', {
      nickname: nickname,
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_SIGNUP_URI,
      token: code,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || '카카오 회원가입에 실패했습니다.';
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
}

// 카카오 간편 로그인 api
export async function kakaoSignIn(code: string) {
  if (!code) {
    throw new Error('인가 코드가 없습니다.');
  }
  try {
    const response = await instance.post('/oauth/sign-in/kakao', {
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_SIGNIN_URI,
      token: code,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || '카카오 로그인에 실패했습니다.';
      throw new Error(errorMessage);
    } else {
      throw error;
    }
  }
}
