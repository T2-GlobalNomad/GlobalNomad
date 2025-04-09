import Image from 'next/image';
import styles from './not-found.module.css';
import CustomButton from '@/components/CustomButton';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <Image
        src='/images/not_found.png'
        alt='NotFound'
        width={100}
        height={100}
        className={styles.notFoundImg}
      />
      <p className={styles.description}>
        페이지가 없거나 접근할 수 없어요
        <span className={styles.subText}>
          입력하신 주소가 맞는지 다시 확인해주세요
        </span>
      </p>
      <CustomButton
        href='/'
        type={'button'}
        fontSize={'md'}
        style={{ padding: '8px 15px', background: 'var(--green)' }}
        className={styles.link}
      >
        홈으로 돌아가기
      </CustomButton>
    </div>
  );
}
