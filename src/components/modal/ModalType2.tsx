import CustomButton from '../CustomButton';
import CustomModal from './CustomModal';
import styles from './customModal.module.css';

interface Props {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  isModalMessage: string;
  onConfirm?: () => void;
}

/**
 * 모달이 필요한 컴포넌트에서 "utils/modalController"를 import 하고 props를 받아 ModalType2의 prop으로 내려 사용해주세요. (UI 변경이 필요하므로 use client; 필수)
 
 * 각 페이지별로 다른 스타일 적용이나 경로 이동 등의 차별화가 필요하시면 boolean 타입의 prop을 내려 사용해주시고, 위의 Props type에서 옵셔널(?)로 적용해주세요.
 
 * 사용법이 어려우시면 myReservation/components/MyReservationList를 참고해주시고 추가 사항은 질문 주세요. -  by.혜림
 */

export default function ModalType2({
  showModal,
  setShowModal,
  isModalMessage,
  onConfirm,
}: Props) {
  if (!showModal) return null;

  /**
   * 버튼 클릭 시 필요한 액션은 아래의 함수를 이용해주세요. 각 페이지 별 차별화된 액션이 필요한 경우 위에 안내된 boolean 타입의 prop을 이용해 조건문으로 작성해주세요.
   */
  function handleConfirmationButton() {
    if (onConfirm) onConfirm();
    setShowModal(false);
  }

  return (
    <>
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className={`${styles.contents} ${styles.type2}`}>
          <div className={styles.message}>{isModalMessage}</div>
          <div className={styles.buttonContainer}>
            <CustomButton
              type='button'
              fontSize='sm'
              variant='black'
              style={{ width: '120px' }}
              onClick={handleConfirmationButton}
            >
              확인
            </CustomButton>
          </div>
        </div>
      </CustomModal>
    </>
  );
}
