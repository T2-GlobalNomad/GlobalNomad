
'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Activities } from '@/lib/types';

interface ScheduleToAdd {
  date: string;
  startTime: string;
  endTime: string;
}

interface EditActivityPayload {
  title: string;
  category: string;
  description: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  subImageUrlsToAdd: string[];
  subImageIdsToRemove: number[];
  scheduleIdsToRemove: number[];
  schedulesToAdd: ScheduleToAdd[];
}

// 수정 요청 함수
const editMyActivity = async ({activityId, payload} : {
    activityId: number;
    payload: EditActivityPayload;
}) : Promise<Activities> => {
  try {
    const response = await instance.patch(`/my-activities/${activityId}`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

// React Query useMutation 훅
const useEditMyActivity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editMyActivity,
    onSuccess: (data: Activities) => {
      console.log('✅ 수정된 응답 데이터:', data); // ← 여기서 확인!
      queryClient.invalidateQueries({ queryKey: ['myActivities'], exact: false }); // 캐시 새로고침
    },
  });
};
export default useEditMyActivity;
