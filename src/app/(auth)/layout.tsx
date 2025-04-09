import type { Metadata } from 'next';
import styles from './layout.module.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'GlobalNomad',
  description: '다양한 체험들을 경험해보세요!',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <Link href={'/'}>
        <Image
          src='/images/auth_logo.svg'
          alt='로고 이미지'
          width={340}
          height={192}
          priority
        />
      </Link>
      {children}
    </div>
  );
}
