import {
  format,
  differenceInMinutes,
  differenceInHours,
  differenceInDays,
} from 'date-fns';
import { ar } from 'date-fns/locale';

export const formatDate = (date: Date | string): string => {
  const now = new Date();
  const commentDate = typeof date === 'string' ? new Date(date) : date;
  const diffMinutes = differenceInMinutes(now, commentDate);
  const diffHours = differenceInHours(now, commentDate);
  const diffDays = differenceInDays(now, commentDate);

  let timeString = '';

  if (diffDays < 1) {
    if (diffHours < 1) {
      if (diffMinutes < 1) {
        return 'للتو';
      }
      timeString = `${diffMinutes} ${diffMinutes === 1 ? 'دقيقة' : 'دقائق'}`;
    } else {
      timeString = `${diffHours} ${diffHours === 1 ? 'ساعة' : 'ساعات'}`;
    }
  } else if (diffDays < 3) {
    timeString = `${diffDays} ${diffDays === 1 ? 'يوم' : 'أيام'}`;
  } else {
    return format(commentDate, 'd MMMM, yyyy • hh:mm a', { locale: ar });
  }

  return `قبل ${timeString}`;
};
