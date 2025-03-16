'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivitiesArray } from '@/lib/types';
import styles from './PopularActivities.module.css';

interface Props {
  activities: ActivitiesArray;
}

export default function PopularActivities({ activities }: Props) {
  const [index, setIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  // 화면 사이즈 별 데이터 업로드 갯수
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth <= 450) {
        setItemsPerPage(1);
      } else if (window.innerWidth <= 768) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    updateItemsPerPage(); // 초기 실행
    window.addEventListener('resize', updateItemsPerPage);
    return () => window.removeEventListener('resize', updateItemsPerPage);
  }, []);

  // 인기목록 자동 스크롤
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [activities.length]);

  // 다음으로 넘김
  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % activities.length);
  };

  // 이전으로 돌아감
  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + activities.length) % activities.length);
  };

  return (
    <div className={styles.container}>
      {/* 인기 체험 + 좌우 버튼 */}
      <div className={styles.header}>
        <h2 className={styles.title}>🔥 인기 체험</h2>
        <div className={styles.controls}>
          <button onClick={prevSlide} className={styles.prevButton}>
            <ChevronLeft size={28} />
          </button>
          <button onClick={nextSlide} className={styles.nextButton}>
            <ChevronRight size={28} />
          </button>
        </div>
      </div>

      {/* 인기 체험 목록 */}
      <div className={styles.carousel}>
        {activities
          .slice(index, index + itemsPerPage)
          .concat(
            index + itemsPerPage > activities.length
              ? activities.slice(0, (index + itemsPerPage) % activities.length)
              : [],
          )
          .map((activity) => (
            <div key={activity.id} className={styles.card}>
              <div className={styles.activityImage}>
                <Image
                  src={activity.bannerImageUrl || '/images/not_found.png'}
                  alt={activity.title || '체험 이미지 입니다.'}
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <div className={styles.info}>
                {/* 평점 */}
                <div className={styles.activitiesRating}>
                  <FaStar color='var(--yellow)' size={14} />
                  <p>
                    {activity.rating}
                    <span> ({activity.reviewCount})</span>
                  </p>
                </div>

                <h3>{activity.title}</h3>
                <p className={styles.price}>
                  ₩ {activity.price?.toLocaleString()} <span>/ 인</span>
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
