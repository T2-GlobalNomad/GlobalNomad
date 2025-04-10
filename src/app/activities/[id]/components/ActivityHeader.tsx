import KebabDropdown from '@/app/myactivities/components/kebabdropdown';
import styles from './activityHeader.module.css';
import Image from 'next/image';
import { useAuthStore } from '@/stores/useAuthStore';
import { Activities } from '@/lib/types';

export interface Activityprops {
  activityData: Activities;
}

export default function ActivityHeader({ activityData }: Activityprops) {
  const { user } = useAuthStore();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerCategory}>{activityData.category}</p>
        <h1 className={styles.headerTitle}>{activityData.title}</h1>
        <div className={styles.headerInfo}>
          <div className={styles.headerInfoDiv}>
            <div className={styles.headerStar}>
              <Image
                src='/images/icon_star.svg'
                alt='star'
                width={14}
                height={15}
              />
            </div>
            <p className={styles.headerRating}>
              {activityData.rating?.toFixed(1)} ({activityData.reviewCount})
            </p>
          </div>
          <div className={styles.headerInfoDiv}>
            <div className={styles.headerLocation}>
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
      {user?.id === activityData.userId && (
        <KebabDropdown activityId={activityData.id ?? 0} />
      )}
    </div>
  );
}
