import Image from 'next/image';
import { useState } from 'react';
import styles from './activityBody.module.css';
import { Activities } from '@/lib/types';
import ActivityReviews from './ActivityReviews';
import ReservationCard from './ReservationCard';
import { useAuthStore } from '@/stores/useAuthStore';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import KakaoMap from './KakaoMap';
import { SliderNextArrow, SliderPrevArrow } from './SliderArrow';
import useDeviceType from '@/hooks/useDeviceType';

export interface Activityprops {
  activityData: Activities;
}

export default function ActivityBody({ activityData }: Activityprops) {
  const { user } = useAuthStore();
  const deviceType = useDeviceType();
  const [imageSrcMap, setImageSrcMap] = useState<Record<string, string>>({});

  const handleImageError = (key: string) => {
    setImageSrcMap((prev) => ({
      ...prev,
      [key]: '/images/no_thumbnail.png',
    }));
  };

  const imageCount = 1 + (activityData.subImages?.length ?? 0);

  const sliderSettings = {
    dots: true,
    infinite: imageCount > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <ul className={styles['slick-dots']}>{dots}</ul>
    ),
  };

  return (
    <div className={styles.container}>
      {deviceType === 'mobile' ? (
        <Slider {...sliderSettings} className={styles.customSlider}>
          <div className={styles.bannerImage}>
            <Image
              src={
                imageSrcMap['banner'] ||
                activityData.bannerImageUrl ||
                '/images/no_thumbnail.png'
              }
              alt='bannerimage'
              fill
              objectFit='cover'
              onError={() => handleImageError('banner')}
            />
          </div>
          {activityData.subImages?.map((subImage, index) => {
            const key = `sub-${index}`;
            return (
              <div
                className={styles.subImage}
                key={`${subImage.imageUrl}-${index}`}
              >
                <Image
                  src={
                    imageSrcMap[key] ||
                    subImage.imageUrl ||
                    '/images/no_thumbnail.png'
                  }
                  alt='subImage'
                  fill
                  objectFit='cover'
                  onError={() => handleImageError(key)}
                />
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className={styles.imageSection}>
          <div className={styles.bannerImage}>
            <Image
              src={
                imageSrcMap['banner'] ||
                activityData.bannerImageUrl ||
                '/images/no_thumbnail.png'
              }
              alt='bannerimage'
              fill
              objectFit='cover'
              onError={() => handleImageError('banner')}
            />
          </div>
          <div className={styles.subImageSection}>
            {activityData.subImages?.map((subImage, index) => (
              <div
                className={styles.subImage}
                key={`${subImage.imageUrl}-${index}`}
              >
                {activityData.subImages?.map((subImage, index) => {
                  const key = `sub-${index}`;
                  return (
                    <div
                      className={styles.subImage}
                      key={`${subImage.imageUrl}-${index}`}
                    >
                      <Image
                        src={
                          imageSrcMap[key] ||
                          subImage.imageUrl ||
                          '/images/no_thumbnail.png'
                        }
                        alt='subImage'
                        fill
                        objectFit='cover'
                        onError={() => handleImageError(key)}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className={styles.bodyContainer}>
        <div className={styles.bodyDetailContainer}>
          <div className={styles.bodyDetail}>
            <div className={styles.bodyActivityDetail}>
              <p className={styles.bodyActivitytext}>체험 설명</p>
              <p className={styles.bodyActivityDescription}>
                {activityData.description}
              </p>
            </div>
          </div>
          <div className={styles.bodyDetail}>
            <div></div>
            <div className={styles.addressSection}>
              <div className={styles.map}>
                <KakaoMap address={activityData.address || ''} />
              </div>
              <div className={styles.address}>
                <div className={styles.location}>
                  <Image
                    src='/images/icon_location.svg'
                    alt='location'
                    width={11}
                    height={16}
                  />
                </div>
                <p className={styles.headerAddress}>{activityData.address}</p>
              </div>
            </div>
          </div>
          <div className={styles.bodyDetail}>
            <ActivityReviews />
          </div>
        </div>
        {user?.id !== activityData.userId && (
          <div className={styles.reservationCard}>
            <ReservationCard
              price={activityData.price ?? 0}
              schedules={activityData.schedules ?? []}
              activityId={activityData.id ?? 0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
