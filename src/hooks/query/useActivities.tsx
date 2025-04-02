import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Activities } from '@/lib/types';
import usePaginationStore from '@/stores/usePaginationStore'; // 페이지네이션 상태 추가

// API 요청 - 페이지네이션
const fetchActivities = async (page: number): Promise<Activities[]> => {
  try {
    const response = await instance.get(`/activities?page=${page}`); // 페이지 번호
    return response.data.activities;
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

// React Query 훅
const useActivities = () => {
  const { currentPage } = usePaginationStore(); // 현재 페이지 상태 가져오기

  return useQuery<Activities[]>({
    queryKey: ['activities', currentPage], // 페이지 번호를 queryKey에 포함
    queryFn: () => fetchActivities(currentPage), // 페이지 번호를 인자로 전달
  });
};

export default useActivities;
