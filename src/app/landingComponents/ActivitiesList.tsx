'use client';

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import styles from './ActivitiesList.module.css';
import { ActivitiesArray } from '@/lib/types';
import Link from 'next/link';

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
  const [imageSrcMap, setImageSrcMap] = useState<Record<string, string>>({});

  const handleImageError = (id: number) => {
    setImageSrcMap((prev) => ({
      ...prev,
      [id]: '/images/no_thumbnail.png',
    }));
  };

  return (
    <div className={styles.activitiesContainer}>
      {isLoading && <p>로딩 중...</p>}
      {error && <p>{error}</p>}

      <ul className={styles.activitiesList}>
        {!isLoading &&
          !error &&
          activities.map((activity) => (
            <li key={activity.id} className={styles.activityItem}>
              <Link href={`/activities/${activity.id}`} className={styles.link}>
                {/* 체험 이미지 */}
                <div className={styles.activityImage}>
                  <Image
                    src={
                      imageSrcMap[activity.id] ||
                      activity?.bannerImageUrl ||
                      '/images/no_thumbnail.png'
                    }
                    alt={activity.title || '체험 이미지 입니다.'}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    onError={() => handleImageError(activity.id)}
                  />
                </div>
                {/* 평점 */}
                <div className={styles.activitiesRating}>
                  <FaStar color='var(--yellow)' size={16} />
                  <p>
                    {activity.rating ?? '0.0'}
                    <span> ({activity.reviewCount ?? 0})</span>
                  </p>
                </div>
                {/* 제목 및 가격 */}
                <h1>{activity.title}</h1>
                <p className={styles.price}>
                  ₩ {activity.price?.toLocaleString() ?? '0'} <span>/ 인</span>
                </p>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
