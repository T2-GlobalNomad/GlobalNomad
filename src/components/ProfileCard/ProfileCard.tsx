'use client';

// 사용법
// <ProfileCard activeTab='mynotification(본인 탭 앤드포인트)' />

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProfileCard.module.css'; // 모듈 CSS import
import instance from '@/lib/api';

type ActiveTab = 'mypage' | 'myactivities' | 'myreservation' | 'mynotification';

const tab = [
  {
    key: 'mypage',
    label: '내 정보',
    href: '/mypage',
    img: '/images/icon_menu1.svg',
    activeImg: '/images/icon_menu1_active.svg',
  },
  {
    key: 'myreservation',
    label: '예약 내역',
    href: '/myreservation',
    img: '/images/icon_menu2.svg',
    activeImg: '/images/icon_menu2_active.svg',
  },
  {
    key: 'myactivities',
    label: '내 체험 관리',
    href: '/myactivities',
    img: '/images/icon_menu3.svg',
    activeImg: '/images/icon_menu2_active.svg',
  },
  {
    key: 'mynotification',
    label: '예약 현황',
    href: '/mynotification',
    img: '/images/icon_menu4.svg',
    activeImg: '/images/icon_menu4_active.svg',
  },
];

export default function ProfileCard({ activeTab }: { activeTab: ActiveTab }) {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await instance.get('/users/me');
        setProfileImage(response.data.profileImageUrl);
      } catch (error) {
        console.log('프로필 이미지 불러오기 실패', error);
      }
    };
    fetchProfileImage();
  }, []);

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={profileImage || '/defaultProfile.svg'}
          alt='프로필 이미지'
          width={160}
          height={160}
          className={styles.profileImage}
        />
      </div>

      <nav className={styles.nav}>
        {tab.map((item) => (
          <Link key={item.key} href={item.href}>
            <div
              className={`${styles.tabItem} ${
                activeTab === item.key ? styles.active : ''
              }`}
            >
              <Image
                src={activeTab === item.key ? item.activeImg : item.img}
                alt={item.label}
                width={20}
                height={20}
              />
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
}
