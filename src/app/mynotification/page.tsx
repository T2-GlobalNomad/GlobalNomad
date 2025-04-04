import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import {
  fetchMyActivities,
  fetchReservationByStatus,
  fetchReservationSchedules,
  fetchScheduleByMonth,
} from '@/lib/notification-api';
import MyNotificationClient from './MyNotificationClient';

export default async function MyNotification() {
  const queryClient = getQueryClient();

  // 활동목록
  await queryClient.prefetchQuery({
    queryKey: ['myActivities'],
    queryFn: fetchMyActivities,
  });

  const activities = await fetchMyActivities();
  const indexActivity = activities[0];

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = String(today.getMonth() + 1).padStart(2, '0');
  const currentDate = today.toISOString().split('T')[0];

  if (indexActivity) {
    const activityId = indexActivity.id;

    // 월별 예약 스케줄
    await queryClient.prefetchQuery({
      queryKey: ['schedules', activityId, currentYear, currentMonth],
      queryFn: () =>
        fetchScheduleByMonth(activityId, currentYear, currentMonth),
    });

    // 날짜별 예약 스케줄 목록
    await queryClient.prefetchQuery({
      queryKey: ['reservationSchedules', activityId, currentDate],
      queryFn: () => fetchReservationSchedules(activityId, currentDate),
    });

    // 시간대, 상태별 예약
    const scheduleList = await fetchReservationSchedules(
      activityId,
      currentDate,
    );
    const scheduleId = scheduleList[0]?.scheduleId;

    for (const status of ['pending', 'confirmed', 'declined']) {
      await queryClient.prefetchQuery({
        queryKey: ['reservationByStatus', activityId, scheduleId, status],
        queryFn: () =>
          fetchReservationByStatus(
            activityId,
            scheduleId,
            status as 'pending' | 'confirmed' | 'declined',
          ),
      });
    }
  }

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <MyNotificationClient />
    </HydrationBoundary>
  );
}
