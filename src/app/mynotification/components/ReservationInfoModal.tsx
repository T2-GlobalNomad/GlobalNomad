import instance from '@/lib/api';
import { useEffect, useState } from 'react';
import CloseButton from '@/components/CloseButton';
import styles from './ReservationInfoModal.module.css';

interface ReservationInfo {
  scheduleId: number;
  startTime: string;
  endTime: string;
  count: { declined: number; confirmed: number; pending: number };
}

interface Props {
  activityId: number;
  date: string;
  onClose: () => void;
}

export default function ReservationInfoModal({
  activityId,
  date,
  onClose,
}: Props) {
  const [reservationList, setReservationList] = useState<ReservationInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReservationStatus = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `/my-activities/${activityId}/reserved-schedule?date=${date}`,
        );
        setReservationList(response.data);
      } catch (error) {
        setError(`에러 발생: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationStatus();
  }, [activityId, date]);

  const totalPending = reservationList.reduce(
    (sum, item) => sum + (item.count?.pending ?? 0),
    0,
  );
  const totalConfirmed = reservationList.reduce(
    (sum, item) => sum + (item.count?.confirmed ?? 0),
    0,
  );
  const totalDeclined = reservationList.reduce(
    (sum, item) => sum + (item.count?.declined ?? 0),
    0,
  );

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <CloseButton onClick={onClose} className={styles.closeBtn} />
        <h2>예약 정보</h2>
        {reservationList.length > 0 ? (
          <p>
            예약 {totalPending}
            승인 {totalConfirmed}
            거절 {totalDeclined}
          </p>
        ) : (
          <p>예약 정보 없음</p>
        )}
      </div>
      <hr />
    </div>
  );
}
