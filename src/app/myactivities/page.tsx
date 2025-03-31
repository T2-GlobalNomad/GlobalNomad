'use client';

import ProfileCard from '@/components/ProfileCard/ProfileCard';
import MyActivityContainer from './components/myactivitycontainer';
import styles from './myactivities.module.css'

export default function MyActivities(){
    

    return(
        <div className={styles.page_container}>
            <ProfileCard activeTab='myactivities' />
            <MyActivityContainer />
        </div>
    )
}

