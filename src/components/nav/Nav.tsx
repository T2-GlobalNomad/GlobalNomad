'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';
import NavProfileCard from './NavProfileCard';
import NotificationModal from '../notification/NotificationModal';

export default function Nav() {
  const [isProfileCard, setIsProfileCard] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

        <div className={styles.hasTokenUI}>
          {/* 알림 아이콘 클릭 시 모달 열기 */}
          <div className={styles.notice} onClick={() => setIsModalOpen(true)}>
            <Image
              src='/images/icon_notification.svg'
              width={20}
              height={20}
              alt='알림'
              className={styles.iconNotice}
            />
          </div>

          {/* 모달 렌더링 (isModalOpen이 true일 때만) */}
          {isModalOpen && (
            <div ref={modalRef}>
              <NotificationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />
            </div>
          )}

          {/* 프로필 영역 */}
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
