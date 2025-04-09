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
  isLoading: boolean;
}

export default function MyNotificationCalendar({
  activeStartDate,
  schedule = [],
  onMonthChange,
  onDateClick,
  isLoading,
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

  return (
    <div>
      <Calendar
        activeStartDate={activeStartDate}
        onChange={(date) => handleDateClick(date as Date)}
        onActiveStartDateChange={({ activeStartDate }) => {
          if (activeStartDate) {
            onMonthChange?.(activeStartDate);
          }
        }}
        onClickDay={(date) => !isLoading && onDateClick?.(date)}
        tileDisabled={() => false}
        tileClassName={({ date }) => {
          if (isLoading) return styles.loadingTile;
          const dateString = date.toISOString().split('T')[0];
          const statuses = markedDates[dateString];
          if (statuses) return styles.markedTile;
          return ''; // 기본 타일
        }}
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
                    {statuses.completed > 0 && (
                      <div
                        className={`${styles.reservationBox} ${styles.completed}`}
                      >
                        완료 {statuses.completed}
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
