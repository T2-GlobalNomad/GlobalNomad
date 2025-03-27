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

  console.log(id);
  console.log(activity);

  return (
    <>
      {activity && (
        <div className={styles.container}>
          <ActivityHeader
            title={activity.title || ''}
            category={activity.category || ''}
            rating={activity.rating || 0}
            address={activity.address || ''}
            reviewCount={activity.reviewCount || 0}
          />
          <ActivityBody activityData={activity || ''} />
        </div>
      )}
    </>
  );
}
