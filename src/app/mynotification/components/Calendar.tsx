import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { FaCircle } from 'react-icons/fa';
import '@/styles/Calendar.css';
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
  activeStartDate?: Date;
  schedule?: ScheduleData[];
  onMonthChange?: (activeStartDate: Date) => void;
  onDateClick?: (date: Date) => void;
  activityId: number;
}

export default function MyNotificationCalendar({
  activeStartDate,
  schedule = [],
  onMonthChange,
  onDateClick,
}: MyNotificationCalendarProps) {
  const [markedDates, setMarkedDates] = useState<
    Record<string, { completed: number; pending: number; confirmed: number }>
  >({});

  // 예약 데이터를 기반으로 markedDates 상태 업데이트
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

  const getStatusColor = (statuses: {
    completed: number;
    pending: number;
    confirmed: number;
  }) => {
    if (statuses.pending > 0) return '#007bff';
    if (statuses.confirmed > 0) return '#ff9800';
    if (statuses.completed > 0) return '#a0a0a0';
  };

  const handleDateClick = (date: Date) => {
    onDateClick?.(date);
  };

  // 예약 데이터를 바탕으로 날짜별 스타일 설정
  useEffect(() => {
    const dateMap: Record<string, string> = {};

    schedule.forEach(({ date, reservations }) => {
      if (reservations.pending > 0) {
        dateMap[date] = 'pending'; // 예약 대기 (파란색)
      } else if (reservations.confirmed > 0) {
        dateMap[date] = 'confirmed'; // 승인 완료 (주황색)
      } else if (reservations.completed > 0) {
        dateMap[date] = 'completed'; // 예약 완료 (회색)
      }
    });

    setMarkedDates(dateMap);
  }, [schedule]);

  // 점 색상 결정 함수 (CSS 클래스 대신 인라인 스타일 적용)
  const getStatusColor = (status: string) => {
    if (status === 'pending') return '#007bff'; // 예약 (파란색)
    if (status === 'confirmed') return '#ff9800'; // 승인 (주황색)
    if (status === 'completed') return '#a0a0a0'; // 완료 (회색)
    return '#ccc'; // 기본 회색
  };

  return (
    <div>
      <Calendar
        activeStartDate={activeStartDate}
        onChange={(date) => handleDateClick(date as Date)}
        onActiveStartDateChange={({ activeStartDate }) => {
          console.log('activeStartDate:: ', activeStartDate);
          if (activeStartDate) {
            onMonthChange?.(activeStartDate);
          }
        }}
        tileDisabled={() => false}
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
    </div>
  );
}
