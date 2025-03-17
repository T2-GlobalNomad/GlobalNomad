import Link from 'next/link';
import SignUpForm from './components/SignUpForm';
import styles from './index.module.css';

export default function SignUp() {
  return (
    <div className={styles.container}>
      <SignUpForm />
      <p>
        회원이신가요?{' '}
        <Link href={'/signin'} className={styles.link}>
          로그인하기
        </Link>
      </p>
      {/* sns계정 */}
    </div>
  );
}
