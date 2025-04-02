import Image from 'next/image';
import CustomModal from '@/components/modal/CustomModal';
import styles from './customModal.module.css';
import CustomButton from '@/components/CustomButton';

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  isModalMessage: string;
  onConfirm: () => void;
}

export default function ModalType1({
  showModal,
  setShowModal,
  isModalMessage,
  onConfirm,
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
              onClick={() => {
                onConfirm(); // 삭제 로직 실행
                setShowModal(false); // 모달 닫기
              }}>
              삭제하기
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
