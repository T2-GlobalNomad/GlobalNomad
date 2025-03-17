import Image from 'next/image';
import styles from './empty.module.css';

/**
 * 페이지 제목(ex: 예약 내역, 내 체험 관리, 예약 현황 등) 바로 아래에 배치 시켜 주세요.
 */

export default function Empty() {
  return (
    <>
      <div className={styles.contents}>
        <div className={styles.emptyImg}>
          <Image src='/images/empty.svg' alt='No List' fill />
        </div>

        <p className={styles.description}>아직 등록한 체험이 없어요</p>
      </div>
    </>
  );
}
