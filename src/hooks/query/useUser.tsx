import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/api';
import Cookies from 'js-cookie';
import { User } from '@/lib/types';

// API 요청 함수
const fetchUser = async (): Promise<User> => {
  try {
    const response = await instance.get('/users/me');
    //console.log('API 응답 데이터:', response.data); // 응답 데이터 확인
    return response.data;
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

// React Query 훅
const useUser = () => {
  const token =
    typeof window !== 'undefined' ? Cookies.get('accessToken') : null;
  return useQuery<User>({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: !!token,
  });
};

export default useUser;
