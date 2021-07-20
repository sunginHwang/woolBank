import React from 'react';

import ExpenditureType from '@components/regularExpenditure/list/ExpenditureType';
import { RegularExpenditureType } from '@support/api/regularExpenditureApi';

export interface IExpenditureTypeListProps {
  list: RegularExpenditureType[];
  onClickRemoveRegularExpenditure: (id: number) => void;
}
/**
 * 정기 지출 리스트 -> 정기 지출 타입별 리스트
 * @component
 */

function ExpenditureTypeList({ list, onClickRemoveRegularExpenditure }: IExpenditureTypeListProps) {
  return (
    <section>
      {list.map((item, index) => {
        return <ExpenditureType key={`${item.name}/${index}`} expenditureType={item} onClickRemoveItem={onClickRemoveRegularExpenditure} />;
      })}
    </section>
  );
}

export default ExpenditureTypeList;
