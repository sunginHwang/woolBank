import React from 'react';
import PageTemplate from '@components/layout/PageTemplate';
import RegularAmountInfo from '@components/regularExpenditure/RegularAmountInfo';
import ExpenditureType from '@components/regularExpenditure/ExpenditureType';
import OneWeekAgoList from '@components/regularExpenditure/list/OneWeekAgoList';
import LineSeparator from '@components/common/LineSeparator';

function RegularExpenditureList() {
  return (
    <PageTemplate useHeader useBackButton={false} title='정기지출'>
      <RegularAmountInfo amount={3530000} />
      <OneWeekAgoList />
      <LineSeparator />
      <ExpenditureType expenditureType='보험/상해' />
      <ExpenditureType expenditureType='통신/인터넷' />
    </PageTemplate>
  );
}

export default RegularExpenditureList;
