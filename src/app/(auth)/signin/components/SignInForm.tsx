'use client';

import CustomButton from '@/components/CustomButton';
import styles from './SignInForm.module.css';
import Input from '@/components/Input/Input';
import PasswordInput from '@/components/Input/PasswordInput';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signIn } from '@/lib/auth-api';
import { signInSchema, type LoginFormValues } from '@/lib/schemas/auth-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuthStore } from '@/stores/useAuthStore';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    mode: 'onChange',
    resolver: zodResolver(signInSchema),
  });

  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await signIn(data);
      if (response) {
        useAuthStore.getState().setAuth(response.user);
      }
      router.push('/');
      return response;
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
          {...register('email')}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}
      </div>
      <div className={styles.input}>
        <PasswordInput
          label='비밀번호'
          id='password'
          {...register('password')}
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
