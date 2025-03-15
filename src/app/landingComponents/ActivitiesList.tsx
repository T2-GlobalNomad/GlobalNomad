'use client';

import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import styles from './ActivitiesList.module.css';
import { ActivitiesArray } from '@/lib/types';

interface ActivitiesListProps {
  activities: ActivitiesArray;
  isLoading: boolean;
  error: string | null;
}

export default function ActivitiesList({
  activities,
  isLoading,
  error,
}: ActivitiesListProps) {
  return (
    <div className={styles.activitiesContainer}>
      {isLoading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}

      <ul className={styles.activitiesList}>
        {!isLoading &&
          !error &&
          activities.map((activity) => (
            <li key={activity.id} className={styles.activityItem}>
              <div className={styles.activityImage}>
                <Image
                  src={activity?.bannerImageUrl || '/images/not_found.png'}
                  alt={activity.title || '체험 이미지 입니다.'}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className={styles.activitiesRating}>
                <FaStar color='var(--yellow)' size={16} />
                <p>
                  {activity.rating}
                  <span> ({activity.reviewCount})</span>
                </p>
              </div>
              <h1>{activity.title}</h1>
              <p className={styles.price}>
                ₩ {activity.price} <span>/ 인</span>
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
}
