'use client';

import Image from 'next/image';
import styles from './headCount.module.css';

interface HeadCountProps {
  headCount: number;
  MinusClick: () => void;
  PlusClick: () => void;
}

export default function HeadCount({
  headCount,
  MinusClick,
  PlusClick,
}: HeadCountProps) {
  return (
    <>
      <p className={styles.headCount}>참여 인원 수</p>
      <div className={styles.headCountButton}>
        <button
          type='button'
          className={styles.headButton}
          onClick={MinusClick}
        >
          <Image src='/images/minus.svg' alt='minus' width={13} height={13} />
        </button>
        <div>{headCount}</div>
        <button type='button' className={styles.headButton} onClick={PlusClick}>
          <Image src='/images/plus.svg' alt='plus' width={13} height={13} />
        </button>
      </div>
    </>
  );
}
