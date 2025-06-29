'use client';

import useMyActivities from '@/hooks/query/useMyActivities';
import ActivityListCard from './activitylistcard';
import styles from './activitylistcard.module.css';
import { useScrollDetector } from '@/utils/useScrollDetector';
import { RefObject } from 'react';
import { useScrollPositioning } from '@/utils/useScrollPositioning';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import Empty from '@/components/empty/Empty';

export default function ActivityList({ status }: { status: string }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useMyActivities(status);

  const activityData = data?.pages.flatMap((page) => page.activities) ?? [];

  const {
    listRef,
    prevScrollHeightRef,
    prevScrollTopRef,
  }: {
    listRef: RefObject<HTMLDivElement | null>;
    prevScrollHeightRef: RefObject<number>;
    prevScrollTopRef: RefObject<number>;
  } = useScrollPositioning(data);

  useScrollDetector(() => {
    if (hasNextPage && !isFetchingNextPage) {
      prevScrollHeightRef.current = listRef.current?.scrollHeight || 0;
      prevScrollTopRef.current = window.scrollY;
      fetchNextPage();
    }
  });

  if (isError)
    return (
      <p className='text-center text-red-500'>데이터를 불러오지 못했습니다.</p>
    );

  if (!activityData || activityData.length === 0) {
    return <Empty />;
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.listcardcontainer} ref={listRef}>
          {activityData.map((activity) => (
            <ActivityListCard key={activity.id} activities={activity} />
          ))}
        </div>
      )}
    </>
  );
}
