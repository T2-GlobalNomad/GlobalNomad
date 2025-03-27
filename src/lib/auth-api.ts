import { AxiosError } from 'axios';
import instance from './api';
import { toast } from 'react-hot-toast';
import { SignInData, SignInResponse } from './auth-types';
import Cookies from 'js-cookie';

// 회원가입 api
interface NewUser {
  email: string;
  password: string;
  nickname: string;
}

export async function signUp(newUser: NewUser) {
  try {
    const response = await instance.post('/users', newUser);
    // ⬇️ 추후삭제
    console.log('회원가입 성공:', response.data);
    toast.success('회원가입 성공!\n 로그인 페이지로 이동합니다.');
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        // ⬇️ 추후삭제
        console.error('회원가입 오류: 이메일이 중복되었습니다.');
        toast.error('이메일이 중복되었습니다!');
      } else {
        toast.error('오류발생 잠시후 시도해주세요');
      }
      console.error('회원가입 오류:', error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || '회원가입에 실패했습니다.',
      );
    } else {
      console.error('회원가입 오류:', error);
      throw error;
    }
  }
}

// 로그인 api

export async function signIn(loginData: SignInData): Promise<SignInResponse> {
  try {
    const response = await instance.post('/auth/login', loginData);
    // js-cookie에 토큰 저장. next action으로 하면 보안이 더좋음 추후논의.
    Cookies.set('accessToken', response.data.accessToken);
    Cookies.set('refreshToken', response.data.refreshToken);
    console.log('로그인 성공', response.data);
    toast.success('로그인 성공!');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorMessage =
        error.response?.data?.message || '로그인에 실패했습니다.';
      console.error('로그인 오류:', error.response?.data || error.message);
      toast.error(errorMessage);
      throw new Error(errorMessage);
    } else {
      console.error('로그인 오류:', error);
      toast.error('로그인에 실패했습니다.');
      throw error;
    }
  }
}

// 카카오 앱등록 api
export async function registerApp() {
  try {
    const response = await instance.post('/oauth/apps', {
      appKey: `${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      provider: 'kakao',
    });
    console.log('앱 등록 성공', response);
  } catch (error) {
    console.error('앱 등록 실패', error);
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
    console.log('카카오 회원가입 성공:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('카카오 회원가입 실패:', error);
    if (error.response && error.response.data) {
      console.error('카카오 회원가입 실패 상세:', error.response.data);
      if (error.response.data.message === '이미 등록된 사용자입니다.') {
        toast.success('이미 회원가입했습니다. \n로그인 페이지로 이동합니다.');
        setTimeout(() => {
          window.location.href = '/signin';
        }, 1500);
      } else if (error.response.data.message === '잘못된 인가 코드입니다.') {
        toast.error('잘못된 인가코드입니다. \n회원가입 페이지로 이동합니다.');
        setTimeout(() => {
          window.location.href = '/signup';
        }, 1500);
      } else {
        toast.error(error.response.data.message || '카카오 회원가입 실패');
      }
    } else {
      toast.error('카카오 회원가입 실패');
    }
    throw error;
  }
}

// 카카오 간편 로그인 api
export async function kakaoSignIn(code: string) {
  if (!code) {
    console.error('인가 코드가 없습니다.');
    return;
  }
  try {
    const response = await instance.post('/oauth/sign-in/kakao', {
      redirectUri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_SIGNIN_URI,
      token: code,
    });
    console.log('카카오 로그인 성공:', response.data);
    Cookies.set('accessToken', response.data.accessToken);
    Cookies.set('refreshToken', response.data.refreshToken);
    return response.data;
  } catch (error: any) {
    console.error('카카오 로그인 실패:', error);
    if (error.response && error.response.data) {
      console.error('카카오 로그인 실패 상세:', error.response.data);
    } else {
      toast.error('카카오 로그인 실패');
    }
    throw error;
  }
}
