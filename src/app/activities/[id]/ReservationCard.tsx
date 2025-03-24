'use client';

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './reservationCard.module.css';
import { Schedules } from '@/lib/types';
import CustomButton from '@/components/CustomButton';

interface ReservationCardProps {
  price: number;
  schedules: Schedules[];
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ReservationCard({
  price,
  schedules,
}: ReservationCardProps) {
  const [headCount, setHeadCound] = useState<number>(1);
  const [date, setDate] = useState<Value>(new Date(schedules[0].date));
  const [selectedSchedules, setSelectedSchedules] = useState<Schedules[]>(
    schedules.filter(
      (schedule) =>
        new Date(schedule.date).toDateString() ===
        new Date(schedules[0].date).toDateString(),
    ),
  );

  const handleDateChange = (selectedDate: Value) => {
    setDate(selectedDate);

    const matchingSchedules = schedules.filter(
      (schedule) =>
        new Date(schedule.date).toDateString() ===
        new Date(selectedDate as Date).toDateString(),
    );

    setSelectedSchedules(matchingSchedules);
  };

  const handleMinusClick = () => {
    if (headCount === 1) return;
    setHeadCound((prev) => prev - 1);
  };

  const handlePlusClick = () => {
    setHeadCound((prev) => prev + 1);
  };

  return (
    <>
      <div className={styles.priceSection}>
        <p className={styles.price}>₩ {price.toLocaleString()}</p>
        <p className={styles.perPerson}>&nbsp;/ 인</p>
      </div>
      <div className={styles.infoSection}>
        <p className={styles.dateLabel}>날짜</p>
        <Calendar
          onChange={handleDateChange}
          value={date}
          locale='en-US'
          className={`${styles.calendar} react-calendar`}
          prevLabel={
            <Image src='/images/prev.svg' alt='prev' width={16} height={16} />
          }
          nextLabel={
            <Image src='/images/next.svg' alt='next' width={16} height={16} />
          }
          next2Label={null}
          prev2Label={null}
          tileDisabled={({ date }) => {
            const isDisabled = !schedules.some(
              (schedule) =>
                new Date(schedule.date).toDateString() === date.toDateString(),
            );
            return isDisabled;
          }}
        />
        <div>
          <p className={styles.availableTimes}>예약 가능한 시간</p>
          {selectedSchedules.length > 0 ? (
            <>
              {selectedSchedules.map((schedule) => (
                <CustomButton
                  key={schedule.id}
                  className={styles.timeButton}
                  fontSize='md'
                  variant='white'
                  style={{ fontWeight: 500 }}
                >
                  {schedule.startTime} ~ {schedule.endTime}
                </CustomButton>
              ))}
            </>
          ) : (
            <p>해당 날짜에 예약 가능한 시간이 없습니다.</p>
          )}
        </div>
      </div>
      <p className={styles.availableTimes}>참여 인원 수</p>
      <div className={styles.headCountButton}>
        <button
          type='button'
          className={styles.headButton}
          onClick={handleMinusClick}
        >
          <Image src='/images/minus.svg' alt='minus' width={13} height={13} />
        </button>
        <div>{headCount}</div>
        <button
          type='button'
          className={styles.headButton}
          onClick={handlePlusClick}
        >
          <Image src='/images/plus.svg' alt='plus' width={13} height={13} />
        </button>
      </div>
      <CustomButton
        type='submit'
        className={styles.reservationButton}
        fontSize='md'
      >
        예약하기
      </CustomButton>
      <div className={styles.totalSection}>
        <p className={styles.totalAmount}>총 합계</p>
        <p className={styles.totalPrice}>
          ₩ {(price * headCount).toLocaleString()}
        </p>
      </div>
    </>
  );
}
