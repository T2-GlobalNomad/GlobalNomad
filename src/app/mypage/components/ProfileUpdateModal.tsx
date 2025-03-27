'use client';

import { useState } from 'react';
import Image from 'next/image';
import instance from '@/lib/api';
import { User } from '@/lib/types';
import Input from '@/components/Input/Input';
import CustomButton from '@/components/CustomButton';
import styles from './ProflieUpdateModal.module.css';

interface ProfileUpdateModalProps {
  user: User;
  onUpdate: (updatedUser: {
    nickname: string;
    profileImageUrl: string;
    newPassword: string;
  }) => void;
  onClose: () => void;
}

const ProfileUpdateModal: React.FC<ProfileUpdateModalProps> = ({
  user,
  onUpdate,
  onClose,
}) => {
  const [newNickname, setNewNickname] = useState<string>(user.nickname || '');
  const [newImageUrl, setNewImageUrl] = useState<string>(
    user.profileImageUrl || '',
  );
  const [newPassword, setNewPassword] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  // 닉네임 변경 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value);
  };

  // 이미지 파일 업로드 핸들러
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await instance.post('/users/me/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(
        '업로드 시도 URL:',
        `${instance.defaults.baseURL}/users/me/image`,
      );

      setNewImageUrl(res.data.profileImageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    }
  };

  // 프로필 업데이트
  const handleUpdate = async () => {
    setIsUpdating(true);

    const updatedData = {
      profileImageUrl: newImageUrl,
      nickname: newNickname,
      newPassword,
    };

    try {
      await instance.patch('/users/me', updatedData, {
        headers: { 'Content-Type': 'application/json' },
      });

      onUpdate(updatedData);
    } catch (err) {
      console.error('업데이트 실패:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p className={styles.title}>프로필 수정하기</p>

        <div className={styles.previewSection}>
          <div className={styles.profilePreview}>
            <Image
              src={newImageUrl}
              alt='프로필 미리보기'
              fill
              className={styles.profileImg}
              priority
            />
          </div>
          <p className={styles.previewName}>{newNickname}</p>
        </div>

        <div className={styles.changeWrapper}>
          {/* 닉네임 */}
          <Input
            type='text'
            id='nickname'
            label='새 닉네임'
            className={styles.changeInput}
            value={newNickname}
            onChange={handleNicknameChange}
            placeholder='새 닉네임 입력'
          />

          {/* 이미지 파일 업로드 */}
          <Input
            type='file'
            id='imageFile'
            label='새 프로필 이미지'
            accept='image/*'
            onChange={handleImageUpload}
            className={styles.changeInput}
          />

          {/* 비밀번호 변경 */}
          <Input
            type='password'
            id='newPassword'
            label='새 비밀번호'
            className={styles.changeInput}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder='새 비밀번호 입력'
          />
        </div>

        <div className={styles.buttonWrapper}>
          <CustomButton className={styles.button} onClick={onClose}>
            취소하기
          </CustomButton>
          <CustomButton
            className={styles.button}
            onClick={handleUpdate}
            disabled={isUpdating}
          >
            {isUpdating ? '변경 중...' : '변경하기'}
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdateModal;
