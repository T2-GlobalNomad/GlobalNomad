'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './nav.module.css';
import NavProfileCard from './NavProfileCard';
import NotificationModal from '../notification/NotificationModal';
import useClickOutside from '@/utils/useClickOutside';
import useUser from '@/hooks/query/useUser';

export default function Nav() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfileCard, setIsProfileCard] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [imageSrcMap, setImageSrcMap] = useState<Record<string, string>>({});

  const modalRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { data: user } = useUser();

  const handleImageError = (id: string) => {
    setImageSrcMap((prev) => ({ ...prev, [id]: '/images/no_profileImg.svg' }));
  };

  useClickOutside({ ref: profileRef, setter: setIsProfileCard });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) return null;
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
        {!user ? (
          <div className={styles.noTokenUI}>
            <Link href='/signin'>로그인</Link>
            <Link href='/signup'>회원가입</Link>
          </div>
        ) : (
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

            {/* 프로필 영역 */}
            <div
              className={styles.profile}
              ref={profileRef}
              onClick={() => setIsProfileCard((prev) => !prev)}
            >
              <div className={styles.profileImg}>
                <Image
                  src={
                    imageSrcMap[user.id!] ||
                    user.profileImageUrl ||
                    '/images/no_profileImg.svg'
                  }
                  fill
                  alt='프로필 이미지'
                  style={{ objectFit: 'cover' }}
                  priority
                  onError={() => handleImageError(String(user.id))}
                />
              </div>
              <p className={styles.nickname}>{user.nickname}</p>

              {/* 모달 렌더링 (isModalOpen이 true일 때만) */}
              {isModalOpen && (
                <div ref={modalRef}>
                  <NotificationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                  />
                </div>
              )}

              <div
                className={`${styles.dropdown}  ${
                  isProfileCard ? styles.active : ''
                }`}
              >
                {isProfileCard && (
                  <NavProfileCard
                    imageSrcMap={imageSrcMap}
                    handleImageError={handleImageError}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
