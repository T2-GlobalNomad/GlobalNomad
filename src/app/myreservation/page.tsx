'use client';

import Image from 'next/image';
import Empty from '@/components/empty/Empty';
import ReservationList from './components/ReservationList';
import useReservation from '@/hooks/query/useReservation';
import styles from './style.module.css';
import PageController from './components/PageController';
import { useStatusFilter } from '@/utils/useStatusFilter';
import { useScrollDetector } from '@/utils/useScrollDetector';
import { RefObject, useEffect } from 'react';
import { useScrollPositioning } from '@/utils/useScrollPositioning';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { useQueryClient } from '@tanstack/react-query';

export default function MyReservation() {
  const { value, setValue, status, options } = useStatusFilter();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReservation(status);

  const queryClient = useQueryClient();

  const reservationsData =
    data?.pages.flatMap((page) => page.reservations) ?? [];

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

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['reservation', status] });
    };
  }, [queryClient, status]);

  return (
    <div className={styles.wrapper}>
      <ProfileCard activeTab={'myreservation'} />
      <div ref={listRef} className={styles.pageContainer}>
        <PageController
          reservationsData={reservationsData}
          status={status}
          value={value}
          setValue={setValue}
          options={options}
        />

        {isLoading ? (
          <div className={styles.loading}>
            <Image src='/images/spinner.svg' alt='Loading' fill />
          </div>
        ) : (
          <>
            {reservationsData.length > 0 ? (
              <>
                <ReservationList reservationsData={reservationsData} />

                {isFetchingNextPage && (
                  <div className={styles.loading}>
                    <Image src='/images/spinner.svg' alt='Loading' fill />
                  </div>
                )}
              </>
            ) : (
              <Empty />
            )}
          </>
        )}
      </div>
    </div>
  );
}
