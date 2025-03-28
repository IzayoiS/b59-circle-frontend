import dayJs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayJs.extend(relativeTime);

export const formatDate = (date: Date): string => {
  return dayJs(date).format('DD MMM YYYY');
};

export const formatTime = (date: Date): string => {
  return dayJs(date).format('hh:mm A');
};

export const formatTimeRelative = (date: Date): string => {
  return dayJs(date).fromNow();
};
