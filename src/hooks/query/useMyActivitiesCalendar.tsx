'use client';

import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Activities } from '@/lib/types';

// API 요청
const fetchMyActivities = async (): Promise<Activities[]> => {
  try {
    const response = await instance.get('/my-activities');
    //console.log('API 응답 데이터:', response.data);
    return response.data.activities;
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

// React Query 훅
const useMyActivitiesCalendar = () => {
  return useQuery<Activities[]>({
    queryKey: ['myActivities'],
    queryFn: fetchMyActivities,
  });
};

export default useMyActivitiesCalendar;
