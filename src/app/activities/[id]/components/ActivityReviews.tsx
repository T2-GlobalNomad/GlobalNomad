'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './activityReviews.module.css';
import Image from 'next/image';
import Pagination from '@/app/landingComponents/Pagination';
import useActivityReviews from '@/hooks/query/useActivityReviews';

export default function ActivityReviews() {
  const [page, setPage] = useState(1);

  const { id } = useParams<{ id: string }>();
  const { data: reviewsData, isLoading, error } = useActivityReviews(id);

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  if (isLoading) {
    return <div>리뷰 로딩 중...</div>;
  }

  if (error) {
    return <div>리뷰를 불러오는 데 실패했습니다.</div>;
  }

  return (
    <>
      <p className={styles.reviewText}>후기</p>
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
      {reviewsData?.totalCount ? (
        <>
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
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(reviewsData?.totalCount / 3)}
            setPage={handlePageChange}
          />
        </>
      ) : (
        <div>리뷰없음</div>
      )}
    </>
  );
}
