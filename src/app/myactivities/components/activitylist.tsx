'use client';

import useMyActivities from '@/hooks/query/useMyActivities';
import ActivityListCard from './activitylistcard';
import styles from './activitylistcard.module.css';
import { useScrollDetector } from '@/utils/useScrollDetector';
import { RefObject } from 'react';
import { useScrollPositioning } from '@/utils/useScrollPositioning';
import Empty from '@/components/empty/Empty';

export default function ActivityList({ status }: { status: string }) {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage, // ✅ 오타 수정
  } = useMyActivities(status); // ✅ status 제거

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

  if (isLoading)
    return <p className='text-center'>⏳ 활동 목록을 불러오는 중...</p>;

  if (isError)
    return (
      <p className='text-center text-red-500'>
        ❌ 데이터를 불러오지 못했습니다.
      </p>
    );

  if (!activityData || activityData.length === 0) {
    return <Empty />;
  }
  
  console.log('🧩 리스트에 들어온 활동들:', activityData);
  return (
    
    <div
      className={styles.listcardcontainer}
      ref={listRef} // ✅ 이 줄 꼭 추가해야 스크롤 감지됨
    >
      
      {activityData.map((activity) => (
        <ActivityListCard key={activity.id} activities={activity} />
      ))}
    </div>
  );
}
