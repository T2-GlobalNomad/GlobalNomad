import Image from 'next/image';
import styles from './activityBody.module.css';
import { Activities } from '@/lib/types';
import ActivityReviews from './ActivityReviews';
import ReservationCard from './ReservationCard';

interface ActivityBodyProps {
  activityData: Activities;
}

export default function ActivityBody({ activityData }: ActivityBodyProps) {
  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.bannerImage}>
          <Image
            src={activityData.bannerImageUrl || ''}
            alt='bannerimage'
            fill
            objectFit='cover'
          />
        </div>
        <div className={styles.subImageSection}>
          <div className={styles.subImage}>
            <Image
              src={activityData.subImages?.[0].imageUrl || ''}
              alt='location'
              fill
              objectFit='cover'
            />
          </div>
          <div className={styles.subImage}>
            <Image
              src={activityData.bannerImageUrl || ''}
              alt='location'
              fill
              objectFit='cover'
            />
          </div>
          <div className={styles.subImage}>
            <Image
              src={activityData.bannerImageUrl || ''}
              alt='location'
              fill
              objectFit='cover'
            />
          </div>
          <div className={styles.subImage}>
            <Image
              src={activityData.bannerImageUrl || ''}
              alt='location'
              fill
              objectFit='cover'
            />
          </div>
        </div>
      </div>
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
              <div className={styles.map}>1</div>
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
        <div className={styles.reservationCard}>
          <ReservationCard
            price={activityData.price || 0}
            schedules={activityData.schedules || []}
            activityId={activityData.id}
          />
        </div>
      </div>
    </div>
  );
}
