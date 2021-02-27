import React from 'react';

import ExpenditureType from '@components/regularExpenditure/list/ExpenditureType';
import { RegularExpenditureType } from '@support/api/regularExpenditureApi';

export interface IExpenditureTypeListProps {
  list: RegularExpenditureType[];
  onRemoveRegularExpenditure: (id: number) => void;
}
/**
 * 정기 지출 리스트 -> 정기 지출 타입별 리스트
 * @component
 */

function ExpenditureTypeList({ list, onRemoveRegularExpenditure }: IExpenditureTypeListProps) {
  return (
    <section>
      {list.map((item) => {
        return <ExpenditureType key={item.type} expenditureType={item} onRemoveItem={onRemoveRegularExpenditure} />;
      })}
    </section>
  );
}

export default ExpenditureTypeList;
