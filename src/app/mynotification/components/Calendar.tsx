import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
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
}

export default function MyNotificationCalendar({
  schedule = [],
  onMonthChange,
}: MyNotificationCalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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

  // 예약 상태별 색상 반환 함수
  const getStatusColor = (statuses: string[] = []) => {
    if (statuses.includes('pending')) return '#007bff'; // 예약 (파란색)
    if (statuses.includes('confirmed')) return '#ff9800'; // 승인 (주황색)
    if (statuses.includes('completed')) return '#a0a0a0'; // 완료 (회색)
    return '#ccc'; // 기본 회색
  };

  // onActiveStartDateChange 핸들러 수정 (오류 해결)
  const handleMonthChange = (value: { activeStartDate?: Date | null }) => {
    const activeDate = value.activeStartDate;
    if (activeDate) {
      onMonthChange?.(activeDate); // 안전하게 호출
    }
  };

  return (
    <div>
      <Calendar
        onChange={(date) => setSelectedDate(date as Date)}
        value={selectedDate}
        onActiveStartDateChange={handleMonthChange} // 수정된 함수 적용
        tileContent={({ date }) => {
          const dateString = date.toISOString().split('T')[0];
          const statuses = markedDates[dateString];

          return statuses ? (
            <div className={styles.tileContainer}>
              {/* 날짜 오른쪽 위에 상태 점 표시 */}
              <div className={styles.iconWrapper}>
                <FaCircle
                  style={{ color: getStatusColor(Object.keys(statuses)) }}
                />
              </div>

              {/* 예약 상태 별 박스 표시 */}
              <div className={styles.reservationWrapper}>
                {statuses.completed > 0 && (
                  <div
                    className={`${styles.reservationBox} ${styles.completed}`}
                  >
                    완료 {statuses.completed}
                  </div>
                )}
                {statuses.pending > 0 && (
                  <div className={`${styles.reservationBox} ${styles.pending}`}>
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
            </div>
          ) : null;
        }}
        formatDay={(locale, date) => date.getDate().toString()}
      />
    </div>
  );
}
