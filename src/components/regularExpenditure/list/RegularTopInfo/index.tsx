import React from 'react';

import OneWeekAgoList from '@components/regularExpenditure/list/OneWeekAgoList';
import LineSeparator from '@components/common/LineSeparator';
import RegularAmountInfo from '@components/regularExpenditure/list/RegularAmountInfo';
import { RegularExpenditureType } from '@support/api/regularExpenditureApi';

export interface IRegularTopInfoProps {
  // 타입별 지출 리스트
  regularExpenditureTypeList: RegularExpenditureType[];
}
/**
 * 정기 지출 리스트 -> 상단 지출 정보 모음
 * @component
 */

function RegularTopInfo({ regularExpenditureTypeList }: IRegularTopInfoProps) {
  // 전체 지출 액
  const totalAmount = React.useMemo(() => {
    return regularExpenditureTypeList.reduce((acc, { list }) => {
      return list.reduce((acc, item) => acc + item.amount, 0);
    }, 0);
  }, [regularExpenditureTypeList]);

  return (
    <section>
      <RegularAmountInfo amount={totalAmount} />
      <OneWeekAgoList />
      <LineSeparator />
    </section>
  );
}

export default RegularTopInfo;
