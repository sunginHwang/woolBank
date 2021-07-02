import React, { useEffect, useState } from 'react';
import TopInfo from '@components/accountBook/statistic/TopInfo';
import { IAccountBookStatisticFilter } from '@models/accountBook/statistic/IAccountBookStatisticFilter';
import getDateRange from '@/services/accountBook/getDateRange';

/**
 * 가계부 통계 페이지
 * @component
 */

function AccountBookStatistic() {
  const initDateInfo = getDateRange('month');
  const [searchFilter, setSearchFilter] = useState<IAccountBookStatisticFilter>({
    startDate: initDateInfo[0],
    endDate: initDateInfo[1],
    type: 'expenditure'
  });

  const onChangeSearchFilter = (searchFilter: IAccountBookStatisticFilter) => {
    setSearchFilter(searchFilter);
  };

  useEffect(() => {
    console.log('----start--searchFilter');
    console.log(searchFilter);
    console.log('----end----searchFilter');
  }, [searchFilter]);

  return (
    <>
      <TopInfo searchFilter={searchFilter} onChangeSearchFilter={onChangeSearchFilter} />
    </>
  );
}

export default AccountBookStatistic;
