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
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    console.error('회원가입 오류:', error);
  }
}
