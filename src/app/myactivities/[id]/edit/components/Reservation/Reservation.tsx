'use client';

import CustomButton from '@/components/CustomButton';
import DateInput from '../customInputs/customDateInput';
import CustomTimeSelect from '../customInputs/customTimeSelect';
import { Plus, Minus } from 'lucide-react';
import { useActivityStore } from '@/stores/useActivityStore';
import styles from './Reservation.module.css'

export default function Reservation() {
  const { activity, setActivity, addSchedule, removeSchedule, updateSchedule } =
    useActivityStore();


    console.log("🧩 activity.schedules 상태", activity.schedules);
  // 수정된 addSchedule 함수: 현재 입력된 날짜/시간을 일정으로 추가
  const handleAddSchedule = () => {
    if (!activity.date) {
      alert('날짜를 선택하세요!');
      return;
    }

   // 새 스케줄 객체 생성
  const newSchedule = {
    date: activity.date,
    startTime: activity.startTime,
    endTime: activity.endTime,
  };

  // 기존 addSchedule 실행 → schedules 배열에 추가
  addSchedule();

  // ✅ schedulesToAdd 배열에도 추가
  setActivity({
    schedulesToAdd: [...activity.schedulesToAdd, newSchedule],
    // ✅ 입력 필드 초기화
    date: '',
    startTime: '0:00',
    endTime: '0:00',
  });

    
  };

  return (
    <div className={styles.container}>
      <p className={styles.title}>예약 가능한 시간대</p>
      <div className={styles.subTitles}>
        <p className={styles.subTitle}>날짜</p>
        <p className={styles.startTime}>시작 시간</p>
        <p className={styles.endTime}>종료 시간</p>
      </div>

      {/* 예약 설정 필드 */}
      <div className={styles.inputWrapper}>
        <DateInput
          name='date'
          id='date'
          type='date'
          value={activity.date || ''}
          onChange={(date: Date | null) => {
            setActivity({ date: date ? date.toISOString().slice(0, 10) : '' });
          }}
          className={styles.dateInput}
        />

        <CustomTimeSelect
          startTime={activity.startTime}
          endTime={activity.endTime}
          onStartTimeChange={(value) => setActivity({ startTime: value })}
          onEndTimeChange={(value) => setActivity({ endTime: value })}
          className={styles.customTime}
        />
        <CustomButton onClick={handleAddSchedule} className={styles.customButton}>
          <Plus size={42} /> 
        </CustomButton>
      </div>
      <div className={styles.divider} />

      {/* 추가된 일정 목록 */}
      <div className={styles.containerAdded}>
        {activity.schedules.map((schedule, index) => (
          <div key={index} className={styles.inputWrapperAdded}>
            <DateInput
              type='date'
              value={schedule.date || ''}
              onChange={(date: Date | null) => {
                updateSchedule(
                  index,
                  'date',
                  date ? date.toISOString().slice(0, 10) : '',
                );
              }}
              className={styles.dateInputAdded}
            />

            <CustomTimeSelect
              startTime={schedule.startTime}
              endTime={schedule.endTime}
              onStartTimeChange={(value) =>
                updateSchedule(index, 'startTime', value)
              }
              onEndTimeChange={(value) =>
                updateSchedule(index, 'endTime', value)
              }
              className={styles.customTimeAdded}
            />

            <CustomButton onClick={() => removeSchedule(index)} className={styles.customButtonMinus}>
              <Minus className={styles.minus} size={42}/> 
            </CustomButton>
          </div>
        ))}
      </div>
    </div>
  );
}
