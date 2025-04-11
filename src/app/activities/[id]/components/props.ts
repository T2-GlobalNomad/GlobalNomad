import { Schedules } from '@/lib/types';

export interface ReservationState {
  headCount: number;
  isModalOpen: boolean;
  selectedSchedule: Schedules | undefined;
  selectedScheduleId: number;
}

export interface ReservationHandlers {
  setSelectedScheduleId: (id: number) => void;
  setIsModalOpen: (value: boolean) => void;
  handleMinusClick: () => void;
  handlePlusClick: () => void;
  handlePostReservation: () => void;
}
