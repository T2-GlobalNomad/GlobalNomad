import instance from '@/lib/api';
import { useEffect, useState } from 'react';
import styles from './ReservationInfoByStatus.module.css';

interface Reservation {
  reservationId: number;
  nickname: string;
  count: number;
  id: number;
  headCount: number;
}

interface Props {
  activityId: number;
  scheduleId: number;
  status: 'pending' | 'confirmed' | 'declined';
}

export default function ReservationInfoByStatus({
  activityId,
  scheduleId,
  status,
}: Props) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      setLoading(true);
      try {
        // 선택된 scheduleId + status에 해당하는 예약 정보 가져오기
        const response = await instance.get(
          `/my-activities/${activityId}/reservations/?scheduleId=${scheduleId}&status=${status}`,
        );

        console.log('api응답: ', response.data.reservation);

        if (response.data && Array.isArray(response.data.reservations)) {
          setReservations(response.data.reservations);
        } else {
          setReservations([]);
        }
      } catch (error) {
        setError(`에러 발생: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [activityId, scheduleId, status]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      {reservations && reservations.length > 0 ? (
        reservations.map((res) => (
          <div key={res.id}>
            <div className={styles.infoContainer}>
              <p className={styles.index}>닉네임&nbsp;&nbsp;</p>
              <p className={styles.value}>{res.nickname}</p>
            </div>
            <div className={styles.infoContainer}>
              <p className={styles.index}>인원&nbsp;&nbsp;</p>
              <p className={styles.value}>{res.headCount}명</p>
            </div>
          </div>
        ))
      ) : (
        <p>해당 상태의 예약 내역이 없습니다.</p>
      )}
    </div>
  );
}
