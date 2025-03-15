'use client';

import { useEffect, useState } from 'react';
import Dropdown from '@/components/Dropdown';
import MyNotificationCalendar from './components/Calendar';
import useMyActivities from '@/hooks/useMyActivities';
import instance from '@/lib/api';
import styles from './MyNotification.module.css';

export default function MyNotification() {
  const { data: activities, isLoading, error } = useMyActivities();
  const [selectedActivity, setSelectedActivity] = useState<{
    id: number;
    title: string;
  } | null>(null);
  const [schedule, setSchedule] = useState<
    {
      date: string;
      reservations: { completed: number; confirmed: number; pending: number };
    }[]
  >([]);

  // 현재 연도 및 월 가져오기
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0');

  useEffect(() => {
    if (activities && activities.length > 0) {
      setSelectedActivity(activities[0]); // 기본 선택 활동 설정
    }
  }, [activities]);

  // 선택된 활동의 예약 데이터를 가져오기
  useEffect(() => {
    if (!selectedActivity?.id) {
      console.error('활동 ID 값을 받아오지 못했습니다.');
      return;
    }

    const fetchSchedule = async () => {
      console.log('API 요청 params:', {
        activityId: selectedActivity.id,
        year: String(currentYear),
        month: currentMonth,
      });

      try {
        const response = await instance.get(
          `/my-activities/${selectedActivity.id}/reservation-dashboard?year=${currentYear}&month=${currentMonth}`,
        );

        if (!response || !response.data) {
          throw new Error('데이터가 없습니다.');
        }

        console.log('API 응답 데이터:', response.data);
        setSchedule(response.data);
      } catch (error) {
        console.error('스케줄 데이터를 받아오는 중 에러 발생:', error);
      }
    };

    fetchSchedule();
  }, [selectedActivity]); // `selectedActivity` 변경 시 자동 실행

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className={styles.container}>
      <p className={styles.title}>예약 현황</p>
      <p className={styles.dropdownTitle}>체험명 선택</p>
      <Dropdown
        dropdownClassName={styles.dropdownList ?? ''}
        options={
          activities?.map((activity) => ({
            id: activity.id,
            title: activity.title,
          })) || []
        }
        selected={selectedActivity}
        onChange={(value) => setSelectedActivity(value)}
      />
      {/* 달력에 예약 데이터를 전달 */}
      <MyNotificationCalendar schedule={schedule} />
    </div>
  );
}
