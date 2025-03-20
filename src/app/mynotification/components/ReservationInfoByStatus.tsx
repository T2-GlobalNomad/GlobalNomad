import instance from '@/lib/api';
import { useEffect, useState } from 'react';

interface Reservation {
  reservationId: number;
  nickname: string;
  count: number;
  id: number;
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
    <div>
      <p>예약 내역</p>
      {reservations.map((res) => (
        <div
          key={res.id}
          style={{
            margin: '10px 0',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '5px',
          }}
        >
          <p>
            <strong>닉네임:</strong> {res.nickname}
          </p>
          <p>
            <strong>인원:</strong> {res.count}명
          </p>
        </div>
      ))}
    </div>
  );
}
