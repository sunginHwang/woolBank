import React, { useState } from 'react';
import AccountBookList from '@components/accountBook/list/AccountBookList';
import MonthStatistics from '@components/accountBook/list/MonthStatistics';

/**
 * 가계부 리스트 페이지
 * @component
 */

function AccountBookListPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <>
      <MonthStatistics
        selectedDate={selectedDate}
        changeSelectedDate={setSelectedDate}
      />
      <AccountBookList />
    </>
  );
}

export default AccountBookListPage;
