'use client';

import styles from '../myactivities.module.css';
import CustomButton from '@/components/CustomButton';
import ActivityList from './activitylist';

export default function MyActivityContainer() {
  const status = 'ALL'; // 또는 'APPROVED', 'PENDING' 등등 원하는 값

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p>내 체험 관리</p>
        <CustomButton
          href='/postMyActivity'
          fontSize='md'
          className={`customButton-black ${styles.custombutton}`}
        >
          체험 등록하기
        </CustomButton>
      </div>

      <div>
        <ActivityList status={status} />
      </div>
    </div>
  );
}
