"use client";

import Image from "next/image";
import styles from "./Input.module.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // 날짜 선택 UI를 위한 기본 CSS

/**
 *  공용 DateInput
 * DatePicker 라이브러리 사용
 * @param {string} props.label - 라벨을 입력
 * @param {string} props.id - 라벨과 연결되기 위한 id 입력
 *
 * @example
 * <DateInput id="date" label="날짜" />
 *
 * @returns {JSX.Element} 입력 필드 JSX 요소를 반환합니다.
 *
 * @author 남기연 <getam101@naver.com>
 */
interface DateInputProps {
  label?: string;
  id?: string;
  onChange?: (date: Date | null) => void;
}

export default function DateInput({
  label,
  id = "date",
  onChange,
}: DateInputProps) {
  // 기본값을 null로 해야 placeholder가 보입니다.
  const [date, setDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setDate(date);
    if (onChange) {
      onChange(date);
    }
  };

  // 아이콘 클릭 시 해당 input에 포커스를 주고 클릭 이벤트를 발생시켜 달력 팝업을 열도록 함
  const handleIconClick = () => {
    const inputElem = document.getElementById(id);
    if (inputElem) {
      inputElem.focus();
      inputElem.click();
    }
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
          selected={date} // 선택된 날짜 상태
          onChange={handleChange} // 날짜 변경 시 상태 업데이트
          dateFormat="yy/MM/dd" // 표시 형식 (예: 23/03/12)
          placeholderText="YY/MM/DD" // 플레이스홀더
          wrapperClassName={styles.datePickerWrapper}
          className={styles.input} // 커스텀 스타일 클래스
        />
        <Image
          className={styles.dateIcon}
          src="/images/calendar.svg" // 달력 아이콘 경로
          alt="달력 아이콘"
          width={32}
          height={32}
          onClick={handleIconClick}
        />
      </div>
    </div>
  );
}
