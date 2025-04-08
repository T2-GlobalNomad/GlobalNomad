'use client';

import { useEffect, useState, useRef } from 'react';
import ReservationInfoByStatus from './ReservationInfoByStatus';
import useReservationSchedules from '@/hooks/query/useReservationsSchedules';
import CloseButton from '@/components/CloseButton';
import Dropdown from '@/components/Dropdown';
import useClickOutside from '@/utils/useClickOutside';
import styles from './ReservationInfoModal.module.css';

interface Props {
  activityId: number;
  date: string;
  onClose: () => void;
}

export default function ReservationInfoModal({
  activityId,
  date,
  onClose,
}: Props) {
  const [selectedStatus, setSelectedStatus] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );

  // 선택된 활동&날짜로 해당 날짜의 스케줄 불러옴
  const {
    data: scheduleList = [],
    isLoading,
    error,
  } = useReservationSchedules(activityId, date);

  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scheduleList.length > 0) {
      setSelectedScheduleId(scheduleList[0].scheduleId);
    }
  }, [scheduleList]);

  // 모달 바깥 클릭 시 onClose 실행
  useClickOutside({
    ref: modalRef,
    setter: () => onClose(),
  });

  const totalPending = scheduleList.reduce(
    (sum, schedule) => sum + schedule.count.pending,
    0,
  );
  const totalConfirmed = scheduleList.reduce(
    (sum, schedule) => sum + schedule.count.confirmed,
    0,
  );
  const totalDeclined = scheduleList.reduce(
    (sum, schedule) => sum + schedule.count.declined,
    0,
  );

  if (error) return <p>{error.message}</p>;

  return (
    <div>
      {' '}
      <div className={styles.modalOverlay}>
        {!isLoading && (
          <div ref={modalRef} className={styles.modalContent}>
            <div className={styles.header}>
              <p className={styles.modalTitle}>예약 정보</p>
              <CloseButton onClick={onClose} className={styles.closeBtn} />
            </div>
            {scheduleList.length === 0 ? (
              <p>예약된 스케줄이 없습니다.</p>
            ) : (
              <div className={styles.tabContainer}>
                <button
                  className={
                    selectedStatus === 'pending' ? styles.activeTab : styles.tab
                  }
                  onClick={() => setSelectedStatus('pending')}
                >
                  신청 {totalPending}
                </button>
                <button
                  className={
                    selectedStatus === 'confirmed'
                      ? styles.activeTab
                      : styles.tab
                  }
                  onClick={() => setSelectedStatus('confirmed')}
                >
                  승인 {totalConfirmed}
                </button>
                <button
                  className={
                    selectedStatus === 'declined'
                      ? styles.activeTab
                      : styles.tab
                  }
                  onClick={() => setSelectedStatus('declined')}
                >
                  거절 {totalDeclined}
                </button>
              </div>
            )}

            <div className={styles.underContainer}>
              <p className={styles.semiTitle}>예약 날짜</p>
              <p className={styles.date}>{date}</p>
              <Dropdown
                dropdownClassName={styles.dropdown ?? ''}
                toggleClassName={styles.dropdown}
                menuClassName={styles.dropdownList}
                menuItemClassName={styles.dropdownList}
                options={scheduleList.map((schedule) => ({
                  value: schedule.scheduleId,
                  label: `${schedule.startTime} ~ ${schedule.endTime}`,
                }))}
                selectedValue={selectedScheduleId ?? null}
                onChange={(value) => setSelectedScheduleId(Number(value))}
              />
            </div>

            <div className={styles.underContainer}>
              <p className={styles.semiTitle}>예약 내역</p>
              {selectedScheduleId && (
                <ReservationInfoByStatus
                  activityId={activityId}
                  scheduleId={selectedScheduleId}
                  status={selectedStatus}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
