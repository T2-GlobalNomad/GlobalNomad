import { useInfiniteQuery } from '@tanstack/react-query';
import instance from '@/lib/api';
import { Reservation } from '@/lib/types';

const fetchReservation = async ({
  pageParam = 1,
  status,
}: {
  pageParam?: number;
  status: string;
}): Promise<{ reservations: Reservation[]; nextPage?: number }> => {
  try {
    const requestURL =
      pageParam === 1
        ? `/my-reservations?${status ? `status=${status}&` : ''}size=6`
        : `/my-reservations?${
            status ? `status=${status}&` : ''
          }cursorId=${pageParam}&size=6`;

    const response = await instance.get(requestURL);

    return {
      reservations: response.data.reservations,
      nextPage: response.data.cursorId,
    };
  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

const useReservation = (status: string) => {
  return useInfiniteQuery({
    queryKey: ['reservation', status],
    queryFn: ({ pageParam = 1 }) => fetchReservation({ pageParam, status }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage ?? undefined;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export default useReservation;
