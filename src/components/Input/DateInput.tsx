'use client';

import Image from 'next/image';
import styles from './Input.module.css';
import { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // 기본 CSS

interface DateInputProps {
  label?: string;
  id?: string;
  onChange?: (date: Date | null) => void;
}

const DateInput = forwardRef<DatePicker, DateInputProps>(
  ({ label, id, onChange }, ref) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const datePickerRef = useRef<DatePicker | null>(null);

    useImperativeHandle(ref, () => datePickerRef.current as DatePicker, []);

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
            ref={datePickerRef} //  수정된 ref 연결 방식
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
  },
);

DateInput.displayName = 'DateInput'; // React DevTools에서 이름 표시

export default DateInput;
