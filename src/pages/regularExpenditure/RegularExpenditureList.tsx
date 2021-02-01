import React from 'react';
import PageTemplate from '@components/layout/PageTemplate';
import RegularAmountInfo from '@components/regularExpenditure/RegularAmountInfo';
import ExpenditureTypeList from '@components/regularExpenditure/ExpenditureTypeList';

function RegularExpenditureList() {
  return (
    <PageTemplate useHeader useBackButton={false} title='정기지출'>
      <RegularAmountInfo amount={3530000} />
      <ExpenditureTypeList expenditureType='보험/상해' />
      <ExpenditureTypeList expenditureType='통신/인터넷' />
    </PageTemplate>
  );
}

export default RegularExpenditureList;
