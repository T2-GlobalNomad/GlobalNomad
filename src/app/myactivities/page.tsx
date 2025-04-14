'use client';

import ProfileCard from '@/components/ProfileCard/ProfileCard';
import MyActivityContainer from './components/myactivitycontainer';
import styles from './myactivities.module.css';

export default function MyActivities() {
  return (
    <div className={styles.page_container}>
      <div className={styles.profileCard}>
        <ProfileCard activeTab='myactivities' />
      </div>
      <MyActivityContainer />
    </div>
  );
}
