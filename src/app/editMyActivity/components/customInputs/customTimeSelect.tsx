'use client';

import dynamic from 'next/dynamic';
import styles from './customTimeSelect.module.css';
import {
  components,
  SingleValue,
  StylesConfig,
  GroupBase,
  OptionProps,
} from 'react-select';
import { useMemo } from 'react';

// SSR 문제 해결을 위해 클라이언트 전용으로 동적 임포트
const Select = dynamic(() => import('react-select'), { ssr: false });

/** 
 * 30분 단위의 시간을 생성하는 함수
 */
const generateTimeOptions = (): { value: string; label: string }[] => {
  const times = [];
  for (let hour = 0; hour < 24; hour++) {
    for (const minute of ['00', '30']) {
      const time = `${hour.toString().padStart(2, '0')}:${minute}`;
      times.push({ value: time, label: time });
    }
  }
  return times;
};

// 30분 단위 시간 옵션 생성
const allTimeOptions = generateTimeOptions();

const CustomSelect = {
  control: (provided) => ({
    ...provided,
    border: '1px solid #79747E',
    borderRadius: '4px',
    padding: '7px 12px',
  }),
  option: (provided, state) => ({
    ...provided,
    padding: '8px 24px',
    borderRadius: '6px',
    backgroundColor: state.isFocused ? 'black' : 'white',
    color: state.isFocused ? 'white' : 'black',
  }),
} as StylesConfig<unknown, false, GroupBase<unknown>>;

const CustomOption = (
  props: OptionProps<unknown, false, GroupBase<unknown>>,
) => {
  return (
    <components.Option {...props}>
      {props.children}
    </components.Option>
  );
};

interface StartEndTimeSelectProps {
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  startTime: string;
  endTime: string;
  className?: string;
}

export default function CustomTimeSelect({
  onStartTimeChange,
  onEndTimeChange,
  startTime,
  endTime,
  className, // eslint-disable-line @typescript-eslint/no-unused-vars
}: StartEndTimeSelectProps) {


  // 종료 시간 옵션을 시작 시간 이후로 필터링
  const filteredEndTimeOptions = useMemo(() => {
    if (!startTime) return allTimeOptions; // 시작 시간이 선택되지 않으면 전체 옵션 표시
    return allTimeOptions.filter((time) => time.value > startTime);
  }, [startTime]);

  return (
    <div className={styles.container}>
      <div>
      
        <Select
          options={allTimeOptions} // 전체 시간 옵션 사용
          placeholder='0:00'
          styles={CustomSelect}
          // isClearable
          value={allTimeOptions.find((t) => t.value === startTime) || null}
          onChange={(newValue: unknown) => {
            const option = newValue as SingleValue<{ value: string; label: string }>;
            onStartTimeChange(option ? option.value : '');
          }}
          components={{ Option: CustomOption }}
          className={styles.select}
        />
      </div>
          <span className={styles.waveSymbol}> ~ </span>
      <div>
      
        <Select
          options={filteredEndTimeOptions} // 시작 시간 이후의 옵션만 표시
          placeholder='0:00'
          styles={CustomSelect}
          // isClearable
          value={filteredEndTimeOptions.find((t) => t.value === endTime) || null}
          onChange={(newValue: unknown) => {
            const option = newValue as SingleValue<{ value: string; label: string }>;
            onEndTimeChange(option ? option.value : '');
          }}
          components={{ Option: CustomOption }}
          className={styles.select}
        />
      </div>
    </div>
  );
}
