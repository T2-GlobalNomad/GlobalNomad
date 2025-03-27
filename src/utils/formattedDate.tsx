import useFormatDate from './useFormatDate';

export default function formattedDate(date: string) {
  const formatted = useFormatDate(date);

  return <span>{formatted.slice(0, formatted.length - 1)}</span>;
}
