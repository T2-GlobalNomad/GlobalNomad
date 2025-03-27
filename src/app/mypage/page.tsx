'use client';

import { useState, useEffect } from 'react';
import { User } from '@/lib/types';
import useUser from '@/hooks/useUser';
import Image from 'next/image';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import CustomButton from '@/components/CustomButton';
import ProfileUpdateModal from './components/ProfileUpdateModal';
import Footer from '@/components/footer/Footer';
import styles from './MyPage.module.css';

export default function MyPage() {
  const {
    data: user = [],
    isLoading,
    error,
  } = useUser() as {
    data: User;
    isLoading: boolean;
    error: unknown;
  };
  const [myProfile, setMyProfile] = useState<User | null>(null);

  const handleUpdate = (updateUserInfo: {
    nickname: string;
    profileImageUrl: string;
    newPassword: string;
  }) => {
    setMyProfile((prev) =>
      prev
        ? {
            ...prev,
            nickname: updateUserInfo.nickname,
            profileImageUrl: updateUserInfo.profileImageUrl,
          }
        : null,
    );
    setIsModalOpen(false);
  };

  if (loading) return <div>로딩 중...</div>;

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.profileCard}>
          <ProfileCard activeTab='mypage' />
        </div>
        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.title}>내 정보</p>
            <CustomButton
              className={styles.button}
              fontSize='sm'
              variant='black'
              onClick={() => setIsModalOpen(true)}
            >
              수정하기
            </CustomButton>
          </div>

          <div className={styles.contentContainer}>
            <div>
              {myProfile?.profileImageUrl && (
                <Image
                  className={styles.profileImage}
                  src={myProfile.profileImageUrl}
                  width={160}
                  height={160}
                  alt='프로필 이미지'
                />
              )}
            </div>
            <div className={styles.contents}>
              <div className={styles.contentWrapper}>
                <p className={styles.semiTitle}>닉네임</p>
                <p className={styles.value}>{myProfile?.nickname}</p>
              </div>
              <div className={styles.contentWrapper}>
                <p className={styles.semiTitle}>이메일</p>
                <p className={styles.value}>{myProfile?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 모달 렌더링 */}
        {isModalOpen && myProfile && (
          <ProfileUpdateModal
            user={{
              nickname: myProfile.nickname,
              email: myProfile.email,
              profileImageUrl: myProfile.profileImageUrl,
            }}
            onUpdate={handleUpdate}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
