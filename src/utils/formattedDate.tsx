import { JSX } from 'react';
import useFormatDate from './useFormatDate';

export default function FormattedDate(date: string): JSX.Element {
  const formatted = useFormatDate(date);
  return <span>{formatted.slice(0, formatted.length - 1)}</span>;
}
