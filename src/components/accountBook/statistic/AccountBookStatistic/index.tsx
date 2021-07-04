import React, { useState } from 'react';
import TopInfo from '@components/accountBook/statistic/TopInfo';
import { IAccountBookStatisticFilter } from '@models/accountBook/statistic/IAccountBookStatisticFilter';
import getDateRange from '@/services/accountBook/getDateRange';
import { useQuery } from 'react-query';
import { fetchAccountBookStatistics } from '@support/api/accountBookApi';
import useUpdateEffect from '@support/hooks/useUpdateEffect';
import { IAccountBookStatistic } from '@models/accountBook/statistic/IAccountBookStatistic';
import StatisticChart from '@components/accountBook/statistic/StatisticChart';
import StatisticList from '@components/accountBook/statistic/StatisticList';

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
  const { data = [], refetch } = useQuery<IAccountBookStatistic[]>('fetchAccountBookStatistic', () =>
    fetchAccountBookStatistics(searchFilter)
  );

  useUpdateEffect(() => {
    refetch();
  }, [searchFilter]);
  const onChangeSearchFilter = (searchFilter: IAccountBookStatisticFilter) => {
    setSearchFilter(searchFilter);
  };

  const listData = data.map(({ categoryName, amount }) => {
    return { name: categoryName, value: amount, color: '#9d4e4e' };
  });

  return (
    <>
      <TopInfo searchFilter={searchFilter} onChangeSearchFilter={onChangeSearchFilter} />
      <StatisticChart accountBookStatistics={data} />
      <StatisticList statisticList={listData} />
    </>
  );
}

export default AccountBookStatistic;
