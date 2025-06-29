'use client';

import CustomButton from '@/components/CustomButton';
import styles from './reservationCard.module.css';
import { Schedules } from '@/lib/types';
import { ReservationState, ReservationHandlers } from '@/lib/types';
import { CalendarMobileModal } from './CalendarModal';
import HeadCount from './HeadCount';
import BookingCalendar from './BookingCalendar';

interface ReservationCardInfoProps {
  price: number;
  schedules: Schedules[];
  state: ReservationState;
  handlers: ReservationHandlers;
}

export default function ReservationCardMobile({
  price,
  schedules,
  state,
  handlers,
}: ReservationCardInfoProps) {
  return (
    <>
      <div className={styles.reservationContainer}>
        <div>
          <div className={styles.totalSection}>
            <div className={styles.totalPrice}>
              ₩ {(price * state.headCount).toLocaleString()} /
            </div>
            <p className={styles.perPerson}>&nbsp;{state.headCount}명</p>
          </div>
          <button
            className={styles.dateButton}
            onClick={() => handlers.setIsModalOpen(true)}
          >
            날짜 선택하기
          </button>
        </div>
        <CustomButton
          type='submit'
          className={styles.reservationButton}
          fontSize='md'
          disabled={!state.selectedScheduleId}
          onClick={handlers.handlePostReservation}
        >
          예약하기
        </CustomButton>
        <CalendarMobileModal
          isOpen={state.isModalOpen}
          setIsOpen={handlers.setIsModalOpen}
        >
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
            className={styles.OKButton}
            fontSize='md'
            disabled={!state.selectedScheduleId}
            onClick={() => handlers.setIsModalOpen(false)}
          >
            확인
          </CustomButton>
        </CalendarMobileModal>
      </div>
    </>
  );
}
