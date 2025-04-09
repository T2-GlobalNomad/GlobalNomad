'use client';

import Image from 'next/image';
import styles from './customDateInput.module.css';
import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DateInputProps {
  label?: string;
  id?: string;
  onChange?: (date: Date | null) => void;
  value?: string; // 부모 컴포넌트에서 YYYY-MM-DD 형식의 문자열이 올 수 있음
  type?: string;
  name?: string;
  className?:string;
}

const DateInput = forwardRef<DatePicker, DateInputProps>(
  ({ label, id, onChange, value }, ref) => {
    const [startDate, setStartDate] = useState<Date | null>(value ? new Date(value) : null);
    const datePickerRef = useRef<DatePicker | null>(null);

    useImperativeHandle(ref, () => datePickerRef.current as DatePicker, []);

    // 부모 컴포넌트에서 `value`가 변경될 경우 `startDate` 상태 업데이트
    useEffect(() => {
      if (value) {
        setStartDate(new Date(value));
      }
    }, [value]);

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
            dateFormat='yyyy/MM/dd' // 표시 형식
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
  },
);

DateInput.displayName = 'DateInput'; 

export default DateInput;
