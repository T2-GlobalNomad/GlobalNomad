'use client';

import { useRouter } from 'next/navigation';
import styles from '../style.module.css';
import ModalType1 from '@/components/modal/ModalType1';
import { useModalController } from '@/utils/useModalController';
import ReservationItem from './ReservationItem';
import { Reservation } from '@/lib/types';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  reservationsData: Reservation[] | undefined;
}

export default function ListContainer({ reservationsData }: Props) {
  const router = useRouter();

  const handleNavigate = (activityId: string) => {
    router.push(`/activities/${activityId}`);
  };

  const [modalType, setModalType] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [cancelId, setCancelId] = useState<number>();

  const { showModal, setShowModal, isModalMessage, setIsModalMessage } =
    useModalController();

  return (
    <>
      {showModal && (
        <ModalType1
          modalType={modalType}
          showModal={showModal}
          setShowModal={setShowModal}
          isModalMessage={isModalMessage}
          setShowToast={setShowToast}
          cancelId={cancelId}
        />
      )}

      <ul className={styles.listContainer}>
        <ReservationItem
          reservationsData={reservationsData}
          handleNavigate={handleNavigate}
          setModalType={setModalType}
          setShowModal={setShowModal}
          setIsModalMessage={setIsModalMessage}
          setCancelId={setCancelId}
        />
      </ul>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles.toast}
          >
            예약 취소가 완료되었습니다
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
