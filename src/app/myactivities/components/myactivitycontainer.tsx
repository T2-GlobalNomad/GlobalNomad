'use client';
import styles from '../myactivities.module.css';

import CustomButton from "@/components/CustomButton"
import ActivityList from "./activitylist"
import useMyActivities from "@/hooks/useMyActivities";
import Empty from "@/components/empty/Empty"

export default function MyActivityContainer(){
    const { data : myActivities, isLoading, isError} = useMyActivities();

    if (isLoading) {
        return <div>로딩 중...</div>;
      }
    
      if (isError) {
        return <div>데이터를 불러오는 데 실패했습니다.</div>;
      }

    const isEmpty = !myActivities || myActivities.length === 0;


    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <p>내 체험 관리</p>
                <CustomButton 
                    href="/postMyActivity"
                    fontSize="md"
                    className={`"customButton-black" ${styles.custombutton}`}
                    >
                    체험 등록하기
                    </CustomButton>
            </div>
            <div>
                 {isEmpty ? <Empty /> : <ActivityList/>}
            </div>
            <div>
                
            </div>
        </div>
    )
}
