'use client';

import styles from './reservationCard.module.css';
import { Schedules } from '@/lib/types';
import CustomButton from '@/components/CustomButton';
import BookingCalendar from './BookingCalendar';
import HeadCount from './HeadCount';
import { ReservationState, ReservationHandlers } from '@/lib/types';

interface ReservationCardInfoProps {
  price: number;
  schedules: Schedules[];
  state: ReservationState;
  handlers: ReservationHandlers;
}

export default function ReservationCardDesk({
  price,
  schedules,
  state,
  handlers,
}: ReservationCardInfoProps) {
  return (
    <>
      <div className={styles.priceSection}>
        <p className={styles.price}>₩ {price.toLocaleString()}</p>
        <p className={styles.perPerson}>&nbsp;/ 인</p>
      </div>
      <p className={styles.dateLabel}>날짜</p>
      <BookingCalendar
        schedules={schedules}
        selectedScheduleId={state.selectedScheduleId}
        setSelectedScheduleId={handlers.setSelectedScheduleId}
      />
      <HeadCount
        headCount={state.headCount}
        MinusClick={handlers.handleMinusClick}
        PlusClick={handlers.handlePlusClick}
      />
      <CustomButton
        type='submit'
        className={styles.reservationButton}
        fontSize='md'
        disabled={!state.selectedScheduleId}
        onClick={handlers.handlePostReservation}
      >
        예약하기
      </CustomButton>
      <div className={styles.totalSection}>
        <p className={styles.totalAmount}>총 합계</p>
        <p className={styles.totalPrice}>
          ₩ {(price * state.headCount).toLocaleString()}
        </p>
      </div>
    </>
  );
}
