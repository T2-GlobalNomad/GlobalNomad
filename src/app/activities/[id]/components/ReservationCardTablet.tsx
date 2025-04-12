'use client';

import styles from './reservationCard.module.css';
import { Schedules } from '@/lib/types';
import CustomButton from '@/components/CustomButton';
import BookingCalendar from './BookingCalendar';
import { CalendarTabletModal } from './CalendarModal';
import { formatDate } from '@/app/utils/dateFormatter';
import HeadCount from './HeadCount';
import { ReservationState, ReservationHandlers } from '@/lib/types';

interface ReservationCardInfoProps {
  price: number;
  schedules: Schedules[];
  state: ReservationState;
  handlers: ReservationHandlers;
}

export default function ReservationCardTablet({
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
      <button
        className={styles.dateButton}
        onClick={() => handlers.setIsModalOpen(true)}
      >
        {state.selectedSchedule
          ? `${formatDate(state.selectedSchedule.date)} ${
              state.selectedSchedule.startTime
            }~${state.selectedSchedule.endTime}`
          : '날짜 선택하기'}
      </button>
      <CalendarTabletModal
        isOpen={state.isModalOpen}
        setIsOpen={handlers.setIsModalOpen}
      >
        <BookingCalendar
          schedules={schedules}
          selectedScheduleId={state.selectedScheduleId}
          setSelectedScheduleId={handlers.setSelectedScheduleId}
        />
        <CustomButton
          type='submit'
          className={styles.reservationButton}
          fontSize='md'
          disabled={!state.selectedScheduleId}
          onClick={() => handlers.setIsModalOpen(false)}
        >
          예약하기
        </CustomButton>
      </CalendarTabletModal>
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
