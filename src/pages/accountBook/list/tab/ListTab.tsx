import React, { useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useHistory } from 'react-router';
import { useRecoilState } from 'recoil';

import AddButton from '@components/common/AddButton';
import AccountBookList from '@components/accountBook/list/AccountBookList';
import MonthStatistics from '@components/accountBook/list/MonthStatistics';
import AccountBookListSkeleton from '@components/accountBook/list/AccountBookListSkeleton';
import { IAccountBookListItem } from '@models/accountBook/IAccountBookListItem';
import useUpdateEffect from '@support/hooks/useUpdateEffect';
import { AccountBookCategoryType } from '@models/accountBook/AccountBookCategoryType';
import accountBook from '@/recoils/accountBook';
import useAccountBookList, { QUERY_KEY } from '@/services/accountBook/useAccountBookList';

/**
 * 가계부 리스트 탭
 * @component
 */

function ListTab() {
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useRecoilState(accountBook.atoms.listDateState);
  const history = useHistory();

  const { data: accountBookList = [], isFetching, refetch } = useAccountBookList(selectedDate);

  useUpdateEffect(() => {
    onRefetch();
  }, [selectedDate]);

  // refresh 함수
  const onRefetch = async () => {
    await queryClient.setQueryData(QUERY_KEY, undefined);
    refetch();
  };

  const moveSavePage = () => {
    history.push('/account-books/save');
  };

  const totalIncomeAmount = useMemo(() => getTotalAmount(accountBookList, 'income'), [accountBookList]);
  const totalExpenditureAmount = useMemo(() => getTotalAmount(accountBookList, 'expenditure'), [accountBookList]);

  return (
    <>
      <MonthStatistics
        selectedDate={new Date(selectedDate)}
        changeSelectedDate={setSelectedDate}
        totalIncomeAmount={totalIncomeAmount}
        totalExpenditureAmount={totalExpenditureAmount}
      />
      {isFetching ? <AccountBookListSkeleton /> : <AccountBookList accountBookList={accountBookList} />}
      <AddButton icon='+' onClick={moveSavePage} />
    </>
  );
}

function getTotalAmount(accountBookList: IAccountBookListItem[], type: AccountBookCategoryType) {
  return accountBookList.filter((item) => item.type === type).reduce((prev, item) => prev + item.amount, 0);
}

export default ListTab;
