import { SetStateAction } from 'react';
import CustomModal from './CustomModal';
import CancelModal from '@/app/myreservation/components/CancelModal';

interface Props {
  modalType: string;
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  isModalMessage: string;
  setShowToast: React.Dispatch<SetStateAction<boolean>>;
  cancelId?: number;
}

export default function ModalType1({
  modalType,
  showModal,
  setShowModal,
  isModalMessage,
  setShowToast,
  cancelId,
}: Props) {
  if (!showModal) return null;

  return (
    <>
      <CustomModal isOpen={showModal} onClose={() => setShowModal(false)}>
        {modalType === 'cancel' ? (
          <CancelModal
            cancelId={cancelId}
            setShowModal={setShowModal}
            isModalMessage={isModalMessage}
            setShowToast={setShowToast}
          />
        ) : (
          ''
        )}
      </CustomModal>
    </>
  );
}
