'use client';

import instance from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export interface Reservation {
  reservationId: number;
  nickname: string;
  count: number;
  id: number;
  headCount: number;
}

const fetchReservationByStatus = async (
  activityId: number,
  scheduleId: number,
  status: 'pending' | 'confirmed' | 'declined',
): Promise<Reservation[]> => {
  const { data } = await instance.get(
    `/my-activities/${activityId}/reservations/?scheduleId=${scheduleId}&status=${status}`,
  );
  return data.reservations ?? [];
};

const useReservationsByStatus = (
  activityId: number,
  scheduleId: number,
  status: 'pending' | 'confirmed' | 'declined',
) => {
  return useQuery<Reservation[]>({
    queryKey: ['reservations', activityId, scheduleId, status],
    queryFn: () => fetchReservationByStatus(activityId, scheduleId, status),
    enabled: !!activityId && !!scheduleId && !!status,
  });
};

export default useReservationsByStatus;
