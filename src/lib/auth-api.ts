import { AxiosError } from 'axios';
import instance from './api';
import { toast } from 'react-hot-toast';

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
