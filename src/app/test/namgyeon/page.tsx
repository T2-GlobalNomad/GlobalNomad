'use client';

import styles from './index.module.css';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import SelectInput from '@/components/Input/SelectInput';
import DateInput from '@/components/Input/DateInput';
import useAuthStore from '@/stores/useAuthStore';
import Cookies from 'js-cookie';

export default function Page() {
  const user = useAuthStore((state) => state.user);
  console.log('유저데이터', user);
  console.log('토큰', Cookies.get('accessToken'));
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
      <p>{user?.id}</p>
      <p>{user?.nickname}</p>
      <p>{user?.profileImageUrl}</p>
      <p>{user?.createdAt}</p>
      <p>{user?.updatedAt}</p>
    </div>
  );
}
