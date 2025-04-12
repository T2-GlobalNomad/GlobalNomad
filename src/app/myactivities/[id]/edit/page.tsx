'use client';
import Title from './components/Title/Title';
import PriceInput from './components/PriceInput/PriceInput';
import AddressInput from './components/AddressInput/AddressInput';
import Reservation from './components/Reservation/Reservation';
import BannerImage from './components/BannerImage/BannerImage';
import PostActivity from './components/EditMyActivity/editMyActivity';
import SubImage from './components/SubImage/SubImage';
import styles from './editPage.module.css';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
export default function PostMyActivity() {
  return (
    <div className={styles.container}>
      <ProfileCard activeTab='myactivities' />
      <div className={styles.container_wrapper}>
        <PostActivity />
        <Title />
        <PriceInput />
        <AddressInput />
        <Reservation />
        <BannerImage />
        <SubImage />
      </div>
    </div>
  );
}
