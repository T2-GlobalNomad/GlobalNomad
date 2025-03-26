import Image from 'next/image';
import styles from '@/components/modal/customModal.module.css';
import CustomButton from '@/components/CustomButton';
import useCancelReservation from '@/hooks/useCancelReservation';
import { SetStateAction } from 'react';

interface Props {
  cancelId?: number;
  setShowModal: (value: boolean) => void;
  isModalMessage: string;
  setShowToast: React.Dispatch<SetStateAction<boolean>>;
}

export default function CancelModal({
  cancelId,
  setShowModal,
  isModalMessage,
  setShowToast,
}: Props) {
  const closeButton: React.CSSProperties = {
    fontWeight: '700',
    color: '#121',
  };
  const cancelReservationButton: React.CSSProperties = {
    marginLeft: '8px',
    fontWeight: '700',
    color: '#fff',
    background: '#121',
  };

  const { mutate: cancelReservation } = useCancelReservation();

  function handleCancelReservation() {
    setShowModal(false);

    if (cancelId) {
      try {
        cancelReservation(cancelId);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <>
      <div className={styles.contents}>
        <div className={styles.circle}>
          <Image
            src='/images/checkMark.svg'
            alt='체크'
            width={17}
            height={17}
            className={styles.iconCheck}
          />
        </div>
        <div className={styles.message}>{isModalMessage}</div>
        <div className={styles.buttonContainer}>
          <CustomButton
            type='button'
            fontSize='sm'
            variant='white'
            style={closeButton}
            onClick={() => setShowModal(false)}
          >
            아니오
          </CustomButton>
          <CustomButton
            type='button'
            fontSize='sm'
            variant='black'
            style={cancelReservationButton}
            onClick={handleCancelReservation}
          >
            취소하기
          </CustomButton>
        </div>
      </div>
    </>
  );
}
