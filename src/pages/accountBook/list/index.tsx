import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import AccountBookList from '@components/accountBook/list/AccountBookList';
import MonthStatistics from '@components/accountBook/list/MonthStatistics';
import AccountBookListSkeleton from '@components/accountBook/list/AccountBookListSkeleton';
import { fetchAccountBookList } from '@support/api/accountBookApi';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import useUpdateEffect from '@support/hooks/useUpdateEffect';

/**
 * 가계부 리스트 페이지
 * @component
 */

function AccountBookListPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const {
    data: accountBookList = [],
    isFetching,
    refetch
  } = useQuery<IAccountBookListItem[]>('accountBookList',() => fetchAccountBookList(selectedDate));
  const queryClient = useQueryClient();

  useUpdateEffect(() => {
    onRefetch();
  }, [selectedDate]);

  // refresh 함수
  const onRefetch = async () => {
    await queryClient.setQueryData('accountBookList', undefined);
    refetch();
  };

  //todo
  // 수입, 지출 타입 있어야함..

  return (
    <>
      <MonthStatistics
        selectedDate={selectedDate}
        changeSelectedDate={setSelectedDate}
      />
      { isFetching && <AccountBookListSkeleton /> }
      { !isFetching && <AccountBookList accountBookList={accountBookList} /> }
    </>
  );
}

export default AccountBookListPage;
