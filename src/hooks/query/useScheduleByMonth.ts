'use client';

import { useQuery } from '@tanstack/react-query';
import instance from '@/lib/api';

export interface ScheduleItem {
  date: string;
  reservations: {
    completed: number;
    confirmed: number;
    pending: number;
  };
}

const fetchScheduleByMonth = async (
  activityId: number,
  year: number,
  month: string,
): Promise<ScheduleItem[]> => {
  const response = await instance.get(
    `/my-activities/${activityId}/reservation-dashboard?year=${year}&month=${month}`,
  );
  return response.data;
};

const useScheduleByMonth = (
  activityId: number | null,
  year: number,
  month: string,
) => {
  return useQuery<ScheduleItem[]>({
    queryKey: ['scheduleByMonth', activityId, year, month],
    queryFn: () => {
      if (!activityId) throw new Error('activityId is required');
      return fetchScheduleByMonth(activityId, year, month);
    },
    enabled: !!activityId,
  });
};

export default useScheduleByMonth;
