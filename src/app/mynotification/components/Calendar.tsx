import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { FaCircle } from 'react-icons/fa';
import styles from './Calendar.module.css';

type Value = Date | null | [Date | null, Date | null];

type ScheduleData = {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
};

interface MyNotificationCalendarProps {
  schedule: ScheduleData[];
}

export default function MyNotificationCalendar({
  schedule,
}: MyNotificationCalendarProps) {
  const [value, setValue] = useState<Date | null>(null);
  const [markedDates, setMarkedDates] = useState<Record<string, string>>({});

  // 날짜 선택 핸들러
  const handleChange = (selectedValue: Value) => {
    if (selectedValue instanceof Date) {
      setValue(selectedValue);
    }
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
        onChange={handleChange}
        value={value}
        tileContent={({ date }) => {
          const dateString = date.toISOString().split('T')[0];
          const reservations = schedule.find(
            (s) => s.date === dateString,
          )?.reservations;

          return reservations ? (
            <div className={styles.tileContainer}>
              {/* 날짜 오른쪽 위에 점 표시 */}
              <div className={styles.iconWrapper}>
                <FaCircle
                  style={{
                    color: getStatusColor(markedDates[dateString] || ''),
                  }}
                />
              </div>

              {/* 예약 상태 박스들 */}
              <div className={styles.reservationWrapper}>
                {reservations.completed > 0 && (
                  <div
                    className={`${styles.reservationBox} ${styles.completed}`}
                  >
                    완료 {reservations.completed}
                  </div>
                )}
                {reservations.pending > 0 && (
                  <div className={`${styles.reservationBox} ${styles.pending}`}>
                    예약 {reservations.pending}
                  </div>
                )}
                {reservations.confirmed > 0 && (
                  <div
                    className={`${styles.reservationBox} ${styles.confirmed}`}
                  >
                    승인 {reservations.confirmed}
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
