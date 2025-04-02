import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api';
import { User } from '@/lib/types';

const updateUser = async (formData: FormData): Promise<User> => {
  try {
    const response = await instance.patch('/users/me', formData);
    return response.data;
  } catch (error) {
    console.error('유저 정보 업데이트 실패: ', error);
    throw new Error('유저 정보 업데이트에 실패했습니다.');
  }
};

const useUpdateUser = () => {
  return useMutation({
    mutationFn: updateUser,
  });
};

export default useUpdateUser;
