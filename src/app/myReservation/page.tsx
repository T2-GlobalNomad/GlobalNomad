'use client';

import Image from 'next/image';
import Empty from '@/components/empty/Empty';
import Footer from '@/components/footer/Footer';
import ReservationList from './components/ReservationList';
import useReservation from '@/hooks/useReservation';
import styles from './style.module.css';
import PageController from './components/PageController';
import { useStatusFilter } from '@/utils/useStatusFilter';
import { useScrollDetector } from '@/utils/useScrollDetector';
import { RefObject } from 'react';
import { useScrollPositioning } from '@/utils/useScrollPositioning';

export default function MyReservation() {
  const { value, setValue, status, options } = useStatusFilter();

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useReservation(status);

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
  } = useScrollPositioning(data, status);

  useScrollDetector(() => {
    if (hasNextPage && !isFetchingNextPage) {
      prevScrollHeightRef.current = listRef.current?.scrollHeight || 0;
      prevScrollTopRef.current = window.scrollY;
      fetchNextPage();
    }
  });

  return (
    <>
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
      <Footer />
    </>
  );
}
