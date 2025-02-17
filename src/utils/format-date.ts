import dayJs from 'dayjs';

export const formatDate = (date: Date): string => {
  return dayJs(date).format('DD MMM YYYY');
};

export const formatTime = (date: Date): string => {
  return dayJs(date).format('hh:mm A');
};
