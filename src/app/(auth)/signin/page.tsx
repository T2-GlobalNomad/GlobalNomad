import styles from './index.module.css';
import SignInForm from './components/SignInForm';
import Link from 'next/link';

export default function SignIn() {
  return (
    <div className={styles.container}>
      <SignInForm />
      <p>
        회원이 아니신가요?{' '}
        <Link href='/signup' className={styles.link}>
          회원가입하기
        </Link>
      </p>
    </div>
  );
}
