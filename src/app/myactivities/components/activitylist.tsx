'use client';

import useMyActivities from '@/hooks/useMyActivities';
import ActivityListCard from './activitylistcard';
import styles from './activitylistcard.module.css';
export default function ActivityList() {
  const { data: activities, isLoading, isError } = useMyActivities();

  if (isLoading)
    return <p className='text-center'>⏳ 활동 목록을 불러오는 중...</p>;
  if (isError)
    return (
      <p className='text-center text-red-500'>
        ❌ 데이터를 불러오지 못했습니다.
      </p>
    );

  return (
    <div className={styles.listcardcontainer}>
      {activities?.map((activity) => (
        <ActivityListCard key={activity.id} activities={activity} />
      ))}
    </div>
  );
}
