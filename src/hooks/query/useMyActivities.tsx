'use client';


import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Activities } from '@/lib/types';
import { string } from 'zod';

// API 요청
const fetchMyActivities = async ({
  pageParam = 1,
  status,
}:{
  pageParam?: number;
  status: string;
}
): Promise<{ activities: Activities[]; nextPage?: number }> => {
  try {
    const requestURL = 
      pageParam === 1
        ? `/my-activities?${status ? `status=${status}&` : ''}size=6`
        : `/my-activities?${
            status ? `status=${status}&` : ''
            }cursorId=${pageParam}&size=6` ;

    const response = await instance.get(requestURL);

    return{
        activities: response.data.activities,
        nextPage: response.data.cursorId,
    };
  } catch (error: unknown){
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는데 실패했습니다.');

  }
};

// React Query 훅

const useMyActivities = (status:string) => {
  return useInfiniteQuery({
    queryKey: ['myActivities', status],
    queryFn:({ pageParam = 1}) => fetchMyActivities({ pageParam, status}),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    staleTime: 1000 * 60* 5,

  });
};

export default useMyActivities;
