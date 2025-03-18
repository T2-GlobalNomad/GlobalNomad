'use client';

import styles from './index.module.css';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import SelectInput from '@/components/Input/SelectInput';
import DateInput from '@/components/Input/DateInput';
import Cookies from 'js-cookie';

export default function Page() {
  console.log('액세스토큰:', Cookies.get('accessToken'));
  console.log('리프레쉬토큰:', Cookies.get('refreshToken'));
  return (
    <div className={styles.container}>
      <div>
        <Input
          id='email'
          type='text'
          placeholder='이메일을 입력해주세요'
          label='이메일'
        />
      </div>
      <div>
        <Input
          id='email'
          type='text'
          placeholder='이메일을 입력해주세요'
          label='이메일'
          labelSize='large'
        />
      </div>
      <div>
        <PasswordInput id='password' />
      </div>
      <div>
        <SelectInput />
      </div>
      <div className={styles.subContainer}>
        <DateInput id='date' label='날짜' />
      </div>
    </div>
  );
}
