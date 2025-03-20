import instance from '@/lib/api';
import { useEffect, useState } from 'react';
import ReservationInfoByStatus from './ReservationInfoByStatus';
import CloseButton from '@/components/CloseButton';
import Dropdown from '@/components/Dropdown';
import styles from './ReservationInfoModal.module.css';

interface ScheduleInfo {
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
  const [scheduleList, setScheduleList] = useState<ScheduleInfo[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<
    'pending' | 'confirmed' | 'declined'
  >('pending');
  const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const response = await instance.get(
          `/my-activities/${activityId}/reserved-schedule?date=${date}`,
        );
        setScheduleList(response.data);

        if (response.data.length > 0) {
          setSelectedScheduleId(response.data[0].scheduleId);
        }
      } catch (error) {
        setError(`에러 발생: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, [activityId, date]);

  const totalPending = scheduleList.reduce(
    (sum, schedule) => sum + schedule.count.pending,
    0,
  );
  const totalConfirmed = scheduleList.reduce(
    (sum, schedule) => sum + schedule.count.confirmed,
    0,
  );
  const totalDeclined = scheduleList.reduce(
    (sum, schedule) => sum + schedule.count.declined,
    0,
  );

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;
  if (scheduleList.length === 0) return <p>예약된 스케줄이 없습니다.</p>;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.header}>
          <p className={styles.modalTitle}>예약 정보</p>
          <CloseButton onClick={onClose} className={styles.closeBtn} />
        </div>
        <div className={styles.tabContainer}>
          <button
            className={
              selectedStatus === 'pending' ? styles.activeTab : styles.tab
            }
            onClick={() => setSelectedStatus('pending')}
          >
            신청 {totalPending}
          </button>
          <button
            className={
              selectedStatus === 'confirmed' ? styles.activeTab : styles.tab
            }
            onClick={() => setSelectedStatus('confirmed')}
          >
            승인 {totalConfirmed}
          </button>
          <button
            className={
              selectedStatus === 'declined' ? styles.activeTab : styles.tab
            }
            onClick={() => setSelectedStatus('declined')}
          >
            거절 {totalDeclined}
          </button>
        </div>

        <hr />

        <div>
          <p>예약 날짜</p>
          <Dropdown
            options={scheduleList.map((schedule) => ({
              value: schedule.scheduleId,
              label: `${schedule.startTime} ~ ${schedule.endTime}`,
            }))}
            selectedValue={selectedScheduleId ?? null}
            onChange={(value) => setSelectedScheduleId(Number(value))}
          />
        </div>

        {selectedScheduleId && (
          <ReservationInfoByStatus
            activityId={activityId}
            scheduleId={selectedScheduleId}
            status={selectedStatus}
          />
        )}
      </div>
    </div>
  );
}
