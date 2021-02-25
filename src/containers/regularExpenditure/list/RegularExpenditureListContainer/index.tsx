import React from 'react';

import ExpenditureType from '@components/regularExpenditure/list/ExpenditureType';

/**
 * 정기 지출 리스트 -> 정기 지출 리스트 컨테이너
 * @component
 */

function RegularExpenditureListContainer() {
  return (
    <section>
      <ExpenditureType expenditureType='보험/상해' />
      <ExpenditureType expenditureType='통신/인터넷' />
    </section>
  );
}

export default RegularExpenditureListContainer;
