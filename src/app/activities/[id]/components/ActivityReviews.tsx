'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from '@tanstack/react-query';
import { getActivityReviews } from '@/api/activities';
import styles from './activityReviews.module.css';
import Image from 'next/image';

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

export default function ActivityReviews() {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { id } = useParams<{ id: string }>();
  const {
    data: reviewsData,
    isPending,
    isPlaceholderData,
  } = useQuery<ActivityReviews>({
    queryKey: ['activityReviews', id, page],
    queryFn: () => getActivityReviews({ activityId: id, page: page, size: 3 }),
    placeholderData: keepPreviousData,
  });

  return (
    <>
      <p className={styles.reviewText}>후기</p>
      {reviewsData ? (
        <>
          <div className={styles.reviewTitleContainer}>
            <p className={styles.averageRating}>
              {reviewsData?.averageRating.toFixed(1)}
            </p>
            <div className={styles.totalReviewContainer}>
              <p>만족도</p>
              <div>
                <div className={styles.ReviewsInfoDiv}>
                  <div className={styles.ReviewsStar}>
                    <Image
                      src='/images/icon_star.svg'
                      alt='star'
                      width={14}
                      height={15}
                    />
                  </div>
                  <p className={styles.ReviewsCount}>
                    {reviewsData?.totalCount.toLocaleString()}개 후기
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.reviewCardContainer}>
            {reviewsData?.reviews.map((review) => (
              <div key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewUserProfile}>
                  <Image
                    src={
                      review.user.profileImageUrl || '/images/no_profileImg.svg'
                    }
                    fill
                    alt='프로필 이미지'
                    className={styles.noProfileImg}
                  />
                </div>
                <div>
                  <div className={styles.reviewInfo}>
                    <p className={styles.reviewUserNickname}>
                      {review.user.nickname} |&nbsp;
                    </p>
                    <p className={styles.reviewUpdatedAt}>
                      {new Date(review.updatedAt)
                        .toLocaleDateString()
                        .replace(/\.$/, '')}
                    </p>
                  </div>
                  <p className={styles.reviewContent}>{review.content}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>리뷰없음</div>
      )}
    </>
  );
}
