import React, { useState } from 'react';
import { useQuery } from 'react-query';

import TopInfo from '@components/accountBook/statistic/TopInfo';
import StatisticChart from '@components/accountBook/statistic/StatisticChart';
import { fetchAccountBookStatistics } from '@support/api/accountBookApi';
import useUpdateEffect from '@support/hooks/useUpdateEffect';
import { IAccountBookStatistic } from '@models/accountBook/statistic/IAccountBookStatistic';
import { IAccountBookStatisticFilter } from '@models/accountBook/statistic/IAccountBookStatisticFilter';
import getDateRange from '@/services/accountBook/getDateRange';
import SpinnerLoading from '@components/common/SpinnerLoading';

/**
 * 가계부 통계 탭
 * @component
 */

function StatisticTab() {
  const initDateInfo = getDateRange('month');
  const [searchFilter, setSearchFilter] = useState<IAccountBookStatisticFilter>({
    startDate: initDateInfo[0],
    endDate: initDateInfo[1],
    type: 'expenditure'
  });
  const {
    data = [],
    refetch,
    isSuccess,
    isFetching
  } = useQuery<IAccountBookStatistic[]>('fetchAccountBookStatistic', () => fetchAccountBookStatistics(searchFilter));

  useUpdateEffect(() => {
    refetch();
  }, [searchFilter]);

  const onChangeSearchFilter = (searchFilter: IAccountBookStatisticFilter) => {
    setSearchFilter(searchFilter);
  };

  return (
    <>
      <TopInfo searchFilter={searchFilter} onChangeSearchFilter={onChangeSearchFilter} />
      {isFetching && <SpinnerLoading loading message='잠시만 기다려 주세요.' />}
      {isSuccess && <StatisticChart accountBookStatistics={data} />}
    </>
  );
}

export default StatisticTab;
