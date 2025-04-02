
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/api';

// 수정정 요청 함수
const editMyActivity = async (activityId: number) => {
  try {
    const response = await instance.patch(`/my-activities/${activityId}`);
    return response.data.activities;
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

// React Query useMutation 훅
const useDeleteMyActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMyActivity,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    },
  });
};

export default useDeleteMyActivity;
