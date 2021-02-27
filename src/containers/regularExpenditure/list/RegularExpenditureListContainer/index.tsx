import React from 'react';
import { useRecoilValue } from 'recoil';

import ExpenditureTypeList from '@components/regularExpenditure/list/ExpenditureTypeList';
import { RegularExpenditureType } from '@support/api/regularExpenditureApi';
import withSuspense from '@support/hocs/withSuspense';
import RegularExpenditureList from '../../../../recoils/regularExpenditure/RegularExpenditureList';
import RegularTopInfo from '@components/regularExpenditure/list/RegularTopInfo';

const { personState } = RegularExpenditureList.selectors;
/**
 * 정기 지출 리스트 -> 정기 지출 리스트 컨테이너
 * @component
 */

function RegularExpenditureListContainer() {
  const regularExpenditureTypeList = useRecoilValue<RegularExpenditureType[]>(personState);

  const onRemoveRegularExpenditure = (id: number) => {
    console.log(id);
  };

  return (
    <>
      <RegularTopInfo regularExpenditureTypeList={regularExpenditureTypeList} />
      <ExpenditureTypeList list={regularExpenditureTypeList} onRemoveRegularExpenditure={onRemoveRegularExpenditure} />
    </>
  );
}

export default withSuspense(RegularExpenditureListContainer, <div>로딩중</div>);
