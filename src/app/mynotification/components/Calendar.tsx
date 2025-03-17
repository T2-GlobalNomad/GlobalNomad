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
    const dateMap: Record<string, string[]> = {};

    schedule.forEach(({ date, reservations }) => {
      const statusList: string[] = [];
      if (reservations.completed > 0) statusList.push('completed');
      if (reservations.pending > 0) statusList.push('pending');
      if (reservations.confirmed > 0) statusList.push('confirmed');
      dateMap[date] = statusList;
    });

    setMarkedDates(dateMap);
  }, [schedule]);

  // ✅ 예약 상태별 색상 반환 함수
  const getStatusColor = (statuses: string[] = []) => {
    if (statuses.includes('pending')) return '#007bff'; // 예약 (파란색)
    if (statuses.includes('confirmed')) return '#ff9800'; // 승인 (주황색)
    if (statuses.includes('completed')) return '#a0a0a0'; // 완료 (회색)
    return '#ccc'; // 기본 회색
  };

  // ✅ onActiveStartDateChange 핸들러 수정 (오류 해결)
  const handleMonthChange = (value: { activeStartDate?: Date | null }) => {
    const activeDate = value.activeStartDate;
    if (activeDate) {
      onMonthChange?.(activeDate); // 안전하게 호출
    }
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
