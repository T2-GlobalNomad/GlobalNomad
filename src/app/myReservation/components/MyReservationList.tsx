'use client';

import CustomButton from '@/components/CustomButton';
import PageController from './PageController';
import styles from './style.module.css';
import Image from 'next/image';
import ModalType1 from '@/components/modal/ModalType1';
import { modalController } from '@/app/utils/modalController';

export default function MyReservationList() {
  const cancelReservationButton: React.CSSProperties = {
    padding: '8px 20px',
    background: '#fff',
    color: '#112211',
    border: '1px solid #112211',
    fontWeight: '700',
  };
  const writeReviewButton: React.CSSProperties = {
    padding: '8px 20px',
    fontWeight: '700',
  };

  const { showModal, setShowModal, isModalMessage, setIsModalMessage } =
    modalController();

  function handleCancelReservation () {
    setShowModal(true);
    setIsModalMessage('예약을 취소하시겠어요?');
  };

  return (
    <>
      {showModal && (
        <ModalType1
          showModal={showModal}
          setShowModal={setShowModal}
          isModalMessage={isModalMessage}
        />
      )}
      <PageController />
      <div className={styles.listContainer}>
        <div className={styles.reservationBox}>
          <div className={styles.thumbnail}>
            <Image
              src='/images/testActivity.png'
              alt='테스트'
              fill
              sizes='100vw'
              priority
              className={styles.img}
            />
          </div>
          <div className={styles.detail}>
            <div className={styles.top}>
              <p className={styles.status}>예약 완료</p>
              <div className={styles.info}>
                <p className={styles.title}>함께 배우면 즐거운 스트릿 댄스</p>
                <p className={styles.plan}>
                  2023. 2. 14<span className={styles.circle}>·</span>11:00 -
                  12:30
                  <span className={styles.circle}>·</span>10명
                </p>
              </div>
            </div>
            <div className={styles.bottom}>
              <div className={styles.price}>₩10,000</div>
              <CustomButton
                style={cancelReservationButton}
                onClick={handleCancelReservation}
              >
                예약 취소
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
