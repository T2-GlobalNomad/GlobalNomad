'use client';

import CustomButton from '@/components/CustomButton';
import useReservationsByStatus from '@/hooks/query/useReservationsByStatus';
import useUpdateReservationStatus from '@/hooks/mutation/useUpdateReservationStatus';
import LoadingSpinner from '@/components/loadingSpinner/LoadingSpinner';
import styles from './ReservationInfoByStatus.module.css';

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
  // 상태에따른 스케줄 데이터 호출
  const {
    data: reservations = [],
    isLoading,
    error,
  } = useReservationsByStatus(activityId, scheduleId, status);

  // 상태 변경시 호출
  const mutation = useUpdateReservationStatus(activityId, scheduleId, status);

  const handleUpdateStatus = (
    reservationId: number,
    newStatus: 'confirmed' | 'declined',
  ) => {
    mutation.mutate({ reservationId, newStatus });
  };

  if (isLoading) return <LoadingSpinner />;
  if (error instanceof Error) return <p>에러: {error.message}</p>;

  return (
    <div>
      {reservations.length > 0 ? (
        reservations.map((res) => (
          <div className={styles.container} key={res.id}>
            <div className={styles.info}>
              <div className={styles.infoContainer}>
                <p className={styles.index}>닉네임&nbsp;&nbsp;</p>
                <p className={styles.value}>{res.nickname}</p>
              </div>
              <div className={styles.infoContainer}>
                <p className={styles.index}>인원&nbsp;&nbsp;</p>
                <p className={styles.value}>{res.headCount}명</p>
              </div>
            </div>

            {status === 'pending' ? (
              <div className={styles.buttons}>
                <CustomButton
                  className={styles.button}
                  fontSize='sm'
                  variant='black'
                  onClick={() => handleUpdateStatus(res.id, 'confirmed')}
                >
                  수락하기
                </CustomButton>
                <CustomButton
                  className={styles.button}
                  fontSize='sm'
                  variant='white'
                  onClick={() => handleUpdateStatus(res.id, 'declined')}
                >
                  거절하기
                </CustomButton>
              </div>
            ) : (
              <div className={styles.tags}>
                {status === 'confirmed' ? (
                  <p className={styles.confirmedTag}>예약 승인</p>
                ) : (
                  <p className={styles.declinedTag}>예약 거절</p>
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>해당 상태의 예약 내역이 없습니다.</p>
      )}
    </div>
  );
}
