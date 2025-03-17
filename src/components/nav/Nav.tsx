'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';
import NavProfileCard from './NavProfileCard';
import NotificationModal from '../notification/NotificationModal';
import useClickOutside from '@/utils/useClickOutside';

export default function Nav() {
  const [isProfileCard, setIsProfileCard] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 프로필 카드 바깥 클릭 시 닫기
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileCard(false);
      }

      // 알림 모달 바깥 클릭 시 닫기
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <Link href='/'>
            <Image
              src='/images/nav_globalNomad.svg'
              width={172}
              height={30}
              alt='Global Nomad'
            />
          </Link>
        </div>
        {/* 로그인 전 */}
        {/* <div className={styles.noTokenUI}>
          <Link href="/signin">로그인</Link>
          <Link href="/signup">회원가입</Link>
        </div> */}
        {/* 로그인 후 */}
        <div className={styles.hasTokenUI}>
          <div className={styles.notice}>
            <Image
              src='/images/icon_notification.svg'
              width={20}
              height={20}
              alt='알림'
              className={styles.iconNotice}
            />
          </div>
          <div
            className={styles.profile}
            ref={profileRef}
            onClick={() => setIsProfileCard((prev) => !prev)}
          >
            <Image
              src='/images/no_profileImg.svg'
              width={32}
              height={32}
              alt='프로필 이미지'
              className={styles.noProfileImg}
            />
            <p className={styles.nickname}>닉네임</p>
            <div
              className={`${styles.dropdown}  ${
                isProfileCard ? styles.active : ''
              }`}
            >
              {isProfileCard && <NavProfileCard />}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
