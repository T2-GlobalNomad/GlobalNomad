'use client';
import { useRouter } from 'next/router';
import { MoreVertical } from 'lucide-react';
import CustomDropdown from './customDropdown';
import { useState, useCallback } from 'react';
import styles from './customDropdown.module.css';

export default function KebabDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

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
                  router.push('/editMyActivity/page.tsx');
                } else if (value === '삭제하기') {
                  // 삭제하기 모달창 팝업
                }
              }}
            ></CustomDropdown>
          </div>
        )}
      </div>
    </div>
  );
}
