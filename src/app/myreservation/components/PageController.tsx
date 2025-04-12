'use client';

import Dropdown from '@/components/Dropdown';
import styles from '../style.module.css';
import { Reservation } from '@/lib/types';
import { SetStateAction } from 'react';

interface Props<T extends { value: string; label: string }> {
  reservationsData: Reservation[] | undefined;
  status: string;
  value: string | null;
  setValue: React.Dispatch<SetStateAction<string | null>>;
  options: T[];
}

export default function PageController<
  T extends { value: string; label: string },
>({ reservationsData, status, value, setValue, options }: Props<T>) {
  return (
    <>
      <div className={styles.head}>
        <p className={styles.title}>예약 내역</p>
        {status === '' && reservationsData?.length === 0 ? (
          ''
        ) : (
          <Dropdown<{ value: string; label: string }>
            dropdownClassName={styles.dropdownList ?? ''}
            toggleClassName={styles.dropdownList}
            menuClassName={styles.dropdownList}
            menuItemClassName={styles.dropdownList}
            options={options}
            selectedValue={value}
            onChange={setValue}
          />
        )}
      </div>
    </>
  );
}
