import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import ReservationInfoModal from './ReservationInfoModal';
import '@/styles/Calendar.css';
import { FaCircle } from 'react-icons/fa';
import styles from './Calendar.module.css';

type ScheduleData = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

interface MyNotificationCalendarProps {
  schedule?: ScheduleData[];
  onMonthChange?: (activeStartDate: Date) => void;
  activityId: number;
}

export default function MyNotificationCalendar({
  schedule = [],
  onMonthChange,
  activityId,
}: MyNotificationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [markedDates, setMarkedDates] = useState<
    Record<string, { completed: number; pending: number; confirmed: number }>
  >({});

  // 예약 데이터를 기반으로 markedDates(선택된 년월일) 상태 업데이트
  useEffect(() => {
    const dateMap: Record<
      string,
      { completed: number; pending: number; confirmed: number }
    > = {};

    schedule.forEach(({ date, reservations }) => {
      dateMap[date] = {
        completed: reservations.completed,
        pending: reservations.pending,
        confirmed: reservations.confirmed,
      };
    });

    setMarkedDates(dateMap);
  }, [schedule]);

  // 예약 상태별 색상 반환 함수
  const getStatusColor = (statuses: {
    completed: number;
    pending: number;
    confirmed: number;
  }) => {
    if (statuses.pending > 0) return '#007bff'; // 예약 (파란색)
    if (statuses.confirmed > 0) return '#ff9800'; // 승인 (주황색)
    if (statuses.completed > 0) return '#a0a0a0'; // 완료 (회색)
  };

  // 날짜 클릭 시 실행되는 함수
  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];

    setSelectedDate(dateString);
    setIsModalOpen(true); // 모달 열기
  };

  return (
    <div>
      <Calendar
        onChange={(date) => handleDateClick(date as Date)} // 날짜 클릭 시 모달 실행
        value={selectedDate ? new Date(selectedDate) : null}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            onMonthChange?.(activeStartDate);
          }
        }}
        tileDisabled={() => false} // 모든 날짜 클릭 가능하게 변경
        tileContent={({ date }) => {
          const dateString = date.toISOString().split('T')[0];
          const statuses = markedDates[dateString];

          return (
            <div className={styles.tileContainer}>
              {statuses && (
                <>
                  <div className={styles.iconWrapper}>
                    <FaCircle style={{ color: getStatusColor(statuses) }} />
                  </div>
                  <div className={styles.reservationWrapper}>
                    {statuses.pending > 0 && (
                      <div
                        className={`${styles.reservationBox} ${styles.pending}`}
                      >
                        예약 {statuses.pending}
                      </div>
                    )}
                    {statuses.confirmed > 0 && (
                      <div
                        className={`${styles.reservationBox} ${styles.confirmed}`}
                      >
                        승인 {statuses.confirmed}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        }}
        formatDay={(locale, date) => date.getDate().toString()}
      />

      {/* 모달이 열릴 때만 렌더링 */}

      {isModalOpen && selectedDate && (
        <ReservationInfoModal
          activityId={activityId}
          date={selectedDate}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
