import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

type Value = Date | null | [Date | null, Date | null];

export default function MyNotificationCalendar() {
  const [value, setValue] = useState<Date | null>(null);

  // 타입을 맞춘 핸들러 함수
  const handleChange = (selectedValue: Value) => {
    if (selectedValue instanceof Date) {
      setValue(selectedValue);
    }
  };

  return (
    <div>
      <Calendar
        onChange={handleChange}
        value={value}
        formatDay={(locale, date) =>
          date.toLocaleString('en', { day: 'numeric' })
        }
      />
      <div>{moment(value).format('YYYY년 MM월 DD일')}</div>
    </div>
  );
}
