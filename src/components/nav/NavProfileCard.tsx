'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';
import { useAuthStore } from '@/stores/useAuthStore';
import useUser from '@/hooks/query/useUser';

interface Props {
  imageSrcMap: Record<string, string>;
  handleImageError: (id: string) => void;
}

export default function NavProfileCard({
  imageSrcMap,
  handleImageError,
}: Props) {
  const { logout } = useAuthStore();
  const { data: user } = useUser();

  return (
    <div className={styles.profileCardContainer}>
      <div className={styles.profileImg}>
        <Image
          src={
            (user?.id && imageSrcMap[user?.id]) ||
            user?.profileImageUrl ||
            '/images/no_profileImg.svg'
          }
          fill
          alt='프로필 이미지'
          style={{ objectFit: 'cover' }}
          priority
          onError={() => handleImageError(String(user?.id))}
        />
      </div>
      <ul className={styles.menuContainer}>
        <li className={styles.menu}>
          <Link href='/mypage' className={styles.link}>
            <Image
              src='/images/icon_menu1.svg'
              width={24}
              height={24}
              alt='내 정보'
              className={styles.iconMenu}
            />
            내 정보
          </Link>
        </li>
        <li className={styles.menu}>
          <Link href='/myreservation' className={styles.link}>
            <Image
              src='/images/icon_menu2.svg'
              width={24}
              height={24}
              alt='예약 내역'
              className={styles.iconMenu}
            />
            예약 내역
          </Link>
        </li>
        <li className={styles.menu}>
          <Link href='/myactivities' className={styles.link}>
            <Image
              src='/images/icon_menu3.svg'
              width={24}
              height={24}
              alt='내 체험 관리'
              className={styles.iconMenu}
            />
            내 체험 관리
          </Link>
        </li>
        <li className={styles.menu}>
          <Link href='/mynotification' className={styles.link}>
            <Image
              src='/images/icon_menu4.svg'
              width={24}
              height={24}
              alt='예약 현황'
              className={styles.iconMenu}
            />
            예약 현황
          </Link>
        </li>
        <li className={styles.logoutBtn} onClick={() => logout()}>
          로그아웃
        </li>
      </ul>
    </div>
  );
}
