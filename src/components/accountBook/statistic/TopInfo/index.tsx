import React, { useState } from 'react';

import LineSeparator from '@components/common/LineSeparator';
import DateRange from '@components/accountBook/statistic/TopInfo/DateRange';
import LabelFilter from '@components/accountBook/statistic/TopInfo/LabelFilter';
import { DateRangeType } from '@models/date/DateRangeType';
import { IAccountBookStatisticFilter } from '@models/accountBook/statistic/IAccountBookStatisticFilter';
import useUpdateEffect from '@support/hooks/useUpdateEffect';
import getDateRange from '@/services/accountBook/getDateRange';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';

interface IProps {
  searchFilter: IAccountBookStatisticFilter;
  onChangeSearchFilter: (searchFilter: IAccountBookStatisticFilter) => void;
}
/**
 * 가계부 통계 - 팝 영역
 * @component
 */

function TopInfo({ searchFilter, onChangeSearchFilter }: IProps) {
  const [dateRangeType, setDateRangeType] = useState<DateRangeType>('month');

  // 월별, 년도, 주별 필터 변경시 date 정보 초기화
  useUpdateEffect(() => {
    const [startDate, endDate] = getDateRange(dateRangeType);
    onDateChange(startDate, endDate);
  }, [dateRangeType]);

  const onDateChange = (startDate: Date, endDate: Date) => {
    onChangeSearchFilter({ ...searchFilter, startDate, endDate });
  };

  const onTypeChange = (type: AccountBookCategoryType) => {
    onChangeSearchFilter({ ...searchFilter, type });
  };

  const { startDate, endDate, type } = searchFilter;

  return (
    <>
      <DateRange activeDateRange={dateRangeType} onDateRangeChange={setDateRangeType} />
      <LabelFilter>
        <LabelFilter.DateRange
          startDate={startDate}
          endDate={endDate}
          dateRangeType={dateRangeType}
          onDateRangeChange={onDateChange}
        />
        <LabelFilter.Type activeType={type} onTypeChange={onTypeChange} />
      </LabelFilter>
      <LineSeparator />
    </>
  );
}

export default TopInfo;
