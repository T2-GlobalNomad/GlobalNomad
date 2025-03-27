'use client';

import { MoreVertical } from 'lucide-react';
import CustomDropdown from './customDropdown';
import { useState, useCallback } from 'react';
import styles from './customDropdown.module.css';
import ModalType1 from './ModalType1';
import useDeleteMyActivity from '@/hooks/useDeleteActivities';

interface KebabDropdownProps {
  activityId: number;
}

export default function KebabDropdown({ activityId }: KebabDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { mutate: deleteActivity } = useDeleteMyActivity();

  const handleRemoveActivity = () => {
    deleteActivity(activityId); // activityId 넘겨줌
    setShowModal(false);
  };

  const handleCloseDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div>
      <div className={styles.kebabIcon}>
        <button onClick={() => setIsOpen(!isOpen)}>
          <MoreVertical />
        </button>

        {isOpen && (
          <div className={styles.customDropdown}>
            <CustomDropdown
              isOpen={isOpen}
              setIsOpen={handleCloseDropdown}
              options={['수정하기', '삭제하기']}
              onChange={(value) => {
                if (value === '수정하기') {
                  console.log('수정하기 클릭!');
                } else if (value === '삭제하기') {
                  setShowModal(true);
                }
              }}
            ></CustomDropdown>
          </div>
        )}
      </div>

      {showModal && (
        <ModalType1
          isModalMessage='체험을 삭제하시겠습니까?'
          showModal={showModal}
          setShowModal={setShowModal}
          onConfirm={handleRemoveActivity}
        />
      )}
    </div>
  );
}
