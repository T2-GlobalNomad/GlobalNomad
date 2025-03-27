'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivitiesArray } from '@/lib/types';
import styles from './PopularActivities.module.css';
import Link from 'next/link';

interface Props {
  activities: ActivitiesArray;
}

export default function PopularActivities({ activities }: Props) {
  const [index, setIndex] = useState(0);
  const [itemsSize, setItemsSize] = useState(3);
  const [sortedActivities, setSortedActivities] = useState<ActivitiesArray>([]);
  const [imageSrcMap, setImageSrcMap] = useState<{ [key: number]: string }>({});

  // 화면 사이즈 별 데이터 업로드 갯수
  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth <= 450) {
        setItemsSize(1);
      } else if (window.innerWidth <= 768) {
        setItemsSize(2);
      } else {
        setItemsSize(3);
      }
    };

    updateSize(); // 초기 실행
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // 인기목록 자동 스크롤
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sortedActivities.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [sortedActivities.length]);

  // 인기 체험 목록 평점 내림차순 정렬
  useEffect(() => {
    const sorted = [...activities].sort((a, b) => {
      const ratingA = a.rating ?? 0;
      const ratingB = b.rating ?? 0;
      return ratingB - ratingA; // 평점 내림차순
    });
    setSortedActivities(sorted);
  }, [activities]);

  // 이미지 로드 실패 시 기본 이미지로 변경
  const handleImageError = (id: number) => {
    setImageSrcMap((prev) => ({
      ...prev,
      [id]: '/images/no_thumbnail.png',
    }));
  };

  // 다음으로 넘김
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % sortedActivities.length);
  };
  // 이전으로 돌아감
  const prevSlide = () => {
    setIndex(
      (prev) => (prev - 1 + sortedActivities.length) % sortedActivities.length,
    );
  };

  return (
    <div className={styles.container}>
      {/* 인기 체험 + 좌우 버튼 */}
      <div className={styles.header}>
        <h1>🔥 인기 체험</h1>
        <div className={styles.controls}>
          <button onClick={prevSlide} className={styles.prevButton}>
            <ChevronLeft size={24} />
          </button>
          <button onClick={nextSlide} className={styles.nextButton}>
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* 인기 체험 목록 */}
      <div className={styles.carousel}>
        {sortedActivities
          .slice(index, index + itemsSize)
          .concat(
            index + itemsSize > sortedActivities.length
              ? sortedActivities.slice(
                  0,
                  (index + itemsSize) % sortedActivities.length,
                )
              : [],
          )
          .map((activity) => (
            <div key={activity.id} className={styles.card}>
              <Link href={`/activities/${activity.id}`}>
                <div className={styles.activityImage}>
                  <Image
                    src={
                      imageSrcMap[activity.id] ||
                      activity.bannerImageUrl ||
                      '/images/no_thumbnail.png'
                    }
                    alt={activity.title || '체험 이미지 입니다.'}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    onError={() => handleImageError(activity.id)}
                  />
                </div>
                <div className={styles.info}>
                  {/* 평점 */}
                  <div className={styles.activitiesRating}>
                    <FaStar color='var(--yellow)' size={14} />
                    <p>
                      {activity.rating ?? 0} {/* 기본값 0 */}
                      <span> ({activity.reviewCount})</span>
                    </p>
                  </div>

                  <h3>{activity.title}</h3>
                  <p className={styles.price}>
                    ₩ {activity.price?.toLocaleString()} <span>/ 인</span>
                  </p>
                </div>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
