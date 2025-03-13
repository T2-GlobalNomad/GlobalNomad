import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.copyright}>&copy;codeit - 2023</p>
        <ul className={styles.infoSection}>
          <li className={styles.btn}>Privacy Policy</li>
          <li className={styles.btn}>FAQ</li>
        </ul>
        <ul className={styles.socialSection}>
          <li className={styles.btn}>
            <Image
              src='/images/icon_facebook.svg'
              width={20}
              height={20}
              alt='Facebook'
            />
          </li>
          <li className={styles.btn}>
            <Image
              src='/images/icon_twitter.svg'
              width={20}
              height={20}
              alt='Twitter'
            />
          </li>
          <li className={styles.btn}>
            <Image
              src='/images/icon_youtube.svg'
              width={20}
              height={20}
              alt='Youtube'
            />
          </li>
          <li className={styles.btn}>
            <Image
              src='/images/icon_insta.svg'
              width={20}
              height={20}
              alt='Instagram'
            />
          </li>
        </ul>
      </div>
    </footer>
  );
}
