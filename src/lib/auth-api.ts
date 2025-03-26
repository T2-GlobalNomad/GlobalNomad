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
    toast.success('회원가입 성공!');
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
