'use client';

import { useParams } from 'next/navigation';
import ActivityBody from './components/ActivityBody';
import ActivityHeader from './components/ActivityHeader';
import styles from './index.module.css';
import useActivity from '@/hooks/query/useActivity';

export default function ActivitiesById() {
  const { id } = useParams<{ id: string }>();
  const { data: activity, isLoading, error } = useActivity(id);

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생!</div>;

  return (
    <>
      {activity && (
        <div className={styles.container}>
          <ActivityHeader activityData={activity} />
          <ActivityBody activityData={activity} />
        </div>
      )}
    </>
  );
}
