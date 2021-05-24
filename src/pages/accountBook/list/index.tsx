import React from 'react';
import AccountBookList from '@components/accountBook/list/AccountBookList';
import MonthStatistics from '@components/accountBook/list/MonthStatistics';
import LineSeparator from '@components/common/LineSeparator';

/**
 * 가계부 리스트 페이지
 * @component
 */

function AccountBookListPage() {
  return (
    <>
      <MonthStatistics />
      <AccountBookList />
    </>
  );
}

export default AccountBookListPage;
