'use client';

import styles from './CustomButton.module.css';
import Link from 'next/link';
import { ReactNode, CSSProperties } from 'react';
import '@/styles/global.css';

/**
 *
 * @param {"sm" | "md" | "lg"} fontSize - 폰트 크기 (sm: 14px, md: 16px, lg: 18px)
 * @param {"button" | "submit" | "reset"} type - 버튼 타입
 * @param {() => void} onClick - 클릭 이벤트 핸들러
 * @param {ReactNode} children - 버튼 내부 요소
 * @param {boolean} disabled - 버튼 비활성화 여부
 * @param {string} className - 상위 컴포넌트에서 전달된 추가적인 CSS 클래스명
 * @param {CSSProperties} style - 추가적인 스타일
 * @param {"black" | "white"} variant - 버튼 색상 (black: 검정, white: 흰색)
 * @returns
 */

interface ButtonProps {
  fontSize?: 'sm' | 'md' | 'lg';
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  href?: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  variant?: 'black' | 'white';
}

export default function CustomButton({
  fontSize = 'sm',
  type = 'button',
  onClick,
  href,
  children,
  disabled = false,
  className,
  style = {},
  variant = 'black',
}: ButtonProps) {
  return href ? (
    <Link
      href={href}
      className={`
        ${className}
        ${styles['customButton']} 
        ${styles[`customButton-${fontSize}`]}
        ${styles[`customButton-${variant}`]}`}
      style={style}
    >
      {children}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${className}
        ${styles['customButton']} 
        ${styles[`customButton-${fontSize}`]}
        ${styles[`customButton-${variant}`]}`}
      style={style}
    >
      {children}
    </button>
  );
}
