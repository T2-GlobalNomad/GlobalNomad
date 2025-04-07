'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/ProfileCard/ProfileCard.module.css';
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
    activeImg: '/images/icon_menu3_active.svg',
  },
  {
    key: 'mynotification',
    label: '예약 현황',
    href: '/mynotification',
    img: '/images/icon_menu4.svg',
    activeImg: '/images/icon_menu4_active.svg',
  },
];

const MockedProfileCard = ({
  activeTab = 'mynotification',
}: {
  activeTab: ActiveTab;
}) => {
  const mockUser = {
    profileImageUrl: '/images/defaultProfile.svg',
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={mockUser.profileImageUrl}
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
};

export default MockedProfileCard;
