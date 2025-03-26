export default function useFormatDate(dateString: string) {
  const date = new Date(dateString);

  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
}
