import Dropdown from '@/components/Dropdown';
import useMyActivities from '@/hooks/useMyActivities';
import { Activities } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function MyNotification() {
  const [myActivities, setMyActivities] = useState<Activities | null>(null);
  const activities = useMyActivities(); // 훅을 사용하여 데이터 가져오기

  useEffect(() => {
    if (activities) {
      setMyActivities(activities);
    }
  }, [activities]); // 의존성 배열 추가

  return (
    <>
      <Dropdown />
      {myActivities && <p>{myActivities.title}</p>}
    </>
  );
}
