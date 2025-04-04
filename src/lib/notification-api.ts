import instance from './api';

// 활동 목록
export const fetchMyActivities = async () => {
  const response = await instance.get('/my-activities');
  return response.data;
};

// 월별 예약
export const fetchScheduleByMonth = async (
  activityId: number,
  year: number,
  month: string,
) => {
  const response = await instance.get(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
  );
  return response.data;
};

// 날짜별 예약
export const fetchReservationSchedules = async (
  activityId: number,
  date: string,
) => {
  const response = await instance.get(
    `/my-activities/${activityId}/reservation-dashboard?date=${date}`,
  );
  return response.data;
};

// 시간대, 상태별 예약
export const fetchReservationByStatus = async (
  activityId: number,
  scheduleId: number,
  status: 'pending' | 'confirmed' | 'declined',
) => {
  const response = await instance.get(
    `/my-activities/${activityId}/reservations/?scheduleId=${scheduleId}&status=${status}`,
  );
  return response.data;
};
