import { AxiosError } from 'axios';
import instance from './api';

// 회원가입 api
interface NewUser {
  email: string;
  password: string;
  nickname: string;
}

export async function signUp(newUser: NewUser) {
  try {
    const response = await instance.post('/users', newUser);
    //추후삭제
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        console.error('회원가입 오류: 이메일이 중복되었습니다.');
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
