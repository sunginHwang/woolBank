import React, { useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import AccountBookList from '@components/accountBook/list/AccountBookList';
import MonthStatistics from '@components/accountBook/list/MonthStatistics';
import AccountBookListSkeleton from '@components/accountBook/list/AccountBookListSkeleton';
import { fetchAccountBookList } from '@support/api/accountBookApi';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import useUpdateEffect from '@support/hooks/useUpdateEffect';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import AddButton from '@components/common/AddButton';
import { useHistory } from 'react-router';

/**
 * 가계부 리스트 페이지
 * @component
 */

function AccountBookListPage() {
  //Todo 참조타입 말고 기본타입으로 변경해야함
  const [selectedDate, setSelectedDate] = useState(new Date());
  const history = useHistory();

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

  const moveSavePage = () => {
    history.push('/account-books/save');
  }

  const totalIncomeAmount = useMemo(() => getTotalAmount(accountBookList, 'income'), [accountBookList]);
  const totalExpenditureAmount = useMemo(() => getTotalAmount(accountBookList, 'expenditure'), [accountBookList]);

  return (
    <>
      <MonthStatistics
        selectedDate={selectedDate}
        changeSelectedDate={setSelectedDate}
        totalIncomeAmount={totalIncomeAmount}
        totalExpenditureAmount={totalExpenditureAmount}
      />
      { isFetching && <AccountBookListSkeleton /> }
      { !isFetching && <AccountBookList accountBookList={accountBookList} /> }
      <AddButton icon='+' onClick={moveSavePage} />
    </>
  );
}

function getTotalAmount(accountBookList: IAccountBookListItem[], type: AccountBookCategoryType) {
  return accountBookList
    .filter(item => item.type === type)
    .reduce((prev, item) => prev + item.amount, 0);
}

export default AccountBookListPage;
