'use client';

import { useState } from 'react';
import { Schedules } from '@/lib/types';
import { postReservation } from '@/lib/reservation';
import ReservationCardTablet from './ReservationCardTablet';
import ReservationCardDesk from './ReservationCardDesk';
import ReservationCardMobile from './ReservationCardMobile';
import useDeviceType from '@/hooks/useDeviceType';
import CustomModal from '@/components/modal/CustomModal';
import styles from './reservationCard.module.css';
import CustomButton from '@/components/CustomButton';
import { AxiosError } from 'axios';

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
  const [headCount, setHeadCount] = useState<number>(1);
  const [selectedScheduleId, setSelectedScheduleId] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const deviceType = useDeviceType();

  const selectedSchedule = schedules.find(
    (schedule) => schedule.id === selectedScheduleId,
  );

  const handlePostReservation = async () => {
    try {
      const reservationData = {
        scheduleId: selectedScheduleId,
        headCount,
      };
      await postReservation(activityId, reservationData);
      setIsSuccessModal(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.status === 400) {
        alert('이미 지난 예정은 예약할 수 없습니다.');
      } else {
        alert(err);
      }
      console.log(err);
    }
  };

  const state = {
    headCount,
    isModalOpen,
    selectedSchedule,
    selectedScheduleId,
  };

  const handlers = {
    setSelectedScheduleId,
    setIsModalOpen,
    handleMinusClick: () => setHeadCount((prev) => Math.max(prev - 1, 1)),
    handlePlusClick: () => setHeadCount((prev) => prev + 1),
    handlePostReservation,
  };

  return (
    <>
      {deviceType === 'desktop' && (
        <ReservationCardDesk
          price={price}
          schedules={schedules}
          state={state}
          handlers={handlers}
        />
      )}
      {deviceType === 'tablet' && (
        <ReservationCardTablet
          price={price}
          schedules={schedules}
          state={state}
          handlers={handlers}
        />
      )}
      {deviceType === 'mobile' && (
        <ReservationCardMobile
          price={price}
          schedules={schedules}
          state={state}
          handlers={handlers}
        />
      )}
      <CustomModal
        isOpen={isSuccessModal}
        onClose={() => setIsSuccessModal(false)}
        className={styles.successModal}
      >
        <p>예약이 완료되었습니다</p>
        <CustomButton
          fontSize='md'
          className={styles.successModalButton}
          onClick={() => setIsSuccessModal(false)}
        >
          확인
        </CustomButton>
      </CustomModal>
    </>
  );
}
