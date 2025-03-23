'use client';

import { useEffect, useState, useCallback } from 'react';
import Dropdown from '@/components/Dropdown';
import MyNotificationCalendar from './components/Calendar';
import useMyActivities from '@/hooks/useMyActivities';
import instance from '@/lib/api';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import styles from './MyNotification.module.css';

type Activity = {
  id: number;
  title: string;
};

export default function MyNotification() {
  const {
    data: activities = [],
    isLoading,
    error,
  } = useMyActivities() as {
    data: Activity[];
    isLoading: boolean;
    error: unknown;
  };
  const [selectedActivity, setSelectedActivity] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [schedule, setSchedule] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(
    String(new Date().getMonth() + 1).padStart(2, '0'),
  );

  useEffect(() => {
    if (activities?.length) {
      setSelectedActivity(activities[0]); // 기본 선택 활동 설정
    }
  }, [activities]);

  // API 요청
  const fetchSchedule = useCallback(
    async (activityId: number, year: number, month: string) => {
      try {
        //console.log('API 요청 params:', { activityId, year, month });

        const response = await instance.get(
          `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
        );

        if (!response?.data) {
          throw new Error('데이터가 없습니다.');
        }

        //console.log('API 응답 데이터:', response.data);
        setSchedule(response.data);
      } catch (error) {
        console.error('스케줄 데이터를 받아오는 중 에러 발생:', error);
      }
    },
    [],
  );

  useEffect(() => {
    if (selectedActivity?.id) {
      fetchSchedule(selectedActivity.id, currentYear, currentMonth);
    }
  }, [selectedActivity, currentYear, currentMonth, fetchSchedule]);

  if (isLoading) return <p>로딩 중...</p>;
  if (error instanceof Error) return <p>에러 발생: {error.message}</p>;

  // 캘린더에서 연/월이 변경될 때 전송
  const handleMonthChange = (activeStartDate: Date) => {
    setCurrentYear(activeStartDate.getFullYear());
    setCurrentMonth(String(activeStartDate.getMonth() + 1).padStart(2, '0'));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        <ProfileCard activeTab='mynotification' />
      </div>

      <div className={styles.container}>
        <p className={styles.title}>예약 현황</p>
        <p className={styles.dropdownTitle}>체험명 선택</p>

        <Dropdown
          dropdownClassName={styles.dropdownList ?? ''}
          toggleClassName={styles.dropdownList}
          menuClassName={styles.dropdownList}
          menuItemClassName={styles.dropdownList}
          options={
            activities?.map((activity) => ({
              value: activity.id,
              label: activity.title,
            })) ?? []
          }
          selectedValue={selectedActivity?.id ?? null}
          onChange={(value) => {
            const selected =
              activities?.find((activity) => activity.id === value) || null;
            setSelectedActivity(selected);
          }}
        />

        <MyNotificationCalendar
          schedule={schedule}
          onMonthChange={handleMonthChange}
          activityId={selectedActivity?.id ?? 0}
        />
      </div>
    </div>
  );
}
