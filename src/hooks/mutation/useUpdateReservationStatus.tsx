'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import instance from '@/lib/api';

interface MutationParams {
  reservationId: number;
  newStatus: 'confirmed' | 'declined';
}

const useUpdateReservationStatus = (
  activityId: number,
  scheduleId: number,
  currentStatus: 'pending' | 'confirmed' | 'declined',
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reservationId, newStatus }: MutationParams) =>
      instance.patch(
        `/my-activities/${activityId}/reservations/${reservationId}`,
        { status: newStatus },
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['reservedSchedules', activityId],
      });
      queryClient.invalidateQueries({
        queryKey: ['reservations', activityId, scheduleId, currentStatus],
      });
      queryClient.invalidateQueries({
        queryKey: [
          'reservationByStatus',
          activityId,
          scheduleId,
          currentStatus,
        ],
      });
    },
  });
};

export default useUpdateReservationStatus;
