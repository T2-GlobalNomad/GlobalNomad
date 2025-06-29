'use client';

import Image from 'next/image';
import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './BookingCalendar.module.css';
import { Schedules } from '@/lib/types';
import CustomButton from '@/components/CustomButton';

interface BookingCalendarProps {
  schedules: Schedules[];
  selectedScheduleId: number;
  setSelectedScheduleId: (value: number) => void;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function BookingCalendar({
  schedules,
  selectedScheduleId,
  setSelectedScheduleId,
}: BookingCalendarProps) {
  const [date, setDate] = useState<Value>(new Date(schedules[0].date));
  const [selectedSchedules, setSelectedSchedules] = useState<Schedules[]>(
    schedules.filter(
      (schedule) =>
        new Date(schedule.date).toDateString() ===
        new Date(schedules[0].date).toDateString(),
    ),
  );

  const handleDateChange = (selectedDate: Value) => {
    setDate(selectedDate);

    const matchingSchedules = schedules.filter(
      (schedule) =>
        new Date(schedule.date).toDateString() ===
        new Date(selectedDate as Date).toDateString(),
    );

    setSelectedSchedules(matchingSchedules);
    setSelectedScheduleId(0);
  };

  const handleScheduleSelect = (scheduleId: number) => {
    setSelectedScheduleId(scheduleId);
  };

  return (
    <>
      <div className={styles.infoSection}>
        <Calendar
          onChange={handleDateChange}
          value={date}
          locale='en-US'
          className={`${styles.calendar} react-calendar`}
          prevLabel={
            <Image src='/images/prev.svg' alt='prev' width={16} height={16} />
          }
          nextLabel={
            <Image src='/images/next.svg' alt='next' width={16} height={16} />
          }
          next2Label={null}
          prev2Label={null}
          minDetail='year'
          maxDetail='month'
          tileDisabled={({ date, view }) => {
            if (view === 'month') {
              const isDisabled = !schedules.some(
                (schedule) =>
                  new Date(schedule.date).toDateString() ===
                  date.toDateString(),
              );
              return isDisabled;
            }
            if (view === 'year') {
              return !schedules.some((schedule) => {
                const scheduleDate = new Date(schedule.date);
                return (
                  scheduleDate.getFullYear() === date.getFullYear() &&
                  scheduleDate.getMonth() === date.getMonth()
                );
              });
            }
            return false;
          }}
        />
        <div>
          <p className={styles.availableTimes}>예약 가능한 시간</p>
          {selectedSchedules.length > 0 ? (
            <div className={styles.timeButtonSection}>
              {selectedSchedules.map((schedule) => (
                <CustomButton
                  key={schedule.id}
                  className={styles.timeButton}
                  fontSize='md'
                  variant={
                    selectedScheduleId === schedule.id ? 'black' : 'white'
                  }
                  style={{ fontWeight: 500 }}
                  onClick={() => handleScheduleSelect(schedule.id)}
                >
                  {schedule.startTime} ~ {schedule.endTime}
                </CustomButton>
              ))}
            </div>
          ) : (
            <p>해당 날짜에 예약 가능한 시간이 없습니다.</p>
          )}
        </div>
      </div>
    </>
  );
}
