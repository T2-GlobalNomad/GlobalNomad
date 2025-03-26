export function isPastDateTime(
  apiDate: string | undefined,
  apiTime: string | undefined,
): boolean {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;
  const currentDate = now.getDate();
  const currentHours = now.getHours();

  // API에서 받은 날짜와 시간 변환
  const [apiYear, apiMonth, apiDay] = apiDate!.split('-').map(Number);
  const [apiHours] = apiTime!.split(':').map(Number);

  // 날짜 비교 (연도 → 월 → 일 순서)
  if (apiYear < currentYear) return true;
  if (apiYear > currentYear) return false;
  if (apiMonth < currentMonth) return true;
  if (apiMonth > currentMonth) return false;
  if (apiDay < currentDate) return true;
  if (apiDay > currentDate) return false;

  // 같은 날짜일 경우 시간 비교
  return apiHours <= currentHours;
}
