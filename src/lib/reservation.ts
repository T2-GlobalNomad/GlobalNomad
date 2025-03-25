import { AxiosError } from 'axios';
import instance from './api';

interface Reservation {
  scheduleId: number;
  headCount: number;
}

export async function postReservation(
  activityId: number,
  reservation: Reservation,
) {
  try {
    const response = await instance.post(
      `/activities/${activityId}/reservations`,
      reservation,
    );
    console.log('회원가입 성공:', response.data);
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 409) {
        console.error('확정 예약이 있는 일정은 예약할 수 없습니다.');
        throw new Error(error.response?.data?.message);
      } else {
        console.error('Error', error);
        throw error;
      }
    }
  }
}
