import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
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
  const [itemsSize, setItemsSize] = useState(3);
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

  // 이미지 로드 실패 시 기본 이미지로 변경
  const handleImageError = (id: string) => {
    setImageSrcMap((prev) => ({
      ...prev,
      [id]: '/images/no_thumbnail.png',
    }));
  };

  // 슬라이드 이동 (1개씩)
  const nextSlide = useCallback(() => {
    setIndex((prev) => (prev + 1) % activities.length); // 하나씩 넘기고, 마지막을 넘기면 첫 번째로 돌아감
  }, [activities.length]);

  // 이전으로 돌아감
  const prevSlide = useCallback(() => {
    setIndex((prev) => (prev - 1 + activities.length) % activities.length); // 하나씩 넘기고, 첫 번째를 넘기면 마지막으로 돌아감
  }, [activities.length]);

  // 데이터 슬라이드 시 itemSize 갯수만큼 보여주기
  const getVisibleActivities = () => {
    const start = index;
    const end = start + itemsSize;

    // 활동들을 슬라이드에 맞게 자르고, 순위를 매김
    return activities
      .slice(start, end)
      .concat(activities.slice(0, Math.max(0, end - activities.length)));
  };

  // 자동 슬라이드
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval을 clear
  }, [activities, nextSlide]);

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
        {getVisibleActivities().map((activity) => {
          // 전체 리스트에서 순위를 매긴다
          const sortedActivities = [...activities].sort(
            (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
          );

          // 활동의 순위는 전체 정렬된 목록에서의 인덱스 + 1로 계산
          const order =
            sortedActivities.findIndex((act) => act.id === activity.id) + 1;

          return (
            <div key={activity.id} className={styles.card}>
              <Link href={`/activities/${activity.id}`}>
                <div className={styles.activityImage}>
                  <Image
                    src={
                      (activity.id && imageSrcMap[activity.id]) ||
                      activity.bannerImageUrl ||
                      '/images/no_thumbnail.png'
                    }
                    alt={activity.title || '체험 이미지 입니다.'}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    onError={() => handleImageError(String(activity.id))}
                  />
                </div>
                <div className={styles.info}>
                  {/* 평점 */}
                  <div className={styles.activitiesRating}>
                    <FaStar color='var(--yellow)' size={14} />
                    <p>
                      {activity.rating ?? 0}
                      <span> ({activity.reviewCount})</span>
                    </p>
                  </div>

                  <h3>{activity.title}</h3>
                  <div className={styles.infoPrice}>
                    <p className={styles.price}>
                      ₩ {activity.price?.toLocaleString()} <span>/ 인</span>
                    </p>
                    <p className={styles.rank}>
                      {order} / {activities.length}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
