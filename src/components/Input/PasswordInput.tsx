'use client';

import Image from 'next/image';
import styles from './Input.module.css';
import { useState } from 'react';

/**
 *  공용 PasswordInput
 *
 * @example
 * <PasswordInput />
 *
 * @returns {JSX.Element} 입력 필드 JSX 요소를 반환합니다.
 *
 * @author 남기연 <getam101@naver.com>
 */

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isErrored?: boolean;
  label?: string;
  id: string;
}

export default function PasswordInput({
  isErrored = false,
  label = '비밀번호',
  id = '',
  ...props
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const toggleVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor='password'>
        비밀번호
      </label>
      <div className={styles.subContainer}>
        <input
          className={styles.input}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder='비밀번호를 입력해주세요'
          {...props}
        />
        <Image
          className={styles.passwordIcon}
          onClick={toggleVisibility}
          src={
            isPasswordVisible
              ? '/images/passwordOn.svg'
              : '/images/passwordOff.svg'
          }
          width={24}
          height={24}
          alt='비밀번호 보기 아이콘'
        />
      </div>
    </div>
  );
}
