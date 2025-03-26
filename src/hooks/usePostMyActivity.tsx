'use client';

import { useMutation } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Activities } from '@/lib/types';

interface Schedule {
  date: string;
  startTime: string;
  endTime: string;
}

interface ActivityPayload {
  title: string;
  category: string;
  description: string;
  address: string;
  price: number;
  schedules: Schedule[];
  date: string;
  startTime: string;
  endTime: string;
  bannerImageUrl: string;
  subImageUrls: string[];
}

// API 요청
const postMyActivity = async (payload: ActivityPayload): Promise<Activities[]> => {
  try {
    const response = await instance.post('/activities', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log('API 응답 데이터:', response.data);
    return response.data;
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 전송하는 데 실패했습니다.');
  }
};

// React Query 훅
const usePostMyActivities = () => {
  return useMutation({
    mutationFn: postMyActivity,
  });
};

export default usePostMyActivities;