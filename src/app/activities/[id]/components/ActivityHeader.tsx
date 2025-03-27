import KebabDropdown from '@/app/myactivities/components/kebabdropdown';
import styles from './activityHeader.module.css';
import Image from 'next/image';

interface ActivityHeaderProps {
  title: string;
  category: string;
  rating: number;
  address: string;
  reviewCount: number;
}

export default function ActivityHeader({
  title,
  category,
  rating,
  address,
  reviewCount,
}: ActivityHeaderProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p className={styles.headerCategory}>{category}</p>
        <h1 className={styles.headerTitle}>{title}</h1>
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
              {rating.toFixed(1)} ({reviewCount})
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
            <p className={styles.headerAddress}>{address}</p>
          </div>
        </div>
      </div>
      <KebabDropdown />
    </div>
  );
}
