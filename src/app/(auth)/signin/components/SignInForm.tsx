'use client';

import CustomButton from '@/components/CustomButton';
import styles from './SignInForm.module.css';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import { useForm } from 'react-hook-form';
import { login } from '@/lib/auth-api';
import { useRouter } from 'next/navigation';

interface LoginFormValues {
  email: string;
  password: string;
}

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({ mode: 'onChange' });

  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await login(data);
      console.log('로그인 성공', response);
      // router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <Input
          label='이메일'
          id='email'
          type='email'
          placeholder='이메일을 입력해 주세요'
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
              message: '이메일 양식이 틀렸어요',
            },
          })}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div className={styles.input}>
        <PasswordInput
          label='비밀번호'
          id='password'
          {...register('password', {
            required: '비밀번호는 필수 입력입니다.',
            minLength: { value: 8, message: '8자 이상 입력하세요.' },
          })}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
        )}
      </div>
      <CustomButton
        className={styles.btn}
        fontSize='md'
        type='submit'
        disabled={!isValid}
      >
        로그인 하기
      </CustomButton>
    </form>
  );
}
