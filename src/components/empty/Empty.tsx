import Image from 'next/image';
import CustomButton from '../CustomButton';
import styles from './empty.module.css';

/**
 * @type {boolean} myReservation - 예약 내역
 * @type {boolean} myActivities - 내 체험 관리
 * @type {boolean} myNotifications - 예약 현황
 */

interface Props {
  myReservation?: boolean;
  myActivities?: boolean;
  myNotifications?: boolean;
}

/**
 * 사용 방법
    <Empty myReservation />
    or
    <Empty myActivities />
    or
    <Empty myNotifications />
 */

export default function Empty({
  myReservation,
  myActivities,
  myNotifications,
}: Props) {
  const buttonStyles: React.CSSProperties = {
    padding: '8px 15px',
    backgroundColor: '#0b3b2d',
    fontWeight: '600',
  };

  return (
    <>
      <div className={styles.head}>
        <p className={styles.title}>
          {myReservation
            ? '예약 내역'
            : myActivities
            ? '내 체험 관리'
            : myNotifications
            ? '예약 현황'
            : ''}
        </p>
        {myActivities && (
          <CustomButton style={buttonStyles}>체험 등록하기</CustomButton>
        )}
      </div>
      <div className={styles.contents}>
        <div className={styles.emptyImg}>
          <Image src='/images/empty.svg' alt='No List' fill />
        </div>

        <p className={styles.description}>아직 등록한 체험이 없어요</p>
      </div>
    </>
  );
}
