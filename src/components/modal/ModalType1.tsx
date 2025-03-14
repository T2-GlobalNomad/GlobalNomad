import Image from 'next/image';
import CustomModal from './CustomModal';
import styles from './customModal.module.css';
import CustomButton from '../CustomButton';

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  isModalMessage: string;
}

export default function ModalType1({
  showModal,
  setShowModal,
  isModalMessage,
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

  if (!showModal) return null;

  return (
    <>
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
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
            >
              취소하기
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
