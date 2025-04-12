'use client';

import { useParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getActivity } from '@/api/activities';
import { Activities } from '@/lib/types';
import ActivityBody from './components/ActivityBody';
import ActivityHeader from './components/ActivityHeader';
import styles from './index.module.css';

export default function ActivitiesById() {
  const { id } = useParams<{ id: string }>();
  const { data: activity } = useQuery<Activities>({
    queryKey: ['activity'],
    queryFn: () => getActivity(id),
  });

  console.log(activity);

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
