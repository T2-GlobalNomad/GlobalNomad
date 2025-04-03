import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ActivitiesArray } from '@/lib/types';
import styles from './PopularActivities.module.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface Props {
  activities: ActivitiesArray;
}

export default function PopularActivities({ activities }: Props) {
  const sliderRef = useRef<Slider | null>(null);
  const [imageSrcMap, setImageSrcMap] = useState<{ [key: number]: string }>({});

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 450,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  // 이미지 로드 실패 시 기본 이미지로 변경
  const handleImageError = (id: string) => {
    setImageSrcMap((prev) => ({
      ...prev,
      [id]: '/images/no_thumbnail.png',
    }));
  };

  return (
    <div className={styles.container}>
      {/* 인기 체험 + 좌우 버튼 */}
      <div className={styles.header}>
        <h1>🔥 인기 체험</h1>
        <div className={styles.controls}>
          <button
            onClick={() => sliderRef.current?.slickPrev()}
            className={styles.prevButton}
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className={styles.nextButton}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* 인기 체험 목록 */}
      <Slider ref={sliderRef} {...settings} className={styles.carousel}>
        {activities.map((activity) => {
          const sortedActivities = [...activities].sort(
            (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
          );
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
                    alt={activity.title || '체험 이미지'}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                    onError={() => handleImageError(String(activity.id))}
                  />
                </div>
                <div className={styles.info}>
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
      </Slider>
    </div>
  );
}
