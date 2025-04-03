'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './reservationCard.module.css';
import { Schedules } from '@/lib/types';
import CustomButton from '@/components/CustomButton';
import { postReservation } from '@/lib/reservation';
import BookingCalendar from './BookingCalendar';
import { CalendarTabletModal } from './CalendarModal';

interface ReservationCardProps {
  price: number;
  schedules: Schedules[];
  activityId: number;
}

export default function ReservationCard({
  price,
  schedules,
  activityId,
}: ReservationCardProps) {
  const [headCount, setHeadCound] = useState<number>(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>(
    window.innerWidth < 768
      ? 'mobile'
      : window.innerWidth < 1200
      ? 'tablet'
      : 'desktop',
  );

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDeviceType('mobile');
      } else if (window.innerWidth < 1200) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const handleMinusClick = () => {
    if (headCount === 1) return;
    setHeadCound((prev) => prev - 1);
  };

  const handlePlusClick = () => {
    setHeadCound((prev) => prev + 1);
  };

  const handlePostReservation = async () => {
    try {
      const reservationData = {
        scheduleId: selectedScheduleId,
        headCount,
      };
      await postReservation(activityId, reservationData);
      console.log('예약이 완료되었습니다!');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.priceSection}>
        <p className={styles.price}>₩ {price.toLocaleString()}</p>
        <p className={styles.perPerson}>&nbsp;/ 인</p>
      </div>
      <p className={styles.dateLabel}>날짜</p>
      {deviceType !== 'desktop' ? (
        <button
          className={styles.dateButton}
          onClick={() => setIsModalOpen(true)}
        >
          날짜 선택하기
        </button>
      ) : (
        <BookingCalendar
          schedules={schedules}
          selectedScheduleId={selectedScheduleId}
          setSelectedScheduleId={setSelectedScheduleId}
        />
      )}
      {deviceType !== 'desktop' && (
        <CalendarTabletModal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
          <BookingCalendar
            schedules={schedules}
            selectedScheduleId={selectedScheduleId}
            setSelectedScheduleId={setSelectedScheduleId}
          />
        </CalendarTabletModal>
      )}
      <p className={styles.headcount}>참여 인원 수</p>
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
        disabled={!selectedScheduleId}
        onClick={handlePostReservation}
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
