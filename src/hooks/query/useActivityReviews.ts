import { useQuery, keepPreviousData } from '@tanstack/react-query';
import instance from '@/lib/api';
import usePaginationStore from '@/stores/usePaginationStore';

interface GetActivityReviewsProps {
  activityId: string;
  page: number;
  size: number;
}

interface ReviewUserData {
  profileImageUrl: string;
  nickname: string;
  id: number;
}

interface ReviewData {
  id: number;
  user: ReviewUserData;
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityReviews {
  averageRating: number;
  totalCount: number;
  reviews: ReviewData[];
}

const fetchActivityReviews = async ({
  activityId,
  page,
  size = 3,
}: GetActivityReviewsProps) => {
  try {
    const response = await instance.get(
      `/activities/${activityId}/reviews?page=${page}&size=${size}`,
    ); // 페이지 번호
    return response.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw new Error('데이터를 불러오는 데 실패했습니다.');
  }
};

// React Query 훅
const useActivityReviews = (id: string) => {
  const { currentPage } = usePaginationStore();

  return useQuery<ActivityReviews>({
    queryKey: ['activityReviews', id, currentPage],
    queryFn: () =>
      fetchActivityReviews({ activityId: id, page: currentPage, size: 3 }),
    placeholderData: keepPreviousData,
  });
};

export default useActivityReviews;
