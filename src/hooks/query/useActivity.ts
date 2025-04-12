import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Activities } from '@/lib/types';

const fetchActivity = async (activitiyId: string): Promise<Activities> => {
  try {
    const response = await instance.get(`/activities/${activitiyId}`);
    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

const useActivity = (id: string) => {
  return useQuery<Activities>({
    queryKey: ['activity', id],
    queryFn: () => fetchActivity(id),
    enabled: !!id,
  });
};

export default useActivity;
