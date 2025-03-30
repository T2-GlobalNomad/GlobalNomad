'use client';

import Image from 'next/image';
import styles from './Input.module.css';
import { useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 CSS

/**
 *  공용 DateInput
 * DatePicker 라이브러리 사용
 *
 * @param {string} props.label - 라벨 텍스트
 * @param {string} props.id - 라벨과 연결될 id
 * @example
 * <DateInput id="date" label="날짜" />
 * @returns {JSX.Element} 입력 필드 JSX 요소를 반환합니다.
 *
 * @author 남기연
 */
interface DateInputProps {
  label?: string;
  id?: string;
  onChange?: (date: Date | null) => void;
}

export default function DateInput({ label, id, onChange }: DateInputProps) {
  const [startDate, setStartDate] = useState<Date | null>(null);
  // DatePicker에 접근할 ref 생성
  const datePickerRef = useRef<DatePicker>(null);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  const handleIconClick = () => {
    datePickerRef.current?.setOpen(true);
  };

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label} htmlFor={id}>
          {label}
        </label>
      )}
      <div className={styles.subContainer}>
        <DatePicker
          id={id}
          selected={startDate} // 선택된 날짜 상태
          onChange={handleChange} // 날짜 변경 시 업데이트
          dateFormat='yy/MM/dd' // 표시 형식
          placeholderText='YY/MM/DD' // 플레이스홀더 (null 상태일 때만 보임)
          wrapperClassName={styles.datePickerWrapper}
          className={styles.input}
          ref={datePickerRef}
        />
        <div className={styles.dateIcon} onClick={handleIconClick}>
          <Image
            src='/images/calendar.svg'
            alt='달력 아이콘'
            width={32}
            height={32}
          />
        </div>
      </div>
    </div>
  );
}
