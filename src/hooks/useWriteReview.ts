import instance from '@/lib/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SetStateAction } from 'react';

interface Props {
  id?: number;
  rating: number;
  isValue: string;
}

const fetchWriteReview = async ({ id, rating, isValue }: Props) => {
  if (!id) throw new Error('유효한 예약 ID가 없습니다.');

  try {
    await instance.post(`/my-reservations/${id}/reviews`, {
      rating,
      content: isValue,
    });
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 전송하는 데 실패했습니다.');
  }
};

const useWriteReview = (
  setShowToast: (value: SetStateAction<boolean>) => void,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { id?: number; rating: number; isValue: string }
  >({
    mutationFn: ({ id, rating, isValue }) =>
      fetchWriteReview({ id, rating, isValue }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservation'] });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    },
    onError: (error) => {
      console.error('전송 중 오류 발생', error);
    },
  });
};

export default useWriteReview;
