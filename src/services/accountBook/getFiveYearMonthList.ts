import { addMonths, format } from 'date-fns';
import { IBottomMenu } from '@models/component/IBottomMenu';

/**
 * 5년 동안의 날짜 리스트 조회
 */
function getFiveYearMonthList(): IBottomMenu[] {
  const now = new Date();
  const month5Years = 60;

  return [...Array(month5Years)].map((_, index) => getMonthMenu(addMonths(now, -index)));
}

export function getMonthMenu(month: Date) {
  return {
    type: format(month, 'yyyy-MM'),
    value: format(month, 'yyyy년 M월')
  };
}

export default getFiveYearMonthList;
