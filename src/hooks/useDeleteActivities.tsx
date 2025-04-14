// hooks/useDeleteMyActivities.ts
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/api';

// 삭제 요청 함수
const deleteMyActivity = async (activityId: number) => {
  try {
    const response = await instance.delete(`/my-activities/${activityId}`);
    console.log('del Id', response.data.activities);
    return response.data.activities;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    const message =
      error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
    alert(message);
    throw new Error(message);
  }
};

// React Query useMutation 훅
const useDeleteMyActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteMyActivity,
    onSuccess: () => {
      // 삭제 성공 시, myActivities 쿼리 무효화 (자동 refetch)
      queryClient.invalidateQueries({ queryKey: ['myActivities'] });
    },
  });
};

export default useDeleteMyActivity;
