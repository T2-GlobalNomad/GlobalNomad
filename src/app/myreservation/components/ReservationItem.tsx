'use client';

import Image from 'next/image';
import { SetStateAction, useState } from 'react';
import CustomButton from '@/components/CustomButton';
import styles from '../style.module.css';
import { RESERVATION_STATUS } from '@/constants/ReservationStatus';
import { Reservation } from '@/lib/types';
import { isPastDateTime } from '@/utils/dateUtils';
import { formattedDate } from '@/utils/formattedDate';

interface Props {
  reservationsData: Reservation[] | undefined;
  setShowModal: React.Dispatch<SetStateAction<boolean>>;
  setModalType: React.Dispatch<SetStateAction<string>>;
  setIsModalMessage: React.Dispatch<SetStateAction<string>>;
  handleNavigate: (activityId: string) => void;
  setReservationId: React.Dispatch<SetStateAction<number | undefined>>;
  setIsReviewData: React.Dispatch<SetStateAction<Reservation | undefined>>;
}

export default function ReservationItem({
  reservationsData,
  setModalType,
  setShowModal,
  setIsModalMessage,
  handleNavigate,
  setReservationId,
  setIsReviewData,
}: Props) {
  const statusMode = RESERVATION_STATUS;

  const [imageSrcMap, setImageSrcMap] = useState<Record<string, string>>({});

  const handleImageError = (id: string) => {
    setImageSrcMap((prev) => ({ ...prev, [id]: '/images/no_thumbnail.png' }));
  };

  function handleCancelReservation(id: number | undefined) {
    setModalType('cancel');
    setShowModal(true);
    setIsModalMessage('예약을 취소하시겠어요?');
    setReservationId(id);
  }

  function handleWriteReview(id: number | undefined, reservation: Reservation) {
    setModalType('review');
    setShowModal(true);
    setReservationId(id);
    setIsReviewData(reservation);
  }

  return (
    <>
      {reservationsData?.map((reservation) => {
        const { activity, date } = reservation;
        const statusInfo =
          statusMode[reservation.status!] || statusMode['pending'];

        return (
          <li
            key={reservation.id}
            className={`${styles.reservationBox} ${
              isPastDateTime(reservation.date, reservation.startTime) &&
              styles.noClick
            }`}
            onClick={() =>
              !isPastDateTime(reservation.date, reservation.startTime) &&
              handleNavigate(String(activity.id))
            }
          >
            {statusInfo.text === '예약 신청' &&
              isPastDateTime(reservation.date, reservation.startTime) && (
                <div className={styles.overlay}></div>
              )}

            <div className={styles.thumbnail}>
              {statusInfo.text === '예약 신청' &&
                isPastDateTime(reservation.date, reservation.startTime) && (
                  <div className={styles.overlay}></div>
                )}
              <Image
                src={
                  imageSrcMap[activity.id] ||
                  activity.bannerImageUrl ||
                  '/images/no_thumbnail.png'
                }
                alt='썸네일'
                fill
                sizes='100vw'
                style={{ objectFit: 'cover' }}
                priority
                onError={() => handleImageError(String(activity.id))}
              />
            </div>
            <div className={styles.detail}>
              <div className={styles.top}>
                <p
                  className={styles.status}
                  style={{ color: statusInfo.color }}
                >
                  {statusInfo.text}
                </p>
                <div className={styles.info}>
                  <p className={styles.title}>{activity.title}</p>
                  <p className={styles.plan}>
                    <span>{formattedDate(date!)}</span>
                    <span className={styles.circle}>·</span>
                    {reservation.startTime} - {reservation.endTime}
                    <span className={styles.circle}>·</span>
                    {reservation.headCount}명
                  </p>
                </div>
              </div>
              <div className={styles.bottom}>
                <div className={styles.price}>
                  ₩{reservation.totalPrice?.toLocaleString('ko-KR')}
                </div>
                {statusInfo.text === '예약 신청' &&
                !isPastDateTime(reservation.date, reservation.startTime) ? (
                  <CustomButton
                    variant='white'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCancelReservation(reservation.id);
                    }}
                    style={{ padding: '8px 20px' }}
                  >
                    예약 취소
                  </CustomButton>
                ) : statusInfo.text === '예약 신청' &&
                  isPastDateTime(reservation.date, reservation.startTime) ? (
                  <div className={styles.notice}>기한 만료</div>
                ) : statusInfo.text === '체험 완료' &&
                  reservation.reviewSubmitted ? (
                  <div className={styles.notice}>후기 작성 완료</div>
                ) : statusInfo.text === '체험 완료' ? (
                  <CustomButton
                    variant='black'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWriteReview(reservation.id, reservation);
                    }}
                    style={{ padding: '8px 20px' }}
                  >
                    후기 작성
                  </CustomButton>
                ) : (
                  ''
                )}
              </div>
            </div>
          </li>
        );
      })}
    </>
  );
}
