import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function MyNotificationCalendar() {
  const [value, onChange] = useState<Value | null>(null);

  return <Calendar onChange={onChange} value={value} />;
}
