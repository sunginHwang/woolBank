import React from 'react';

import RegularAmountInfo from '@components/regularExpenditure/list/RegularAmountInfo';
import OneWeekAgoList from '@components/regularExpenditure/list/OneWeekAgoList';
import LineSeparator from '@components/common/LineSeparator';

/**
 * 정기 지출 리스트 -> 상단 지출 정보 모음 컨테이너
 * @component
 */

function RegularSummaryContainer() {
  return (
    <section>
      <RegularAmountInfo amount={3530000} />
      <OneWeekAgoList />
      <LineSeparator />
    </section>
  );
}

export default RegularSummaryContainer;
