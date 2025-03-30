import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api';

interface NewProfileImageResponse {
  profileImageUrl: string;
}

const uploadProfileImage = async (
  formData: FormData,
): Promise<NewProfileImageResponse> => {
  try {
    const response = await instance.post('/users/me/image', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('이미지 업로드 실패:', error);
    throw new Error('이미지 업로드에 실패했습니다.');
  }
};

const useUpdateProfileImage = () => {
  return useMutation({
    mutationFn: uploadProfileImage,
  });
};

export default useUpdateProfileImage;
