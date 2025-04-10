export const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-');
  return `${year.slice(2)}/${parseInt(month, 10)}/${parseInt(day, 10)}`;
};
