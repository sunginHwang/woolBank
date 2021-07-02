import { DateRangeType } from '@models/date/DateRangeType';
import { endOfMonth, endOfWeek, endOfYear, startOfMonth, startOfWeek, startOfYear } from 'date-fns';

// 년, 월, 주 단위 날짜 최소, 최대 범위 계산
function getDateRange(rangeType: DateRangeType, date = new Date()) {
  const rangeDate = new Date(date);

  return {
    year: [startOfYear(rangeDate), endOfYear(rangeDate)],
    month: [startOfMonth(rangeDate), endOfMonth(rangeDate)],
    week: [startOfWeek(rangeDate), endOfWeek(rangeDate)]
  }[rangeType];
}

export default getDateRange;
