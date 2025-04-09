'use client';

import Image from 'next/image';
import { Activities } from '@/lib/types';
import KebabDropdown from './kebabdropdown';
import styles from './activitylistcard.module.css';



type ActivityListCardProps = {
  activities: Activities;
};

export default function ActivityListCard({
  activities,
}: ActivityListCardProps) {





  console.log('🖼️ 카드 이미지 URL:', `${activities.bannerImageUrl}?v=${activities.updatedAt}`);
  return (
    <div className={styles.container}>
      {/* 이미지 */}
      <div className={styles.bannerImg}>

        <Image
          key={`${activities.updatedAt}`}
          src={`${activities.bannerImageUrl}?v=${activities.updatedAt}`}
          alt={activities.title!}
          width={204}
          height={204}
          className={styles.bannerImg}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/images/no_thumbnail.png';
          }}
        />

      </div>

      {/* 정보 */}
      <div className={styles.info}>
        <div className={styles.upperInfo}>
          <div className={styles.reviews}>
            <Image
              width={19}
              height={19}
              src='/images/Star.png'
              alt='review-star'
            />
            <p className={styles.rating}>{activities.rating}</p>
            <p className={styles.reviewCount}>({activities.reviewCount})</p>
          </div>
          <h3 className={styles.title}>{activities.title}</h3>
        </div>
        <div className={styles.bottomInfo}>

          <p className={styles.price}>
            ₩{new Intl.NumberFormat('ko-KR').format(activities.price!)} / 인
          </p>
          <KebabDropdown activityId={activities.id!} />

        </div>
      </div>
    </div>
  );
}
