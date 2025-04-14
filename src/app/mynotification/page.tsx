'use client';

import { useEffect, useState, useMemo } from 'react';
import Dropdown from '@/components/Dropdown';
import MyNotificationCalendar from './components/Calendar';
import ReservationInfoModal from './components/ReservationInfoModal';
import useMyActivitiesCalendar from '@/hooks/query/useMyActivitiesCalendar';
import useScheduleByMonth from '@/hooks/query/useScheduleByMonth';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import Footer from '@/components/footer/Footer';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import styles from './MyNotification.module.css';

type Activity = {
  id: number;
  title: string;
};

export default function MyNotification() {
  const {
    data: activities = [],
    isLoading: isActivitiesLoading,
    error: activitiesError,
  } = useMyActivitiesCalendar() as {
    data: Activity[];
    isLoading: boolean;
    error: unknown;
  };

  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null,
  );
  const [activeStartDate, setActiveStartDate] = useState<Date>();
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, '0'),
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const isLoading = isActivitiesLoading;

  // 활동 목록이 로드되면 첫 항목 기본 선택
  useEffect(() => {
    if (activities.length > 0) {
      setSelectedActivity(activities[0]);
    }
  }, [activities]);

  // 선택된 활동 ID만 분리
  const selectedActivityId = useMemo(
    () => selectedActivity?.id ?? null,
    [selectedActivity],
  );

  // 월별 예약 스케줄 호출
  const {
    data: schedule = [],
    //isLoading: isScheduleLoading,
    error: scheduleError,
  } = useScheduleByMonth(selectedActivityId, currentYear, currentMonth);

  // 캘린더에서 연/월이 변경될 때 전송
  const handleMonthChange = (activeStartDate: Date) => {
    setActiveStartDate(activeStartDate);
    setCurrentYear(activeStartDate.getFullYear());
    setCurrentMonth(String(activeStartDate.getMonth() + 1).padStart(2, '0'));
  };

  const handleDateClick = (date: Date) => {
    const dateString = date.toISOString().split('T')[0];
    setSelectedDate(dateString);
  };

  // 로딩 및 에러 처리
  const errorMessage =
    (activitiesError instanceof Error ? activitiesError.message : '') ||
    (scheduleError instanceof Error ? scheduleError.message : '');

  if (errorMessage) return <p>에러 발생: {errorMessage}</p>;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.sidebar}>
          <ProfileCard activeTab='mynotification' />
        </div>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.container}>
            <p className={styles.title}>예약 현황</p>
            <p className={styles.dropdownTitle}>체험명 선택</p>
            <Dropdown
              dropdownClassName={styles.dropdownList ?? ''}
              toggleClassName={styles.dropdownList}
              menuClassName={styles.dropdownList}
              menuItemClassName={styles.dropdownList}
              options={activities.map((activity) => ({
                value: activity.id,
                label: activity.title,
              }))}
              selectedValue={selectedActivityId}
              onChange={(value) => {
                const selected =
                  activities.find((activity) => activity.id === value) || null;
                setSelectedActivity(selected);
              }}
            />
            {selectedActivity && (
              <>
                <MyNotificationCalendar
                  activeStartDate={activeStartDate}
                  schedule={schedule}
                  onMonthChange={handleMonthChange}
                  onDateClick={handleDateClick}
                  activityId={selectedActivity.id}
                  isLoading={isActivitiesLoading}
                />

                {selectedDate && (
                  <ReservationInfoModal
                    activityId={selectedActivity.id}
                    date={selectedDate}
                    onClose={() => setSelectedDate(null)}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
