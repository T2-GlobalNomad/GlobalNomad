'use client';

import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/api';

export interface ReservationSchedule {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: { declined: number; confirmed: number; pending: number };
}

const fetchReservationSchedules = async (
  activityId: number,
  date: string,
): Promise<ReservationSchedule[]> => {
  const response = await instance.get(
    `/my-activities/${activityId}/reserved-schedule?date=${date}`,
  );
  return response.data;
};

const useReservationSchedules = (activityId: number, date: string) => {
  return useQuery<ReservationSchedule[]>({
    queryKey: ['reservationSchedules', activityId, date],
    queryFn: () => fetchReservationSchedules(activityId, date),
    enabled: !!activityId && !!date,
  });
};

export default useReservationSchedules;
