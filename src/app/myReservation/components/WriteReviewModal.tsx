import Image from 'next/image';
import styles from '@/components/modal/customModal.module.css';
import CustomButton from '@/components/CustomButton';
import { SetStateAction } from 'react';

interface Props {
  reservationId: number | undefined;
  setShowModal: (value: boolean) => void;
  setShowToast: React.Dispatch<SetStateAction<boolean>>;
}

export default function WriteReviewModal({
  reservationId,
  setShowModal,
  setShowToast,
}: Props) {
  const submitButton: React.CSSProperties = {
    marginLeft: '8px',
    fontWeight: '700',
    color: '#fff',
    background: '#121',
  };

  // const { mutate: cancelReservation } = useCancelReservation(setShowToast);

  function handleWriteReview() {
    setShowModal(false);
  }

  return (
    <>
      <div className={styles.contents}>
        <div className={styles.buttonContainer}>
          <CustomButton
            type='button'
            fontSize='sm'
            variant='black'
            style={submitButton}
            onClick={handleWriteReview}
          >
            작성하기
          </CustomButton>
        </div>
      </div>
    </>
  );
}
